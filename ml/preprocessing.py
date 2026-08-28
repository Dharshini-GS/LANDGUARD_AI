"""
LANDGUARD AI - Preprocessing Pipeline
-------------------------------------

Provides the single shared preprocessing pipeline used by both:

    1. Classification model
    2. Regression model

The same fitted preprocessor must be saved as:

    models/preprocessor.pkl

and loaded during inference.

Pipeline:
    Numeric features
        -> median imputation
        -> StandardScaler

    Categorical features
        -> most-frequent imputation
        -> OneHotEncoder(handle_unknown="ignore")

This module intentionally does NOT fit anything at import time.
The training scripts are responsible for fitting and saving the pipeline.
"""

from __future__ import annotations

from pathlib import Path
from typing import Optional, Tuple

import joblib
import pandas as pd

from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

from features import (
    BASE_NUMERIC_FEATURES,
    CATEGORICAL_FEATURES,
    ENGINEERED_FEATURES,
    PREDICTION_FEATURES,
    engineer_features,
)


# ---------------------------------------------------------------------------
# PATHS
# ---------------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parent

MODELS_DIR = PROJECT_ROOT / "models"

PREPROCESSOR_PATH = MODELS_DIR / "preprocessor.pkl"


# ---------------------------------------------------------------------------
# FEATURE GROUPS
# ---------------------------------------------------------------------------

NUMERIC_FEATURES = (
    list(BASE_NUMERIC_FEATURES)
    + list(ENGINEERED_FEATURES)
)

CATEGORICAL_FEATURES = list(
    CATEGORICAL_FEATURES
)


# ---------------------------------------------------------------------------
# ENCODER COMPATIBILITY
# ---------------------------------------------------------------------------

def _build_one_hot_encoder() -> OneHotEncoder:
    """
    Build a OneHotEncoder compatible with multiple scikit-learn versions.

    Newer versions use:
        sparse_output=False

    Older versions use:
        sparse=False
    """

    try:
        return OneHotEncoder(
            handle_unknown="ignore",
            sparse_output=False,
        )
    except TypeError:
        return OneHotEncoder(
            handle_unknown="ignore",
            sparse=False,
        )


# ---------------------------------------------------------------------------
# PIPELINE BUILDING
# ---------------------------------------------------------------------------

def build_preprocessor() -> ColumnTransformer:
    """
    Create a fresh, unfitted preprocessing pipeline.

    Returns
    -------
    sklearn.compose.ColumnTransformer
        Unfitted preprocessing transformer.

    Notes
    -----
    This function must be called before training.

    Do not use a different preprocessing pipeline for classification
    and regression. Both models are expected to use the same logical
    feature preparation.
    """

    numeric_pipeline = Pipeline(
        steps=[
            (
                "imputer",
                SimpleImputer(
                    strategy="median"
                ),
            ),
            (
                "scaler",
                StandardScaler(),
            ),
        ]
    )

    categorical_pipeline = Pipeline(
        steps=[
            (
                "imputer",
                SimpleImputer(
                    strategy="most_frequent",
                ),
            ),
            (
                "encoder",
                _build_one_hot_encoder(),
            ),
        ]
    )

    preprocessor = ColumnTransformer(
        transformers=[
            (
                "numeric",
                numeric_pipeline,
                NUMERIC_FEATURES,
            ),
            (
                "categorical",
                categorical_pipeline,
                CATEGORICAL_FEATURES,
            ),
        ],
        remainder="drop",
        verbose_feature_names_out=False,
    )

    return preprocessor


# ---------------------------------------------------------------------------
# DATA PREPARATION
# ---------------------------------------------------------------------------

def prepare_features(
    data: pd.DataFrame,
) -> pd.DataFrame:
    """
    Convert raw LANDGUARD project records into the logical feature matrix.

    Parameters
    ----------
    data:
        Raw project dataframe.

    Returns
    -------
    pandas.DataFrame
        Engineered features before sklearn preprocessing.
    """

    if not isinstance(data, pd.DataFrame):
        raise TypeError(
            "prepare_features() expects a pandas.DataFrame."
        )

    features = engineer_features(data)

    # Explicit column ordering is important.
    #
    # It guarantees that training and inference provide the exact same
    # logical feature order.
    features = features.loc[
        :,
        PREDICTION_FEATURES,
    ].copy()

    return features


# ---------------------------------------------------------------------------
# FIT
# ---------------------------------------------------------------------------

def fit_preprocessor(
    data: pd.DataFrame,
) -> Tuple[ColumnTransformer, pd.DataFrame]:
    """
    Fit the preprocessing pipeline on training data.

    Parameters
    ----------
    data:
        Raw training dataframe.

    Returns
    -------
    tuple
        (
            fitted_preprocessor,
            engineered_features
        )

    IMPORTANT
    ---------
    The returned preprocessor must only be fitted on the training split,
    never on the validation/test split.
    """

    features = prepare_features(data)

    preprocessor = build_preprocessor()

    preprocessor.fit(features)

    return preprocessor, features


# ---------------------------------------------------------------------------
# TRANSFORM
# ---------------------------------------------------------------------------

def transform_features(
    data: pd.DataFrame,
    preprocessor: ColumnTransformer,
):
    """
    Transform raw project data using an already-fitted preprocessor.

    Parameters
    ----------
    data:
        Raw project dataframe.

    preprocessor:
        Previously fitted ColumnTransformer.

    Returns
    -------
    numpy.ndarray
        Numeric model matrix.
    """

    if preprocessor is None:
        raise ValueError(
            "A fitted preprocessor is required."
        )

    features = prepare_features(data)

    return preprocessor.transform(features)


# ---------------------------------------------------------------------------
# FIT + TRANSFORM
# ---------------------------------------------------------------------------

def fit_transform_features(
    data: pd.DataFrame,
) -> Tuple[ColumnTransformer, object]:
    """
    Fit the preprocessor and transform the supplied data.

    Intended for training code.
    """

    preprocessor, features = fit_preprocessor(
        data
    )

    transformed = preprocessor.transform(
        features
    )

    return preprocessor, transformed


# ---------------------------------------------------------------------------
# SAVE / LOAD
# ---------------------------------------------------------------------------

def save_preprocessor(
    preprocessor: ColumnTransformer,
    path: Optional[str | Path] = None,
) -> Path:
    """
    Save a fitted preprocessor to disk.

    Default:
        models/preprocessor.pkl
    """

    if preprocessor is None:
        raise ValueError(
            "Cannot save a None preprocessor."
        )

    output_path = (
        Path(path)
        if path is not None
        else PREPROCESSOR_PATH
    )

    output_path.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    joblib.dump(
        preprocessor,
        output_path,
    )

    return output_path


def load_preprocessor(
    path: Optional[str | Path] = None,
) -> ColumnTransformer:
    """
    Load the fitted LANDGUARD preprocessing pipeline.
    """

    input_path = (
        Path(path)
        if path is not None
        else PREPROCESSOR_PATH
    )

    if not input_path.exists():
        raise FileNotFoundError(
            f"Preprocessor not found: {input_path}"
        )

    preprocessor = joblib.load(
        input_path
    )

    if not hasattr(
        preprocessor,
        "transform",
    ):
        raise TypeError(
            "Loaded object is not a valid sklearn "
            "preprocessor."
        )

    return preprocessor


# ---------------------------------------------------------------------------
# FEATURE NAMES
# ---------------------------------------------------------------------------

def get_transformed_feature_names(
    preprocessor: ColumnTransformer,
) -> list[str]:
    """
    Return the final feature names after preprocessing.

    Example:

        land_area
        affected_families
        ...
        project_type_Highway
        project_type_Railway
        state_Karnataka
        ...

    This is used by feature importance and explainability modules.
    """

    if preprocessor is None:
        raise ValueError(
            "A fitted preprocessor is required."
        )

    try:
        names = (
            preprocessor
            .get_feature_names_out()
        )

        return [
            str(name)
            for name in names
        ]

    except AttributeError as exc:
        raise RuntimeError(
            "The installed scikit-learn version does not "
            "support get_feature_names_out() for this "
            "preprocessor."
        ) from exc


# ---------------------------------------------------------------------------
# FEATURE COUNT
# ---------------------------------------------------------------------------

def get_transformed_feature_count(
    preprocessor: ColumnTransformer,
) -> int:
    """
    Return the number of columns produced by preprocessing.
    """

    return len(
        get_transformed_feature_names(
            preprocessor
        )
    )


# ---------------------------------------------------------------------------
# PREPROCESSOR METADATA
# ---------------------------------------------------------------------------

def get_preprocessor_metadata(
    preprocessor: ColumnTransformer,
) -> dict:
    """
    Return serializable metadata describing the fitted preprocessor.

    Useful when generating model_metadata.json.
    """

    feature_names = (
        get_transformed_feature_names(
            preprocessor
        )
    )

    return {
        "numeric_features": list(
            NUMERIC_FEATURES
        ),
        "categorical_features": list(
            CATEGORICAL_FEATURES
        ),
        "logical_feature_count": len(
            PREDICTION_FEATURES
        ),
        "transformed_feature_count": len(
            feature_names
        ),
        "transformed_feature_names": feature_names,
        "numeric_processing": [
            "median_imputation",
            "standard_scaling",
        ],
        "categorical_processing": [
            "most_frequent_imputation",
            "one_hot_encoding",
        ],
        "unknown_categories": "ignored",
        "remainder": "drop",
    }


# ---------------------------------------------------------------------------
# VALIDATION
# ---------------------------------------------------------------------------

def validate_preprocessor(
    preprocessor: ColumnTransformer,
) -> bool:
    """
    Validate that a preprocessor appears to be fitted correctly.

    Returns
    -------
    bool
        True if validation succeeds.

    Raises
    ------
    ValueError
        If the preprocessor is not fitted or is structurally invalid.
    """

    if preprocessor is None:
        raise ValueError(
            "Preprocessor is None."
        )

    if not isinstance(
        preprocessor,
        ColumnTransformer,
    ):
        raise TypeError(
            "Expected sklearn.compose.ColumnTransformer."
        )

    if not hasattr(
        preprocessor,
        "transformers_",
    ):
        raise ValueError(
            "Preprocessor has not been fitted yet."
        )

    feature_names = (
        get_transformed_feature_names(
            preprocessor
        )
    )

    if not feature_names:
        raise ValueError(
            "Preprocessor produced zero features."
        )

    return True


# ---------------------------------------------------------------------------
# CONVENIENCE FUNCTION
# ---------------------------------------------------------------------------

def fit_and_save_preprocessor(
    data: pd.DataFrame,
    path: Optional[str | Path] = None,
) -> ColumnTransformer:
    """
    Fit the shared LANDGUARD preprocessor and save it.

    This is useful when you want to run preprocessing separately.

    Example
    -------
        preprocessor = fit_and_save_preprocessor(
            training_dataframe
        )
    """

    preprocessor, _ = fit_preprocessor(
        data
    )

    validate_preprocessor(
        preprocessor
    )

    save_preprocessor(
        preprocessor,
        path=path,
    )

    return preprocessor
