"""
LANDGUARD AI - Tuned Delay Classification Training
---------------------------------------------------

Trains the LANDGUARD AI delay classification model.

Target:
    delayed
        0 = project is not delayed
        1 = project is delayed

Artifacts:
    models/delay_model.pkl
    models/preprocessor.pkl
    models/model_metadata.json
    models/feature_importance.json

The script automatically:
    1. Loads/generates training data.
    2. Engineers features.
    3. Splits data into train/validation/test sets.
    4. Fits the shared preprocessor.
    5. Tests multiple XGBoost configurations.
    6. Searches for the best classification threshold.
    7. Selects the model with highest validation accuracy.
    8. Retrains the selected configuration on train+validation data.
    9. Evaluates on the untouched test set.
   10. Saves all model artifacts.

Run:

    python train_classifier.py

Or:

    python train_classifier.py --data data/historical_projects.csv
"""

from __future__ import annotations

import argparse
import json
import platform
from datetime import datetime, timezone
from pathlib import Path
from typing import Optional

import joblib
import numpy as np
import pandas as pd

from sklearn.metrics import (
    accuracy_score,
    average_precision_score,
    balanced_accuracy_score,
    classification_report,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
)

from sklearn.model_selection import train_test_split

from xgboost import XGBClassifier

from features import (
    CATEGORICAL_FEATURES,
    ENGINEERED_FEATURES,
    PREDICTION_FEATURES,
    BASE_NUMERIC_FEATURES,
    TARGET_COLUMNS,
    get_classification_target,
    make_synthetic_dataset,
    engineer_features,
)

from preprocessing import (
    build_preprocessor,
    get_preprocessor_metadata,
    get_transformed_feature_names,
    save_preprocessor,
)


# ============================================================================
# PATHS
# ============================================================================

PROJECT_ROOT = Path(__file__).resolve().parent

MODELS_DIR = PROJECT_ROOT / "models"

DEFAULT_MODEL_PATH = MODELS_DIR / "delay_model.pkl"
DEFAULT_PREPROCESSOR_PATH = MODELS_DIR / "preprocessor.pkl"
DEFAULT_METADATA_PATH = MODELS_DIR / "model_metadata.json"
DEFAULT_IMPORTANCE_PATH = MODELS_DIR / "feature_importance.json"


# ============================================================================
# CONFIGURATION
# ============================================================================

RANDOM_STATE = 42

TEST_SIZE = 0.20
VALIDATION_SIZE = 0.20

DEFAULT_SYNTHETIC_ROWS = 3000


# ============================================================================
# DATA LOADING
# ============================================================================

def load_training_data(
    data_path: Optional[str | Path] = None,
    synthetic_rows: int = DEFAULT_SYNTHETIC_ROWS,
    random_state: int = RANDOM_STATE,
) -> pd.DataFrame:

    if data_path is None:

        print()
        print("=" * 70)
        print("LANDGUARD AI - SYNTHETIC DEVELOPMENT DATA")
        print("=" * 70)

        print(
            f"[LANDGUARD] Generating {synthetic_rows:,} synthetic rows..."
        )

        data = make_synthetic_dataset(
            n=synthetic_rows,
            seed=random_state,
        )

        return data

    input_path = Path(data_path)

    if not input_path.exists():

        raise FileNotFoundError(
            f"Training dataset not found: {input_path}"
        )

    if input_path.suffix.lower() != ".csv":

        raise ValueError(
            "Training dataset must be a CSV file."
        )

    data = pd.read_csv(input_path)

    if data.empty:

        raise ValueError(
            "Training dataset is empty."
        )

    print(
        f"[LANDGUARD] Loaded {len(data):,} rows."
    )

    return data


# ============================================================================
# TARGET VALIDATION
# ============================================================================

def validate_target(
    data: pd.DataFrame,
) -> pd.Series:

    target = get_classification_target(data)

    unique_values = sorted(target.unique())

    if unique_values != [0, 1]:

        raise ValueError(
            "Classification target must contain both 0 and 1."
        )

    counts = target.value_counts().sort_index()

    print()
    print("[LANDGUARD] Target distribution:")

    for value, count in counts.items():

        percentage = (
            count / len(target)
        ) * 100

        label = (
            "not_delayed"
            if value == 0
            else "delayed"
        )

        print(
            f"    {label:<15}: "
            f"{count:>6,} "
            f"({percentage:>6.2f}%)"
        )

    return target


# ============================================================================
# XGBOOST MODEL CONFIGURATIONS
# ============================================================================

MODEL_CONFIGURATIONS = [

    {
        "name": "balanced_medium",
        "n_estimators": 700,
        "max_depth": 4,
        "learning_rate": 0.035,
        "subsample": 0.90,
        "colsample_bytree": 0.90,
        "min_child_weight": 2,
        "gamma": 0.05,
        "reg_alpha": 0.05,
        "reg_lambda": 2.0,
    },

    {
        "name": "balanced_deep",
        "n_estimators": 700,
        "max_depth": 5,
        "learning_rate": 0.035,
        "subsample": 0.90,
        "colsample_bytree": 0.90,
        "min_child_weight": 2,
        "gamma": 0.05,
        "reg_alpha": 0.05,
        "reg_lambda": 2.0,
    },

    {
        "name": "strong_regularized",
        "n_estimators": 900,
        "max_depth": 4,
        "learning_rate": 0.025,
        "subsample": 0.95,
        "colsample_bytree": 0.95,
        "min_child_weight": 3,
        "gamma": 0.10,
        "reg_alpha": 0.10,
        "reg_lambda": 3.0,
    },

    {
        "name": "deep_learning",
        "n_estimators": 600,
        "max_depth": 6,
        "learning_rate": 0.035,
        "subsample": 0.90,
        "colsample_bytree": 0.90,
        "min_child_weight": 2,
        "gamma": 0.05,
        "reg_alpha": 0.05,
        "reg_lambda": 2.0,
    },

    {
        "name": "high_accuracy",
        "n_estimators": 1000,
        "max_depth": 5,
        "learning_rate": 0.025,
        "subsample": 0.95,
        "colsample_bytree": 0.95,
        "min_child_weight": 1,
        "gamma": 0.0,
        "reg_alpha": 0.01,
        "reg_lambda": 1.5,
    },

]


# ============================================================================
# MODEL CREATION
# ============================================================================

def build_classifier(
    config: dict,
    random_state: int = RANDOM_STATE,
) -> XGBClassifier:

    return XGBClassifier(

        objective="binary:logistic",

        n_estimators=config["n_estimators"],

        max_depth=config["max_depth"],

        learning_rate=config["learning_rate"],

        subsample=config["subsample"],

        colsample_bytree=config["colsample_bytree"],

        min_child_weight=config["min_child_weight"],

        gamma=config["gamma"],

        reg_alpha=config["reg_alpha"],

        reg_lambda=config["reg_lambda"],

        random_state=random_state,

        eval_metric="logloss",

        tree_method="hist",

        n_jobs=-1,

        verbosity=0,

    )


# ============================================================================
# THRESHOLD SEARCH
# ============================================================================

def find_best_threshold(
    y_true,
    probabilities,
    minimum_threshold: float = 0.20,
    maximum_threshold: float = 0.80,
    step: float = 0.01,
) -> dict:

    best_threshold = 0.50
    best_accuracy = -1.0

    best_precision = 0.0
    best_recall = 0.0
    best_f1 = 0.0

    thresholds = np.arange(
        minimum_threshold,
        maximum_threshold + step,
        step,
    )

    for threshold in thresholds:

        predictions = (
            probabilities >= threshold
        ).astype(int)

        accuracy = accuracy_score(
            y_true,
            predictions,
        )

        precision = precision_score(
            y_true,
            predictions,
            zero_division=0,
        )

        recall = recall_score(
            y_true,
            predictions,
            zero_division=0,
        )

        f1 = f1_score(
            y_true,
            predictions,
            zero_division=0,
        )

        # Primary objective = accuracy.
        #
        # If accuracy is equal, prefer higher F1.
        if (
            accuracy > best_accuracy
            or (
                np.isclose(
                    accuracy,
                    best_accuracy,
                )
                and f1 > best_f1
            )
        ):

            best_accuracy = accuracy
            best_threshold = float(threshold)

            best_precision = precision
            best_recall = recall
            best_f1 = f1

    return {
        "threshold": best_threshold,
        "accuracy": float(best_accuracy),
        "precision": float(best_precision),
        "recall": float(best_recall),
        "f1": float(best_f1),
    }


# ============================================================================
# FULL METRICS
# ============================================================================

def calculate_metrics(
    y_true,
    probabilities,
    threshold,
) -> dict:

    y_true = np.asarray(
        y_true
    ).astype(int)

    probabilities = np.asarray(
        probabilities
    ).reshape(-1)

    predictions = (
        probabilities >= threshold
    ).astype(int)

    metrics = {

        "accuracy": float(
            accuracy_score(
                y_true,
                predictions,
            )
        ),

        "balanced_accuracy": float(
            balanced_accuracy_score(
                y_true,
                predictions,
            )
        ),

        "precision": float(
            precision_score(
                y_true,
                predictions,
                zero_division=0,
            )
        ),

        "recall": float(
            recall_score(
                y_true,
                predictions,
                zero_division=0,
            )
        ),

        "f1": float(
            f1_score(
                y_true,
                predictions,
                zero_division=0,
            )
        ),

        "threshold": float(
            threshold
        ),
    }

    if len(np.unique(y_true)) == 2:

        metrics["roc_auc"] = float(
            roc_auc_score(
                y_true,
                probabilities,
            )
        )

        metrics["average_precision"] = float(
            average_precision_score(
                y_true,
                probabilities,
            )
        )

    else:

        metrics["roc_auc"] = None

        metrics["average_precision"] = None

    cm = confusion_matrix(
        y_true,
        predictions,
        labels=[0, 1],
    )

    metrics["confusion_matrix"] = (
        cm.tolist()
    )

    report = classification_report(
        y_true,
        predictions,
        labels=[0, 1],
        target_names=[
            "not_delayed",
            "delayed",
        ],
        output_dict=True,
        zero_division=0,
    )

    metrics["classification_report"] = report

    return metrics


# ============================================================================
# FEATURE IMPORTANCE
# ============================================================================

def calculate_feature_importance(
    model: XGBClassifier,
    feature_names: list[str],
) -> list[dict]:

    importances = np.asarray(
        model.feature_importances_,
        dtype=float,
    )

    if len(importances) != len(feature_names):

        raise ValueError(
            "Feature importance length does not match "
            "transformed feature names."
        )

    total = float(
        importances.sum()
    )

    if total > 0:

        normalized = (
            importances / total
        )

    else:

        normalized = importances

    records = []

    for name, raw, norm in zip(
        feature_names,
        importances,
        normalized,
    ):

        records.append(
            {
                "feature": str(name),
                "importance": float(raw),
                "importance_normalized": float(norm),
            }
        )

    records.sort(
        key=lambda x: x[
            "importance_normalized"
        ],
        reverse=True,
    )

    for rank, record in enumerate(
        records,
        start=1,
    ):

        record["rank"] = rank

    return records


# ============================================================================
# JSON SERIALIZATION
# ============================================================================

def json_default(value):

    if isinstance(
        value,
        np.integer,
    ):

        return int(value)

    if isinstance(
        value,
        np.floating,
    ):

        return float(value)

    if isinstance(
        value,
        np.ndarray,
    ):

        return value.tolist()

    raise TypeError(
        f"Object of type "
        f"{type(value).__name__} "
        f"is not JSON serializable."
    )


def save_json(
    payload: dict,
    path: str | Path,
):

    path = Path(path)

    path.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    with path.open(
        "w",
        encoding="utf-8",
    ) as file:

        json.dump(
            payload,
            file,
            indent=2,
            default=json_default,
        )

    return path


# ============================================================================
# TRAINING
# ============================================================================

def train_classifier(
    data: pd.DataFrame,
    *,
    model_path=DEFAULT_MODEL_PATH,
    preprocessor_path=DEFAULT_PREPROCESSOR_PATH,
    metadata_path=DEFAULT_METADATA_PATH,
    importance_path=DEFAULT_IMPORTANCE_PATH,
    test_size=TEST_SIZE,
    validation_size=VALIDATION_SIZE,
    random_state=RANDOM_STATE,
):

    # ------------------------------------------------------------------------
    # TARGET
    # ------------------------------------------------------------------------

    y = validate_target(
        data
    )

    # ------------------------------------------------------------------------
    # FEATURES
    # ------------------------------------------------------------------------

    print()
    print(
        "[LANDGUARD] Engineering features..."
    )

    X = engineer_features(
        data
    )

    X = X.loc[
        :,
        PREDICTION_FEATURES,
    ].copy()

    print(
        f"[LANDGUARD] Logical features: "
        f"{len(PREDICTION_FEATURES)}"
    )

    # ------------------------------------------------------------------------
    # FIRST SPLIT
    # ------------------------------------------------------------------------

    (
        X_temp,
        X_test,
        y_temp,
        y_test,
    ) = train_test_split(

        X,
        y,

        test_size=test_size,

        random_state=random_state,

        stratify=y,
    )

    # ------------------------------------------------------------------------
    # SECOND SPLIT
    # ------------------------------------------------------------------------

    validation_fraction = (
        validation_size
        / (1.0 - test_size)
    )

    (
        X_train,
        X_validation,
        y_train,
        y_validation,
    ) = train_test_split(

        X_temp,
        y_temp,

        test_size=validation_fraction,

        random_state=random_state,

        stratify=y_temp,
    )

    print()
    print(
        "[LANDGUARD] Dataset split:"
    )

    print(
        f"    Training:   {len(X_train):,}"
    )

    print(
        f"    Validation: {len(X_validation):,}"
    )

    print(
        f"    Test:       {len(X_test):,}"
    )

    # ------------------------------------------------------------------------
    # PREPROCESSING
    # ------------------------------------------------------------------------

    print()
    print(
        "[LANDGUARD] Fitting preprocessor..."
    )

    preprocessor = build_preprocessor()

    X_train_transformed = (
        preprocessor.fit_transform(
            X_train
        )
    )

    X_validation_transformed = (
        preprocessor.transform(
            X_validation
        )
    )

    X_test_transformed = (
        preprocessor.transform(
            X_test
        )
    )

    # ------------------------------------------------------------------------
    # MODEL SEARCH
    # ------------------------------------------------------------------------

    print()
    print("=" * 70)
    print("LANDGUARD AI - XGBOOST MODEL SEARCH")
    print("=" * 70)

    best_model = None
    best_config = None
    best_threshold = 0.50
    best_validation_metrics = None

    for index, config in enumerate(
        MODEL_CONFIGURATIONS,
        start=1,
    ):

        print()
        print(
            f"[MODEL {index}/{len(MODEL_CONFIGURATIONS)}] "
            f"{config['name']}"
        )

        print(
            f"    estimators: "
            f"{config['n_estimators']}"
        )

        print(
            f"    depth: "
            f"{config['max_depth']}"
        )

        print(
            f"    learning_rate: "
            f"{config['learning_rate']}"
        )

        model = build_classifier(
            config,
            random_state=random_state,
        )

        # --------------------------------------------------------------------
        # TRAIN
        # --------------------------------------------------------------------

        model.fit(
            X_train_transformed,
            y_train,

            eval_set=[
                (
                    X_validation_transformed,
                    y_validation,
                )
            ],

            verbose=False,
        )

        # --------------------------------------------------------------------
        # VALIDATION PROBABILITIES
        # --------------------------------------------------------------------

        probabilities = (
            model.predict_proba(
                X_validation_transformed
            )[:, 1]
        )

        # --------------------------------------------------------------------
        # THRESHOLD SEARCH
        # --------------------------------------------------------------------

        threshold_result = find_best_threshold(
            y_validation,
            probabilities,
        )

        threshold = (
            threshold_result[
                "threshold"
            ]
        )

        metrics = calculate_metrics(
            y_validation,
            probabilities,
            threshold,
        )

        print(
            f"    Validation accuracy: "
            f"{metrics['accuracy']:.4f}"
        )

        print(
            f"    Validation balanced accuracy: "
            f"{metrics['balanced_accuracy']:.4f}"
        )

        print(
            f"    Validation F1: "
            f"{metrics['f1']:.4f}"
        )

        print(
            f"    Validation ROC-AUC: "
            f"{metrics['roc_auc']:.4f}"
        )

        print(
            f"    Best threshold: "
            f"{threshold:.2f}"
        )

        # --------------------------------------------------------------------
        # BEST MODEL
        # --------------------------------------------------------------------

        if (
            best_validation_metrics is None
            or metrics["accuracy"]
            > best_validation_metrics["accuracy"]
        ):

            best_model = model

            best_config = config.copy()

            best_threshold = threshold

            best_validation_metrics = metrics

            print(
                "    >>> NEW BEST MODEL <<<"
            )

    # ------------------------------------------------------------------------
    # MODEL SEARCH RESULT
    # ------------------------------------------------------------------------

    print()
    print("=" * 70)
    print("BEST VALIDATION MODEL")
    print("=" * 70)

    print(
        f"Model:       "
        f"{best_config['name']}"
    )

    print(
        f"Accuracy:    "
        f"{best_validation_metrics['accuracy']:.4f}"
    )

    print(
        f"F1:          "
        f"{best_validation_metrics['f1']:.4f}"
    )

    print(
        f"ROC-AUC:     "
        f"{best_validation_metrics['roc_auc']:.4f}"
    )

    print(
        f"Threshold:   "
        f"{best_threshold:.2f}"
    )

    # ------------------------------------------------------------------------
    # FINAL MODEL
    # ------------------------------------------------------------------------

    print()
    print(
        "[LANDGUARD] Retraining best model "
        "using training + validation data..."
    )

    X_train_full = pd.concat(
        [
            X_train,
            X_validation,
        ],
        axis=0,
    )

    y_train_full = pd.concat(
        [
            y_train,
            y_validation,
        ],
        axis=0,
    )

    # Build a fresh preprocessor to prevent any accidental leakage.
    final_preprocessor = build_preprocessor()

    X_train_full_transformed = (
        final_preprocessor.fit_transform(
            X_train_full
        )
    )

    X_test_final_transformed = (
        final_preprocessor.transform(
            X_test
        )
    )

    final_model = build_classifier(
        best_config,
        random_state=random_state,
    )

    final_model.fit(
        X_train_full_transformed,
        y_train_full,

        eval_set=[
            (
                X_test_final_transformed,
                y_test,
            )
        ],

        verbose=False,
    )

    # ------------------------------------------------------------------------
    # FINAL TEST PREDICTIONS
    # ------------------------------------------------------------------------

    final_probabilities = (
        final_model.predict_proba(
            X_test_final_transformed
        )[:, 1]
    )

    # Use the threshold discovered from validation.
    final_metrics = calculate_metrics(
        y_test,
        final_probabilities,
        best_threshold,
    )

    # ------------------------------------------------------------------------
    # FEATURE NAMES
    # ------------------------------------------------------------------------

    transformed_feature_names = (
        get_transformed_feature_names(
            final_preprocessor
        )
    )

    # ------------------------------------------------------------------------
    # FEATURE IMPORTANCE
    # ------------------------------------------------------------------------

    importance_records = (
        calculate_feature_importance(
            final_model,
            transformed_feature_names,
        )
    )

    # ------------------------------------------------------------------------
    # SAVE MODEL
    # ------------------------------------------------------------------------

    model_output = Path(
        model_path
    )

    model_output.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    joblib.dump(
        final_model,
        model_output,
    )

    # ------------------------------------------------------------------------
    # SAVE PREPROCESSOR
    # ------------------------------------------------------------------------

    preprocessor_output = save_preprocessor(
        final_preprocessor,
        path=preprocessor_path,
    )

    # ------------------------------------------------------------------------
    # PREPROCESSOR METADATA
    # ------------------------------------------------------------------------

    preprocessor_metadata = (
        get_preprocessor_metadata(
            final_preprocessor
        )
    )

    # ------------------------------------------------------------------------
    # METADATA
    # ------------------------------------------------------------------------

    metadata = {

        "project":
            "LANDGUARD AI",

        "model_name":
            "delay_classifier",

        "algorithm":
            "XGBClassifier",

        "task":
            "binary_classification",

        "target":
            TARGET_COLUMNS[
                "classification"
            ],

        "target_definition": {
            "0":
                "not_delayed",

            "1":
                "delayed",
        },

        "training_timestamp_utc":
            datetime.now(
                timezone.utc
            ).isoformat(),

        "random_state":
            random_state,

        "dataset": {

            "rows":
                int(len(data)),

            "training_rows":
                int(len(X_train_full)),

            "test_rows":
                int(len(X_test)),

            "test_size":
                float(test_size),

            "validation_size":
                float(validation_size),
        },

        "features": {

            "logical_features":
                list(PREDICTION_FEATURES),

            "logical_feature_count":
                len(PREDICTION_FEATURES),

            "base_numeric_features":
                list(BASE_NUMERIC_FEATURES),

            "engineered_features":
                list(ENGINEERED_FEATURES),

            "categorical_features":
                list(CATEGORICAL_FEATURES),

            "transformed_feature_count":
                len(
                    transformed_feature_names
                ),

            "transformed_feature_names":
                transformed_feature_names,
        },

        "preprocessing":
            preprocessor_metadata,

        "selected_model":
            best_config,

        "classification_threshold":
            float(best_threshold),

        "validation_metrics":
            best_validation_metrics,

        "test_metrics":
            final_metrics,

        "model_artifact":
            str(model_output),

        "preprocessor_artifact":
            str(preprocessor_output),

        "metadata_artifact":
            str(metadata_path),

        "feature_importance_artifact":
            str(importance_path),

        "environment": {

            "python":
                platform.python_version(),

            "platform":
                platform.platform(),

            "xgboost":
                getattr(
                    __import__(
                        "xgboost"
                    ),
                    "__version__",
                    "unknown",
                ),

            "sklearn":
                getattr(
                    __import__(
                        "sklearn"
                    ),
                    "__version__",
                    "unknown",
                ),
        },

        "prototype_data_warning": (
            "If synthetic development data was used, "
            "this model is for development/testing only. "
            "Operational deployment requires retraining "
            "on authorized historical project data."
        ),
    }

    save_json(
        metadata,
        metadata_path,
    )

    # ------------------------------------------------------------------------
    # FEATURE IMPORTANCE JSON
    # ------------------------------------------------------------------------

    importance_payload = {

        "project":
            "LANDGUARD AI",

        "model":
            "delay_classifier",

        "method":
            "xgboost_feature_importance",

        "importance_type":
            "model_feature_importance",

        "features":
            importance_records,
    }

    save_json(
        importance_payload,
        importance_path,
    )

    # ------------------------------------------------------------------------
    # FINAL PRINT
    # ------------------------------------------------------------------------

    print()
    print("=" * 70)
    print("LANDGUARD AI - FINAL TEST RESULTS")
    print("=" * 70)

    print(
        f"Accuracy:           "
        f"{final_metrics['accuracy']:.4f}"
    )

    print(
        f"Balanced Accuracy:  "
        f"{final_metrics['balanced_accuracy']:.4f}"
    )

    print(
        f"Precision:          "
        f"{final_metrics['precision']:.4f}"
    )

    print(
        f"Recall:             "
        f"{final_metrics['recall']:.4f}"
    )

    print(
        f"F1 Score:           "
        f"{final_metrics['f1']:.4f}"
    )

    print(
        f"ROC-AUC:            "
        f"{final_metrics['roc_auc']:.4f}"
    )

    print(
        f"Average Precision:  "
        f"{final_metrics['average_precision']:.4f}"
    )

    print(
        f"Threshold:          "
        f"{best_threshold:.2f}"
    )

    print("=" * 70)

    print()
    print(
        "[LANDGUARD] Saved artifacts:"
    )

    print(
        f"    Model:          "
        f"{model_output}"
    )

    print(
        f"    Preprocessor:   "
        f"{preprocessor_output}"
    )

    print(
        f"    Metadata:       "
        f"{metadata_path}"
    )

    print(
        f"    Importance:     "
        f"{importance_path}"
    )

    print()

    return {
        "model": final_model,
        "preprocessor": final_preprocessor,
        "metrics": final_metrics,
        "feature_importance": importance_records,
        "model_path": str(model_output),
        "preprocessor_path": str(
            preprocessor_output
        ),
        "metadata_path": str(
            metadata_path
        ),
        "importance_path": str(
            importance_path
        ),
    }


# ============================================================================
# COMMAND LINE
# ============================================================================

def parse_args():

    parser = argparse.ArgumentParser(
        description=(
            "Train LANDGUARD AI "
            "delay classifier."
        )
    )

    parser.add_argument(
        "--data",
        type=str,
        default=None,
        help=(
            "Path to historical "
            "project CSV."
        ),
    )

    parser.add_argument(
        "--synthetic-rows",
        type=int,
        default=DEFAULT_SYNTHETIC_ROWS,
        help=(
            "Number of synthetic "
            "rows."
        ),
    )

    parser.add_argument(
        "--test-size",
        type=float,
        default=TEST_SIZE,
        help=(
            "Test split fraction."
        ),
    )

    parser.add_argument(
        "--validation-size",
        type=float,
        default=VALIDATION_SIZE,
        help=(
            "Validation split "
            "fraction."
        ),
    )

    parser.add_argument(
        "--random-state",
        type=int,
        default=RANDOM_STATE,
        help=(
            "Random seed."
        ),
    )

    parser.add_argument(
        "--model-path",
        type=str,
        default=str(
            DEFAULT_MODEL_PATH
        ),
    )

    parser.add_argument(
        "--preprocessor-path",
        type=str,
        default=str(
            DEFAULT_PREPROCESSOR_PATH
        ),
    )

    parser.add_argument(
        "--metadata-path",
        type=str,
        default=str(
            DEFAULT_METADATA_PATH
        ),
    )

    parser.add_argument(
        "--importance-path",
        type=str,
        default=str(
            DEFAULT_IMPORTANCE_PATH
        ),
    )

    return parser.parse_args()


# ============================================================================
# MAIN
# ============================================================================

def main():

    args = parse_args()

    data = load_training_data(
        data_path=args.data,
        synthetic_rows=args.synthetic_rows,
        random_state=args.random_state,
    )

    train_classifier(

        data,

        model_path=args.model_path,

        preprocessor_path=args.preprocessor_path,

        metadata_path=args.metadata_path,

        importance_path=args.importance_path,

        test_size=args.test_size,

        validation_size=args.validation_size,

        random_state=args.random_state,
    )


if __name__ == "__main__":
    main()
