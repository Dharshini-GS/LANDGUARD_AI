"""
LANDGUARD AI - Regression Model Training
----------------------------------------

Train an XGBoost regression model to predict:

    actual_delay_days

Uses the shared LANDGUARD feature engineering and preprocessing
pipeline.

Input:
    Raw LANDGUARD project data / synthetic development data

Target:
    actual_delay_days

Output:
    models/
        delay_regressor.pkl
        preprocessor.pkl
        regressor_metadata.json

Evaluation:
    MAE
    MSE
    RMSE
    R2
    MAPE
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import joblib
import numpy as np
import pandas as pd

from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)
from sklearn.model_selection import train_test_split

try:
    from xgboost import XGBRegressor
except ImportError as exc:
    raise ImportError(
        "XGBoost is not installed.\n"
        "Install it using:\n"
        "pip install xgboost"
    ) from exc


# ============================================================================
# PROJECT IMPORTS
# ============================================================================

CURRENT_DIR = Path(__file__).resolve().parent

if str(CURRENT_DIR) not in sys.path:
    sys.path.insert(0, str(CURRENT_DIR))

from features import (
    PREDICTION_FEATURES,
    TARGET_COLUMNS,
    get_regression_target,
    make_synthetic_dataset,
    engineer_features,
)

from preprocessing import (
    build_preprocessor,
    save_preprocessor,
    get_transformed_feature_names,
    get_preprocessor_metadata,
)


# ============================================================================
# PATHS
# ============================================================================

PROJECT_ROOT = CURRENT_DIR.parent

MODELS_DIR = PROJECT_ROOT / "models"

MODEL_PATH = MODELS_DIR / "delay_regressor.pkl"

PREPROCESSOR_PATH = MODELS_DIR / "preprocessor.pkl"

METADATA_PATH = MODELS_DIR / "regressor_metadata.json"

METRICS_PATH = MODELS_DIR / "regressor_metrics.json"


# ============================================================================
# CONFIGURATION
# ============================================================================

RANDOM_STATE = 42

TEST_SIZE = 0.20

VALIDATION_SIZE = 0.20

SYNTHETIC_ROWS = 5000


# ============================================================================
# MODEL CONFIGURATION
# ============================================================================

XGB_PARAMS = {
    "n_estimators": 500,
    "max_depth": 5,
    "learning_rate": 0.035,
    "subsample": 0.85,
    "colsample_bytree": 0.85,
    "min_child_weight": 3,
    "reg_alpha": 0.05,
    "reg_lambda": 1.0,
    "objective": "reg:squarederror",
    "eval_metric": "rmse",
    "random_state": RANDOM_STATE,
    "n_jobs": -1,
}


# ============================================================================
# LOGGING
# ============================================================================

def print_section(title: str) -> None:
    """Print a formatted section heading."""

    print()
    print("=" * 78)
    print(title)
    print("=" * 78)


# ============================================================================
# DATA LOADING
# ============================================================================

def load_training_data() -> pd.DataFrame:
    """
    Load training data.

    The function first looks for common project CSV locations.

    If no suitable CSV is found, it generates a synthetic development
    dataset using make_synthetic_dataset().
    """

    print_section("LOADING TRAINING DATA")

    possible_paths = [
        CURRENT_DIR / "data" / "projects.csv",
        CURRENT_DIR / "data" / "project_outcomes.csv",
        PROJECT_ROOT / "data" / "projects.csv",
        PROJECT_ROOT / "data" / "project_outcomes.csv",
        PROJECT_ROOT / "datasets" / "projects.csv",
        PROJECT_ROOT / "datasets" / "project_outcomes.csv",
    ]

    for path in possible_paths:

        if path.exists():

            print(f"Found dataset:")
            print(f"  {path}")

            try:

                data = pd.read_csv(path)

                if "actual_delay_days" in data.columns:

                    print(
                        f"Rows loaded: {len(data):,}"
                    )

                    return data

                print(
                    "Dataset does not contain "
                    "'actual_delay_days'."
                )

            except Exception as exc:

                print(
                    f"Could not read {path}: {exc}"
                )

    print(
        "No suitable regression dataset found."
    )

    print(
        f"Generating synthetic dataset "
        f"with {SYNTHETIC_ROWS:,} rows..."
    )

    data = make_synthetic_dataset(
        n=SYNTHETIC_ROWS,
        seed=RANDOM_STATE,
    )

    print(
        f"Synthetic rows generated: "
        f"{len(data):,}"
    )

    return data


# ============================================================================
# DATA VALIDATION
# ============================================================================

def validate_data(
    data: pd.DataFrame,
) -> None:
    """Validate regression training data."""

    print_section("VALIDATING DATA")

    if not isinstance(
        data,
        pd.DataFrame,
    ):
        raise TypeError(
            "Training data must be a pandas DataFrame."
        )

    if len(data) < 50:

        raise ValueError(
            "At least 50 rows are required "
            "for regression training."
        )

    target_column = TARGET_COLUMNS[
        "regression"
    ]

    if target_column not in data.columns:

        raise ValueError(
            f"Missing regression target: "
            f"{target_column}"
        )

    target = pd.to_numeric(
        data[target_column],
        errors="coerce",
    )

    missing_targets = int(
        target.isna().sum()
    )

    if missing_targets > 0:

        raise ValueError(
            f"Regression target contains "
            f"{missing_targets} missing/invalid values."
        )

    if (target < 0).any():

        raise ValueError(
            "Regression target cannot contain "
            "negative values."
        )

    print(
        f"Rows:                 {len(data):,}"
    )

    print(
        f"Columns:              {len(data.columns):,}"
    )

    print(
        f"Target:               {target_column}"
    )

    print(
        f"Target minimum:       {target.min():.2f}"
    )

    print(
        f"Target maximum:       {target.max():.2f}"
    )

    print(
        f"Target mean:          {target.mean():.2f}"
    )

    print(
        f"Target median:        {target.median():.2f}"
    )


# ============================================================================
# TARGET PREPARATION
# ============================================================================

def prepare_target(
    data: pd.DataFrame,
) -> pd.Series:
    """
    Extract and validate the regression target.
    """

    target = get_regression_target(
        data
    )

    return target


# ============================================================================
# TRAIN / TEST SPLIT
# ============================================================================

def split_data(
    data: pd.DataFrame,
):
    """
    Split raw data before fitting the preprocessing pipeline.

    This is important because the preprocessor must never learn
    information from the test set.
    """

    print_section("TRAIN / TEST SPLIT")

    train_data, test_data = train_test_split(
        data,
        test_size=TEST_SIZE,
        random_state=RANDOM_STATE,
    )

    print(
        f"Training rows:       {len(train_data):,}"
    )

    print(
        f"Testing rows:        {len(test_data):,}"
    )

    print(
        f"Test percentage:     "
        f"{len(test_data) / len(data) * 100:.1f}%"
    )

    return (
        train_data.reset_index(drop=True),
        test_data.reset_index(drop=True),
    )


# ============================================================================
# FEATURE ENGINEERING
# ============================================================================

def create_feature_matrices(
    train_data: pd.DataFrame,
    test_data: pd.DataFrame,
):
    """
    Engineer features for training and testing.

    The logical feature structure is guaranteed to match
    PREDICTION_FEATURES.
    """

    print_section("FEATURE ENGINEERING")

    X_train = engineer_features(
        train_data
    )

    X_test = engineer_features(
        test_data
    )

    X_train = X_train.loc[
        :,
        PREDICTION_FEATURES,
    ].copy()

    X_test = X_test.loc[
        :,
        PREDICTION_FEATURES,
    ].copy()

    print(
        f"Logical features:    "
        f"{len(PREDICTION_FEATURES)}"
    )

    print(
        f"Training matrix:     "
        f"{X_train.shape}"
    )

    print(
        f"Testing matrix:      "
        f"{X_test.shape}"
    )

    return X_train, X_test


# ============================================================================
# PREPROCESSING
# ============================================================================

def fit_and_transform_preprocessor(
    X_train: pd.DataFrame,
    X_test: pd.DataFrame,
):
    """
    Fit the shared preprocessor ONLY on training data.

    Then transform both training and test data.
    """

    print_section("PREPROCESSING")

    preprocessor = build_preprocessor()

    # IMPORTANT:
    # Fit only on training data.
    X_train_transformed = preprocessor.fit_transform(
        X_train
    )

    # Transform test data using the already fitted
    # training preprocessor.
    X_test_transformed = preprocessor.transform(
        X_test
    )

    print(
        f"Training transformed shape: "
        f"{X_train_transformed.shape}"
    )

    print(
        f"Testing transformed shape:  "
        f"{X_test_transformed.shape}"
    )

    feature_names = (
        get_transformed_feature_names(
            preprocessor
        )
    )

    print(
        f"Final model features: "
        f"{len(feature_names)}"
    )

    return (
        preprocessor,
        X_train_transformed,
        X_test_transformed,
    )


# ============================================================================
# MODEL TRAINING
# ============================================================================

def train_model(
    X_train,
    y_train,
    X_test,
    y_test,
) -> XGBRegressor:
    """
    Train the XGBoost regression model.
    """

    print_section("TRAINING XGBOOST REGRESSOR")

    model = XGBRegressor(
        **XGB_PARAMS
    )

    model.fit(
        X_train,
        y_train,
        eval_set=[
            (
                X_train,
                y_train,
            ),
            (
                X_test,
                y_test,
            ),
        ],
        verbose=False,
    )

    print(
        "XGBoost regression training completed."
    )

    print(
        f"Estimators:           "
        f"{XGB_PARAMS['n_estimators']}"
    )

    print(
        f"Max depth:            "
        f"{XGB_PARAMS['max_depth']}"
    )

    print(
        f"Learning rate:        "
        f"{XGB_PARAMS['learning_rate']}"
    )

    return model


# ============================================================================
# METRICS
# ============================================================================

def calculate_metrics(
    y_true,
    predictions,
) -> dict:
    """
    Calculate regression metrics.
    """

    y_true = np.asarray(
        y_true,
        dtype=float,
    )

    predictions = np.asarray(
        predictions,
        dtype=float,
    )

    mae = mean_absolute_error(
        y_true,
        predictions,
    )

    mse = mean_squared_error(
        y_true,
        predictions,
    )

    rmse = float(
        np.sqrt(mse)
    )

    r2 = r2_score(
        y_true,
        predictions,
    )

    # Avoid division by zero for MAPE.
    non_zero_mask = (
        np.abs(y_true) > 1e-9
    )

    if non_zero_mask.any():

        mape = (
            np.mean(
                np.abs(
                    (
                        y_true[non_zero_mask]
                        - predictions[non_zero_mask]
                    )
                    / y_true[non_zero_mask]
                )
            )
            * 100.0
        )

    else:

        mape = float("nan")

    return {
        "mae": float(mae),
        "mse": float(mse),
        "rmse": float(rmse),
        "r2": float(r2),
        "mape_percent": float(mape),
    }


# ============================================================================
# MODEL EVALUATION
# ============================================================================

def evaluate_model(
    model: XGBRegressor,
    X_train,
    y_train,
    X_test,
    y_test,
):
    """
    Evaluate model on both training and test sets.
    """

    print_section("MODEL EVALUATION")

    train_predictions = model.predict(
        X_train
    )

    test_predictions = model.predict(
        X_test
    )

    train_predictions = np.clip(
        train_predictions,
        0,
        None,
    )

    test_predictions = np.clip(
        test_predictions,
        0,
        None,
    )

    train_metrics = calculate_metrics(
        y_train,
        train_predictions,
    )

    test_metrics = calculate_metrics(
        y_test,
        test_predictions,
    )

    print()
    print("TRAINING PERFORMANCE")
    print("-" * 40)

    print(
        f"MAE:       {train_metrics['mae']:.4f}"
    )

    print(
        f"MSE:       {train_metrics['mse']:.4f}"
    )

    print(
        f"RMSE:      {train_metrics['rmse']:.4f}"
    )

    print(
        f"R²:        {train_metrics['r2']:.4f}"
    )

    print(
        f"MAPE:      "
        f"{train_metrics['mape_percent']:.2f}%"
    )

    print()
    print("TEST PERFORMANCE")
    print("-" * 40)

    print(
        f"MAE:       {test_metrics['mae']:.4f}"
    )

    print(
        f"MSE:       {test_metrics['mse']:.4f}"
    )

    print(
        f"RMSE:      {test_metrics['rmse']:.4f}"
    )

    print(
        f"R²:        {test_metrics['r2']:.4f}"
    )

    print(
        f"MAPE:      "
        f"{test_metrics['mape_percent']:.2f}%"
    )

    return (
        train_metrics,
        test_metrics,
        test_predictions,
    )


# ============================================================================
# FEATURE IMPORTANCE
# ============================================================================

def get_feature_importance(
    model: XGBRegressor,
    preprocessor,
) -> list[dict]:
    """
    Return feature importance sorted from highest to lowest.
    """

    feature_names = (
        get_transformed_feature_names(
            preprocessor
        )
    )

    importances = model.feature_importances_

    importance_records = []

    for name, importance in zip(
        feature_names,
        importances,
    ):

        importance_records.append(
            {
                "feature": str(name),
                "importance": float(
                    importance
                ),
            }
        )

    importance_records.sort(
        key=lambda item: item[
            "importance"
        ],
        reverse=True,
    )

    return importance_records


# ============================================================================
# SAVE MODEL
# ============================================================================

def save_model(
    model: XGBRegressor,
) -> Path:
    """
    Save trained regression model.
    """

    MODELS_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    joblib.dump(
        model,
        MODEL_PATH,
    )

    print(
        f"Model saved to:\n"
        f"  {MODEL_PATH}"
    )

    return MODEL_PATH


# ============================================================================
# SAVE METRICS
# ============================================================================

def save_metrics(
    train_metrics: dict,
    test_metrics: dict,
) -> Path:
    """
    Save regression evaluation metrics.
    """

    MODELS_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    metrics = {
        "model_type": "XGBRegressor",
        "target": TARGET_COLUMNS[
            "regression"
        ],
        "train": train_metrics,
        "test": test_metrics,
    }

    with open(
        METRICS_PATH,
        "w",
        encoding="utf-8",
    ) as file:

        json.dump(
            metrics,
            file,
            indent=4,
        )

    print(
        f"Metrics saved to:\n"
        f"  {METRICS_PATH}"
    )

    return METRICS_PATH


# ============================================================================
# SAVE METADATA
# ============================================================================

def save_metadata(
    model: XGBRegressor,
    preprocessor,
    train_metrics: dict,
    test_metrics: dict,
    importance_records: list[dict],
    train_rows: int,
    test_rows: int,
) -> Path:
    """
    Save model metadata for inference and explainability.
    """

    MODELS_DIR.mkdir(
        parents=True,
        exist_ok=True,
    )

    preprocessor_metadata = (
        get_preprocessor_metadata(
            preprocessor
        )
    )

    metadata = {
        "project": "LANDGUARD AI",

        "model": {
            "type": "XGBRegressor",
            "target": TARGET_COLUMNS[
                "regression"
            ],
            "model_file": MODEL_PATH.name,
        },

        "training": {
            "random_state": RANDOM_STATE,
            "test_size": TEST_SIZE,
            "train_rows": train_rows,
            "test_rows": test_rows,
        },

        "features": {
            "logical_feature_count": len(
                PREDICTION_FEATURES
            ),
            "logical_features": list(
                PREDICTION_FEATURES
            ),
            "transformed_feature_count": len(
                get_transformed_feature_names(
                    preprocessor
                )
            ),
        },

        "preprocessing": preprocessor_metadata,

        "metrics": {
            "train": train_metrics,
            "test": test_metrics,
        },

        "xgboost_parameters": {
            key: value
            for key, value in XGB_PARAMS.items()
        },

        "top_features": (
            importance_records[:20]
        ),
    }

    with open(
        METADATA_PATH,
        "w",
        encoding="utf-8",
    ) as file:

        json.dump(
            metadata,
            file,
            indent=4,
        )

    print(
        f"Metadata saved to:\n"
        f"  {METADATA_PATH}"
    )

    return METADATA_PATH


# ============================================================================
# PRINT FEATURE IMPORTANCE
# ============================================================================

def print_feature_importance(
    importance_records: list[dict],
    top_n: int = 15,
) -> None:
    """
    Print top model features.
    """

    print_section(
        f"TOP {top_n} FEATURE IMPORTANCE"
    )

    for index, record in enumerate(
        importance_records[:top_n],
        start=1,
    ):

        print(
            f"{index:2d}. "
            f"{record['feature']:<45} "
            f"{record['importance']:.6f}"
        )


# ============================================================================
# FINAL SUMMARY
# ============================================================================

def print_final_summary(
    test_metrics: dict,
) -> None:
    """
    Print final training summary.
    """

    print_section(
        "LANDGUARD AI REGRESSION TRAINING COMPLETE"
    )

    print(
        f"Model:                 XGBoost Regressor"
    )

    print(
        f"Target:                "
        f"{TARGET_COLUMNS['regression']}"
    )

    print(
        f"Test MAE:              "
        f"{test_metrics['mae']:.4f}"
    )

    print(
        f"Test RMSE:             "
        f"{test_metrics['rmse']:.4f}"
    )

    print(
        f"Test R²:               "
        f"{test_metrics['r2']:.4f}"
    )

    print(
        f"Test MAPE:             "
        f"{test_metrics['mape_percent']:.2f}%"
    )

    print()
    print("Generated files:")
    print(
        f"  {MODEL_PATH}"
    )
    print(
        f"  {PREPROCESSOR_PATH}"
    )
    print(
        f"  {METRICS_PATH}"
    )
    print(
        f"  {METADATA_PATH}"
    )

    print()
    print(
        "Regression training finished successfully."
    )


# ============================================================================
# MAIN
# ============================================================================

def main() -> None:
    """
    Complete regression training pipeline.
    """

    print_section(
        "LANDGUARD AI - DELAY REGRESSION TRAINING"
    )

    print(
        "Target:"
    )

    print(
        f"  {TARGET_COLUMNS['regression']}"
    )

    print(
        "Model:"
    )

    print(
        "  XGBoost Regressor"
    )

    # ------------------------------------------------------------------------
    # 1. Load data
    # ------------------------------------------------------------------------

    data = load_training_data()

    # ------------------------------------------------------------------------
    # 2. Validate data
    # ------------------------------------------------------------------------

    validate_data(
        data
    )

    # ------------------------------------------------------------------------
    # 3. Remove invalid target rows
    # ------------------------------------------------------------------------

    target_column = TARGET_COLUMNS[
        "regression"
    ]

    data[target_column] = pd.to_numeric(
        data[target_column],
        errors="coerce",
    )

    data = data.dropna(
        subset=[target_column]
    ).reset_index(
        drop=True
    )

    # ------------------------------------------------------------------------
    # 4. Train / test split
    # ------------------------------------------------------------------------

    train_data, test_data = split_data(
        data
    )

    # ------------------------------------------------------------------------
    # 5. Prepare targets
    # ------------------------------------------------------------------------

    y_train = prepare_target(
        train_data
    )

    y_test = prepare_target(
        test_data
    )

    # ------------------------------------------------------------------------
    # 6. Engineer features
    # ------------------------------------------------------------------------

    X_train, X_test = (
        create_feature_matrices(
            train_data,
            test_data,
        )
    )

    # ------------------------------------------------------------------------
    # 7. Fit preprocessing ONLY on train
    # ------------------------------------------------------------------------

    (
        preprocessor,
        X_train_transformed,
        X_test_transformed,
    ) = fit_and_transform_preprocessor(
        X_train,
        X_test,
    )

    # ------------------------------------------------------------------------
    # 8. Train XGBoost
    # ------------------------------------------------------------------------

    model = train_model(
        X_train_transformed,
        y_train,
        X_test_transformed,
        y_test,
    )

    # ------------------------------------------------------------------------
    # 9. Evaluate
    # ------------------------------------------------------------------------

    (
        train_metrics,
        test_metrics,
        test_predictions,
    ) = evaluate_model(
        model,
        X_train_transformed,
        y_train,
        X_test_transformed,
        y_test,
    )

    # ------------------------------------------------------------------------
    # 10. Feature importance
    # ------------------------------------------------------------------------

    importance_records = (
        get_feature_importance(
            model,
            preprocessor,
        )
    )

    print_feature_importance(
        importance_records
    )

    # ------------------------------------------------------------------------
    # 11. Save model
    # ------------------------------------------------------------------------

    save_model(
        model
    )

    # ------------------------------------------------------------------------
    # 12. Save shared preprocessor
    # ------------------------------------------------------------------------

    print_section(
        "SAVING SHARED PREPROCESSOR"
    )

    save_preprocessor(
        preprocessor,
        path=PREPROCESSOR_PATH,
    )

    print(
        f"Preprocessor saved to:\n"
        f"  {PREPROCESSOR_PATH}"
    )

    # ------------------------------------------------------------------------
    # 13. Save metrics
    # ------------------------------------------------------------------------

    save_metrics(
        train_metrics,
        test_metrics,
    )

    # ------------------------------------------------------------------------
    # 14. Save metadata
    # ------------------------------------------------------------------------

    save_metadata(
        model=model,
        preprocessor=preprocessor,
        train_metrics=train_metrics,
        test_metrics=test_metrics,
        importance_records=importance_records,
        train_rows=len(train_data),
        test_rows=len(test_data),
    )

    # ------------------------------------------------------------------------
    # 15. Final summary
    # ------------------------------------------------------------------------

    print_final_summary(
        test_metrics
    )


# ============================================================================
# ENTRY POINT
# ============================================================================

if __name__ == "__main__":

    try:

        main()

    except KeyboardInterrupt:

        print(
            "\nTraining interrupted by user."
        )

        sys.exit(1)

    except Exception as exc:

        print()
        print("=" * 78)
        print("TRAINING FAILED")
        print("=" * 78)
        print(
            f"{type(exc).__name__}: {exc}"
        )

        raise
