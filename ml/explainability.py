"""
LANDGUARD AI - Explainability Module
------------------------------------

Provides model explainability for:

    1. Delay classification
    2. Delay-days regression

Main capabilities:
    - Load trained models
    - Transform raw project data
    - Generate feature contributions
    - Return human-readable risk factors
    - Generate SHAP explanations when SHAP is available
    - Provide model feature importance
    - Explain individual projects

Expected model files:

    models/
        classifier.pkl OR delay_classifier.pkl
        delay_regressor.pkl OR regressor.pkl
        preprocessor.pkl

The module is designed to be safely imported by:
    risk.py
    stage_risk.py
    predictor.py
"""

from __future__ import annotations

from pathlib import Path
from typing import Any, Optional

import joblib
import numpy as np
import pandas as pd

from features import (
    BASE_NUMERIC_FEATURES,
    CATEGORICAL_FEATURES,
    ENGINEERED_FEATURES,
    PREDICTION_FEATURES,
    engineer_features,
)

from preprocessing import (
    load_preprocessor,
    transform_features,
    get_transformed_feature_names,
)


# ============================================================================
# PATHS
# ============================================================================

PROJECT_ROOT = Path(__file__).resolve().parent

MODELS_DIR = PROJECT_ROOT / "models"

PREPROCESSOR_PATH = MODELS_DIR / "preprocessor.pkl"


def _find_existing_model(*filenames: str) -> Path:
    """
    Return the first existing model file from the supplied filenames.

    This allows LANDGUARD AI to work with different model filenames
    without requiring retraining.
    """

    for filename in filenames:

        path = MODELS_DIR / filename

        if path.exists():

            return path

    # Return the first expected path if none exists.
    # Validation will report model_exists=False.
    return MODELS_DIR / filenames[0]


# Classifier can use either filename.
CLASSIFIER_PATH = _find_existing_model(
    "delay_model.pkl",
    "classifier.pkl",
    "delay_classifier.pkl",
)


# Your trained regression model is currently:
# models/delay_regressor.pkl
REGRESSOR_PATH = _find_existing_model(
    "delay_regressor.pkl",
    "regressor.pkl",
)


# ============================================================================
# CONSTANTS
# ============================================================================

DEFAULT_TOP_FEATURES = 10

POSITIVE_DIRECTION = "increases risk"

NEGATIVE_DIRECTION = "reduces risk"


# ============================================================================
# MODEL LOADING
# ============================================================================

def load_model(
    model_type: str,
    path: Optional[str | Path] = None,
):
    """
    Load a trained LANDGUARD model.

    Parameters
    ----------
    model_type:
        Either:
            "classifier"
            "classification"
            "regressor"
            "regression"

    path:
        Optional custom model path.

    Returns
    -------
    sklearn model
    """

    model_type = str(
        model_type
    ).lower().strip()

    if path is not None:

        model_path = Path(path)

    elif model_type in {
        "classifier",
        "classification",
    }:

        model_path = CLASSIFIER_PATH

    elif model_type in {
        "regressor",
        "regression",
    }:

        model_path = REGRESSOR_PATH

    else:

        raise ValueError(
            "model_type must be either "
            "'classifier' or 'regressor'."
        )

    if not model_path.exists():

        raise FileNotFoundError(
            f"Model not found: {model_path}\n"
            f"Models directory: {MODELS_DIR}"
        )

    model = joblib.load(
        model_path
    )

    if not hasattr(
        model,
        "predict",
    ):

        raise TypeError(
            f"Loaded object from {model_path} "
            "is not a valid sklearn model."
        )

    return model


# ============================================================================
# PREPROCESSOR
# ============================================================================

def get_preprocessor(
    path: Optional[str | Path] = None,
):
    """
    Load the shared LANDGUARD preprocessing pipeline.
    """

    return load_preprocessor(
        path=(
            path
            if path is not None
            else PREPROCESSOR_PATH
        )
    )


# ============================================================================
# FEATURE NAME HELPERS
# ============================================================================

def get_feature_names(
    preprocessor=None,
) -> list[str]:
    """
    Return feature names after preprocessing.
    """

    if preprocessor is None:

        preprocessor = get_preprocessor()

    return get_transformed_feature_names(
        preprocessor
    )


# ============================================================================
# TRANSFORM DATA
# ============================================================================

def transform_for_explanation(
    data: pd.DataFrame,
    preprocessor=None,
):
    """
    Engineer and preprocess raw project data.
    """

    if not isinstance(
        data,
        pd.DataFrame,
    ):

        raise TypeError(
            "data must be a pandas.DataFrame."
        )

    if preprocessor is None:

        preprocessor = get_preprocessor()

    return transform_features(
        data,
        preprocessor,
    )


# ============================================================================
# MODEL PREDICTION
# ============================================================================

def predict_model(
    data: pd.DataFrame,
    model,
    preprocessor=None,
):
    """
    Generate predictions using the supplied model.
    """

    transformed = transform_for_explanation(
        data,
        preprocessor,
    )

    return model.predict(
        transformed
    )


# ============================================================================
# CLASSIFICATION PROBABILITY
# ============================================================================

def predict_delay_probability(
    data: pd.DataFrame,
    model=None,
    preprocessor=None,
) -> np.ndarray:
    """
    Return probability of project delay.

    If predict_proba() exists, probability for class 1 is returned.

    Otherwise decision_function() is converted to a probability using
    the logistic function.
    """

    if model is None:

        model = load_model(
            "classifier"
        )

    transformed = transform_for_explanation(
        data,
        preprocessor,
    )

    if hasattr(
        model,
        "predict_proba",
    ):

        probabilities = model.predict_proba(
            transformed
        )

        if probabilities.ndim == 2:

            if probabilities.shape[1] >= 2:

                return probabilities[:, 1]

            return probabilities[:, 0]

        return probabilities

    if hasattr(
        model,
        "decision_function",
    ):

        decision = model.decision_function(
            transformed
        )

        return (
            1.0
            / (
                1.0
                + np.exp(
                    -np.clip(
                        decision,
                        -50,
                        50,
                    )
                )
            )
        )

    predictions = model.predict(
        transformed
    )

    return np.asarray(
        predictions,
        dtype=float,
    )


# ============================================================================
# FEATURE IMPORTANCE
# ============================================================================

def get_model_feature_importance(
    model,
    preprocessor=None,
) -> pd.DataFrame:
    """
    Return global model feature importance.

    Supports models exposing:

        feature_importances_

    or:

        coef_

    Returns
    -------
    pandas.DataFrame

        feature
        importance
        direction
    """

    if preprocessor is None:

        preprocessor = get_preprocessor()

    feature_names = get_feature_names(
        preprocessor
    )

    if hasattr(
        model,
        "feature_importances_",
    ):

        importance = np.asarray(
            model.feature_importances_,
            dtype=float,
        )

        direction = [
            "model importance"
            for _ in importance
        ]

    elif hasattr(
        model,
        "coef_",
    ):

        coefficients = np.asarray(
            model.coef_
        )

        if coefficients.ndim == 1:

            coefficients = (
                coefficients.reshape(
                    1,
                    -1,
                )
            )

        importance = np.abs(
            coefficients[0]
        )

        direction = [
            (
                POSITIVE_DIRECTION
                if value > 0
                else NEGATIVE_DIRECTION
            )
            for value in coefficients[0]
        ]

    else:

        raise ValueError(
            "The supplied model does not expose "
            "feature_importances_ or coef_."
        )

    if len(importance) != len(
        feature_names
    ):

        raise ValueError(
            "Number of model features does not "
            "match preprocessing feature names."
        )

    result = pd.DataFrame(
        {
            "feature": feature_names,
            "importance": importance,
            "direction": direction,
        }
    )

    result = result.sort_values(
        "importance",
        ascending=False,
    ).reset_index(
        drop=True
    )

    return result


# ============================================================================
# TOP GLOBAL FEATURES
# ============================================================================

def get_top_model_features(
    model,
    preprocessor=None,
    top_n: int = DEFAULT_TOP_FEATURES,
) -> pd.DataFrame:
    """
    Return the most important model features.
    """

    importance = (
        get_model_feature_importance(
            model,
            preprocessor,
        )
    )

    return importance.head(
        max(1, int(top_n))
    ).copy()


# ============================================================================
# SHAP SUPPORT
# ============================================================================

def _try_import_shap():

    try:

        import shap

        return shap

    except ImportError:

        return None


# ============================================================================
# SHAP EXPLANATION
# ============================================================================

def generate_shap_explanation(
    data: pd.DataFrame,
    model,
    preprocessor=None,
):
    """
    Generate SHAP values.

    Returns
    -------
    tuple
        (
            shap_values,
            feature_names
        )

    Notes
    -----
    SHAP is optional.

    If SHAP is not installed, a RuntimeError is raised.
    """

    shap = _try_import_shap()

    if shap is None:

        raise RuntimeError(
            "SHAP is not installed. "
            "Install it using: pip install shap"
        )

    if preprocessor is None:

        preprocessor = get_preprocessor()

    transformed = transform_for_explanation(
        data,
        preprocessor,
    )

    feature_names = get_feature_names(
        preprocessor
    )

    model_name = (
        type(model)
        .__name__
        .lower()
    )

    try:

        if (
            "tree" in model_name
            or hasattr(
                model,
                "feature_importances_",
            )
        ):

            explainer = shap.TreeExplainer(
                model
            )

        else:

            explainer = shap.LinearExplainer(
                model,
                transformed,
            )

        shap_values = explainer.shap_values(
            transformed
        )

    except Exception:

        explainer = shap.Explainer(
            model,
            transformed,
        )

        shap_values = explainer(
            transformed
        )

        if hasattr(
            shap_values,
            "values",
        ):

            shap_values = (
                shap_values.values
            )

    return (
        shap_values,
        feature_names,
    )


# ============================================================================
# INDIVIDUAL FEATURE CONTRIBUTIONS
# ============================================================================

def get_feature_contributions(
    data: pd.DataFrame,
    model,
    preprocessor=None,
) -> pd.DataFrame:
    """
    Calculate feature contributions for each input row.

    For linear models, coefficients are multiplied by feature values.

    For tree models, SHAP values are used when SHAP is available.

    If SHAP is unavailable, model feature importance is used as fallback.
    """

    if preprocessor is None:

        preprocessor = get_preprocessor()

    transformed = transform_for_explanation(
        data,
        preprocessor,
    )

    feature_names = get_feature_names(
        preprocessor
    )

    # Convert sparse matrices to dense arrays.
    if hasattr(
        transformed,
        "toarray",
    ):

        transformed_values = (
            transformed.toarray()
        )

    else:

        transformed_values = np.asarray(
            transformed
        )

    # ------------------------------------------------------------------------
    # LINEAR MODEL
    # ------------------------------------------------------------------------

    if hasattr(
        model,
        "coef_",
    ):

        coefficients = np.asarray(
            model.coef_
        )

        if coefficients.ndim > 1:

            coefficients = coefficients[0]

        contributions = (
            transformed_values
            * coefficients
        )

        return pd.DataFrame(
            contributions,
            columns=feature_names,
            index=data.index,
        )

    # ------------------------------------------------------------------------
    # TREE / SHAP MODEL
    # ------------------------------------------------------------------------

    shap = _try_import_shap()

    if shap is not None:

        try:

            explainer = shap.Explainer(
                model,
                transformed_values,
            )

            explanation = explainer(
                transformed_values
            )

            values = explanation.values

            if values.ndim == 3:

                # Binary classifier SHAP output.
                if values.shape[2] == 2:

                    values = values[:, :, 1]

                else:

                    values = values[:, :, 0]

            return pd.DataFrame(
                values,
                columns=feature_names,
                index=data.index,
            )

        except Exception:

            pass

    # ------------------------------------------------------------------------
    # FALLBACK
    # ------------------------------------------------------------------------

    if hasattr(
        model,
        "feature_importances_",
    ):

        importance = np.asarray(
            model.feature_importances_,
            dtype=float,
        )

        contributions = (
            transformed_values
            * importance
        )

        return pd.DataFrame(
            contributions,
            columns=feature_names,
            index=data.index,
        )

    raise RuntimeError(
        "Unable to calculate feature contributions "
        "for this model."
    )


# ============================================================================
# SINGLE PROJECT EXPLANATION
# ============================================================================

def explain_project(
    data: pd.DataFrame,
    model=None,
    model_type: str = "classifier",
    preprocessor=None,
    top_n: int = DEFAULT_TOP_FEATURES,
) -> dict:
    """
    Explain one LANDGUARD project.

    Parameters
    ----------
    data:
        DataFrame containing exactly one project.

    model:
        Optional trained model.

    model_type:
        "classifier" or "regressor".

    top_n:
        Number of strongest factors to return.

    Returns
    -------
    dict
        Structured explanation suitable for API responses.
    """

    if not isinstance(
        data,
        pd.DataFrame,
    ):

        raise TypeError(
            "data must be a pandas.DataFrame."
        )

    if len(data) != 1:

        raise ValueError(
            "explain_project() expects exactly "
            "one project row."
        )

    normalized_model_type = (
        str(model_type)
        .lower()
        .strip()
    )

    if normalized_model_type in {
        "classification",
    }:

        normalized_model_type = "classifier"

    elif normalized_model_type in {
        "regression",
    }:

        normalized_model_type = "regressor"

    if normalized_model_type not in {
        "classifier",
        "regressor",
    }:

        raise ValueError(
            "model_type must be either "
            "'classifier' or 'regressor'."
        )

    if model is None:

        model = load_model(
            normalized_model_type
        )

    if preprocessor is None:

        preprocessor = get_preprocessor()

    contributions = (
        get_feature_contributions(
            data,
            model,
            preprocessor,
        )
    )

    row = contributions.iloc[0]

    positive = (
        row[row > 0]
        .sort_values(
            ascending=False
        )
    )

    negative = (
        row[row < 0]
        .sort_values(
            ascending=True
        )
    )

    top_positive = []

    for feature, value in positive.head(
        top_n
    ).items():

        top_positive.append(
            {
                "feature": str(feature),
                "contribution": round(
                    float(value),
                    6,
                ),
                "direction": POSITIVE_DIRECTION,
            }
        )

    top_negative = []

    for feature, value in negative.head(
        top_n
    ).items():

        top_negative.append(
            {
                "feature": str(feature),
                "contribution": round(
                    float(value),
                    6,
                ),
                "direction": NEGATIVE_DIRECTION,
            }
        )

    # ------------------------------------------------------------------------
    # PREDICTION
    # ------------------------------------------------------------------------

    transformed = transform_for_explanation(
        data,
        preprocessor,
    )

    prediction = model.predict(
        transformed
    )

    if normalized_model_type == "classifier":

        probability = (
            predict_delay_probability(
                data,
                model,
                preprocessor,
            )[0]
        )

        prediction_value = int(
            prediction[0]
        )

        prediction_result = {
            "delayed": prediction_value,
            "delay_probability": round(
                float(probability),
                4,
            ),
            "delay_probability_percent": round(
                float(probability) * 100,
                2,
            ),
        }

    else:

        prediction_result = {
            "predicted_delay_days": round(
                float(prediction[0]),
                2,
            ),
        }

    return {
        "model_type": normalized_model_type,
        "prediction": prediction_result,
        "top_risk_factors": top_positive,
        "top_protective_factors": top_negative,
        "feature_contribution_count": int(
            len(row)
        ),
    }


# ============================================================================
# BATCH EXPLANATION
# ============================================================================

def explain_projects(
    data: pd.DataFrame,
    model=None,
    model_type: str = "classifier",
    preprocessor=None,
    top_n: int = DEFAULT_TOP_FEATURES,
) -> list[dict]:
    """
    Generate explanations for multiple projects.
    """

    if not isinstance(
        data,
        pd.DataFrame,
    ):

        raise TypeError(
            "data must be a pandas.DataFrame."
        )

    if model is None:

        model = load_model(
            model_type
        )

    if preprocessor is None:

        preprocessor = get_preprocessor()

    results = []

    for index in data.index:

        single_row = data.loc[
            [index]
        ].copy()

        explanation = explain_project(
            single_row,
            model=model,
            model_type=model_type,
            preprocessor=preprocessor,
            top_n=top_n,
        )

        results.append(
            explanation
        )

    return results


# ============================================================================
# HUMAN-READABLE FEATURE NAME
# ============================================================================

def humanize_feature_name(
    feature: str,
) -> str:
    """
    Convert model feature names into readable text.

    Examples
    --------
    compensation_pending_ratio
        ->
    Compensation Pending Ratio

    project_type_Highway
        ->
    Project Type: Highway
    """

    feature = str(feature)

    # Detect one-hot encoded categorical feature.
    categorical_bases = set(
        CATEGORICAL_FEATURES
    )

    for category in categorical_bases:

        prefix = category + "_"

        if feature.startswith(
            prefix
        ):

            value = feature[
                len(prefix):
            ]

            return (
                category
                .replace(
                    "_",
                    " ",
                )
                .title()
                + ": "
                + value
            )

    return (
        feature
        .replace(
            "_",
            " ",
        )
        .title()
    )


# ============================================================================
# HUMAN-READABLE EXPLANATION
# ============================================================================

def explain_project_readable(
    data: pd.DataFrame,
    model=None,
    model_type: str = "classifier",
    preprocessor=None,
    top_n: int = 5,
) -> dict:
    """
    Return an explanation with human-readable feature names.
    """

    result = explain_project(
        data=data,
        model=model,
        model_type=model_type,
        preprocessor=preprocessor,
        top_n=top_n,
    )

    for factor in result[
        "top_risk_factors"
    ]:

        factor["feature"] = (
            humanize_feature_name(
                factor["feature"]
            )
        )

    for factor in result[
        "top_protective_factors"
    ]:

        factor["feature"] = (
            humanize_feature_name(
                factor["feature"]
            )
        )

    return result


# ============================================================================
# GLOBAL EXPLAINABILITY REPORT
# ============================================================================

def generate_global_explainability_report(
    model=None,
    model_type: str = "classifier",
    preprocessor=None,
    top_n: int = 20,
) -> dict:
    """
    Generate global feature importance information.

    Useful for dashboards and model reports.
    """

    if model is None:

        model = load_model(
            model_type
        )

    if preprocessor is None:

        preprocessor = get_preprocessor()

    importance = (
        get_model_feature_importance(
            model,
            preprocessor,
        )
    )

    top_features = (
        importance.head(
            max(
                1,
                int(top_n),
            )
        )
    )

    records = []

    for _, row in top_features.iterrows():

        records.append(
            {
                "feature": humanize_feature_name(
                    row["feature"]
                ),
                "importance": round(
                    float(
                        row["importance"]
                    ),
                    6,
                ),
                "direction": str(
                    row["direction"]
                ),
            }
        )

    return {
        "model_type": model_type,
        "total_features": int(
            len(importance)
        ),
        "top_features": records,
    }


# ============================================================================
# MODEL VALIDATION
# ============================================================================

def validate_explainability_setup(
    model_type: str = "classifier",
) -> dict:
    """
    Check whether the required model and preprocessor exist.
    """

    model_type = (
        str(model_type)
        .lower()
        .strip()
    )

    if model_type in {
        "classifier",
        "classification",
    }:

        model_path = CLASSIFIER_PATH

    elif model_type in {
        "regressor",
        "regression",
    }:

        model_path = REGRESSOR_PATH

    else:

        raise ValueError(
            "Invalid model_type."
        )

    model_exists = model_path.exists()

    preprocessor_exists = (
        PREPROCESSOR_PATH.exists()
    )

    return {
        "model_type": model_type,
        "model_path": str(
            model_path
        ),
        "model_exists": model_exists,
        "preprocessor_path": str(
            PREPROCESSOR_PATH
        ),
        "preprocessor_exists": preprocessor_exists,
        "ready": (
            model_exists
            and preprocessor_exists
        ),
    }


# ============================================================================
# VALIDATE BOTH MODELS
# ============================================================================

def validate_all_models() -> dict:
    """
    Validate classifier, regressor and shared preprocessor.
    """

    classifier = (
        validate_explainability_setup(
            "classifier"
        )
    )

    regressor = (
        validate_explainability_setup(
            "regressor"
        )
    )

    return {
        "classifier": classifier,
        "regressor": regressor,
        "preprocessor": {
            "path": str(
                PREPROCESSOR_PATH
            ),
            "exists": (
                PREPROCESSOR_PATH.exists()
            ),
        },
        "all_ready": (
            classifier["ready"]
            and regressor["ready"]
        ),
    }


# ============================================================================
# TEST / DIAGNOSTIC
# ============================================================================

if __name__ == "__main__":

    print(
        "=" * 70
    )

    print(
        "LANDGUARD AI - Explainability"
    )

    print(
        "=" * 70
    )

    print(
        "\nModels directory:"
    )

    print(
        MODELS_DIR
    )

    print(
        "\nClassifier setup:"
    )

    print(
        validate_explainability_setup(
            "classifier"
        )
    )

    print(
        "\nRegressor setup:"
    )

    print(
        validate_explainability_setup(
            "regressor"
        )
    )

    print(
        "\nAll model validation:"
    )

    print(
        validate_all_models()
    )

    print(
        "\nExpected logical features:",
        len(PREDICTION_FEATURES),
    )

    print(
        "Base numeric features:",
        len(BASE_NUMERIC_FEATURES),
    )

    print(
        "Engineered features:",
        len(ENGINEERED_FEATURES),
    )

    print(
        "Categorical features:",
        len(CATEGORICAL_FEATURES),
    )

    print(
        "\nDetected classifier path:"
    )

    print(
        CLASSIFIER_PATH
    )

    print(
        "\nDetected regressor path:"
    )

    print(
        REGRESSOR_PATH
    )

    print(
        "\nExplainability module loaded successfully."
    )

    print(
        "=" * 70
    )
