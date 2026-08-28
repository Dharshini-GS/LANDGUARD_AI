"""
LANDGUARD AI - Model Evaluation Metrics
---------------------------------------

Shared evaluation utilities for:

    1. Classification model
    2. Regression model

Classification metrics:
    - Accuracy
    - Balanced Accuracy
    - Precision
    - Recall
    - F1 Score
    - ROC-AUC
    - Average Precision
    - Confusion Matrix
    - Specificity

Regression metrics:
    - MAE
    - MSE
    - RMSE
    - R2
    - MAPE
    - Median Absolute Error

This module does NOT train models.

It is intentionally independent of:
    train_classifier.py
    train_regressor.py
    predictor.py
    risk.py
    priority.py
"""

from __future__ import annotations

from typing import Any, Dict, Optional, Sequence

import numpy as np
import pandas as pd

from sklearn.metrics import (
    accuracy_score,
    average_precision_score,
    balanced_accuracy_score,
    confusion_matrix,
    f1_score,
    mean_absolute_error,
    mean_squared_error,
    median_absolute_error,
    precision_score,
    r2_score,
    recall_score,
    roc_auc_score,
)


# ============================================================================
# CONFIGURATION
# ============================================================================

DEFAULT_CLASSIFICATION_THRESHOLD = 0.50

DEFAULT_REGRESSION_DECIMAL_PLACES = 4


# ============================================================================
# BASIC HELPERS
# ============================================================================


def _to_numpy(
    values: Any,
) -> np.ndarray:
    """
    Convert pandas Series / lists / arrays into a numpy array.
    """

    if isinstance(values, pd.Series):
        return values.to_numpy()

    if isinstance(values, pd.DataFrame):
        return values.to_numpy()

    return np.asarray(values)


def _flatten(
    values: Any,
) -> np.ndarray:
    """
    Convert input into a one-dimensional numpy array.
    """

    return _to_numpy(values).reshape(-1)


def _safe_float(
    value: Any,
    default: float = 0.0,
) -> float:
    """
    Safely convert a value to float.
    """

    try:

        value = float(value)

        if not np.isfinite(value):
            return default

        return value

    except (
        TypeError,
        ValueError,
    ):

        return default


def _round(
    value: Any,
    decimals: int = DEFAULT_REGRESSION_DECIMAL_PLACES,
) -> float:
    """
    Safely round a metric.
    """

    return round(
        _safe_float(value),
        decimals,
    )


def _validate_same_length(
    y_true: Any,
    y_pred: Any,
) -> None:
    """
    Validate that two arrays have the same number of observations.
    """

    true_values = _flatten(y_true)
    predicted_values = _flatten(y_pred)

    if len(true_values) != len(predicted_values):

        raise ValueError(
            "y_true and y_pred must contain "
            "the same number of samples."
        )

    if len(true_values) == 0:

        raise ValueError(
            "Metric inputs cannot be empty."
        )


# ============================================================================
# CLASSIFICATION PREDICTION HELPERS
# ============================================================================


def probabilities_to_labels(
    probabilities: Any,
    threshold: float = DEFAULT_CLASSIFICATION_THRESHOLD,
) -> np.ndarray:
    """
    Convert predicted probabilities into binary class labels.

    Parameters
    ----------
    probabilities:
        Predicted probability of delayed = 1.

    threshold:
        Classification threshold.

    Returns
    -------
    numpy.ndarray
        Binary predictions.
    """

    threshold = _safe_float(
        threshold,
        DEFAULT_CLASSIFICATION_THRESHOLD,
    )

    if not 0.0 < threshold < 1.0:

        raise ValueError(
            "Classification threshold must be "
            "between 0 and 1."
        )

    probabilities = _flatten(
        probabilities
    ).astype(float)

    probabilities = np.nan_to_num(
        probabilities,
        nan=0.0,
        posinf=1.0,
        neginf=0.0,
    )

    return (
        probabilities >= threshold
    ).astype(int)


# ============================================================================
# CLASSIFICATION METRICS
# ============================================================================


def classification_metrics(
    y_true: Any,
    y_pred: Any,
    *,
    y_probability: Optional[Any] = None,
    threshold: float = DEFAULT_CLASSIFICATION_THRESHOLD,
) -> Dict[str, Any]:
    """
    Calculate complete LANDGUARD classification metrics.

    Parameters
    ----------
    y_true:
        Actual binary labels.

    y_pred:
        Predicted binary labels OR probabilities.

    y_probability:
        Optional predicted probabilities.

        If supplied, ROC-AUC and Average Precision are
        calculated from these probabilities.

    threshold:
        Probability threshold used to convert probabilities
        into binary predictions.

    Returns
    -------
    dict
        Classification evaluation metrics.
    """

    true_values = _flatten(
        y_true
    )

    if y_probability is not None:

        probability_values = (
            _flatten(
                y_probability
            ).astype(float)
        )

        if len(true_values) != len(
            probability_values
        ):

            raise ValueError(
                "y_true and y_probability must "
                "have the same length."
            )

        predicted_values = (
            probabilities_to_labels(
                probability_values,
                threshold=threshold,
            )
        )

    else:

        predicted_values = _flatten(
            y_pred
        )

        # If predictions are probabilities,
        # automatically convert them.
        if not np.issubdtype(
            predicted_values.dtype,
            np.integer,
        ):

            predicted_values = (
                probabilities_to_labels(
                    predicted_values,
                    threshold=threshold,
                )
            )

        else:

            predicted_values = (
                predicted_values.astype(int)
            )

        probability_values = None

    _validate_same_length(
        true_values,
        predicted_values,
    )

    true_values = (
        pd.to_numeric(
            pd.Series(true_values),
            errors="coerce",
        )
        .to_numpy()
    )

    if np.isnan(true_values).any():

        raise ValueError(
            "y_true contains invalid values."
        )

    true_values = (
        true_values.astype(int)
    )

    unique_classes = set(
        np.unique(
            true_values
        )
    )

    if not unique_classes.issubset(
        {0, 1}
    ):

        raise ValueError(
            "Classification targets must contain "
            "only 0 and 1."
        )

    predicted_values = np.asarray(
        predicted_values
    ).astype(int)

    # ------------------------------------------------------------------------
    # Core metrics
    # ------------------------------------------------------------------------

    accuracy = accuracy_score(
        true_values,
        predicted_values,
    )

    balanced_accuracy = (
        balanced_accuracy_score(
            true_values,
            predicted_values,
        )
    )

    precision = precision_score(
        true_values,
        predicted_values,
        zero_division=0,
    )

    recall = recall_score(
        true_values,
        predicted_values,
        zero_division=0,
    )

    f1 = f1_score(
        true_values,
        predicted_values,
        zero_division=0,
    )

    # ------------------------------------------------------------------------
    # Confusion matrix
    # ------------------------------------------------------------------------

    cm = confusion_matrix(
        true_values,
        predicted_values,
        labels=[0, 1],
    )

    tn, fp, fn, tp = (
        cm.ravel()
    )

    # Specificity = TN / (TN + FP)

    specificity_denominator = (
        tn + fp
    )

    specificity = (
        tn / specificity_denominator
        if specificity_denominator > 0
        else 0.0
    )

    # ------------------------------------------------------------------------
    # Probability-based metrics
    # ------------------------------------------------------------------------

    roc_auc = None
    average_precision = None

    if probability_values is not None:

        probability_values = np.clip(
            probability_values,
            0.0,
            1.0,
        )

        # ROC-AUC requires both classes.
        if len(
            np.unique(true_values)
        ) == 2:

            roc_auc = roc_auc_score(
                true_values,
                probability_values,
            )

            average_precision = (
                average_precision_score(
                    true_values,
                    probability_values,
                )
            )

    result = {

        "accuracy":
            _round(
                accuracy
            ),

        "balanced_accuracy":
            _round(
                balanced_accuracy
            ),

        "precision":
            _round(
                precision
            ),

        "recall":
            _round(
                recall
            ),

        "f1_score":
            _round(
                f1
            ),

        "roc_auc":
            (
                _round(roc_auc)
                if roc_auc is not None
                else None
            ),

        "average_precision":
            (
                _round(
                    average_precision
                )
                if average_precision is not None
                else None
            ),

        "specificity":
            _round(
                specificity
            ),

        "threshold":
            _round(
                threshold
            ),

        "true_negatives":
            int(tn),

        "false_positives":
            int(fp),

        "false_negatives":
            int(fn),

        "true_positives":
            int(tp),

        "support":
            int(
                len(true_values)
            ),
    }

    return result


# ============================================================================
# CLASSIFICATION FROM PROBABILITIES
# ============================================================================


def evaluate_classifier(
    y_true: Any,
    y_probability: Any,
    *,
    threshold: float = DEFAULT_CLASSIFICATION_THRESHOLD,
) -> Dict[str, Any]:
    """
    Evaluate a binary classifier directly from predicted probabilities.

    Example
    -------

        metrics = evaluate_classifier(
            y_test,
            model.predict_proba(X_test)[:, 1],
            threshold=0.50,
        )
    """

    return classification_metrics(

        y_true=y_true,

        y_pred=probabilities_to_labels(
            y_probability,
            threshold=threshold,
        ),

        y_probability=y_probability,

        threshold=threshold,
    )


# ============================================================================
# THRESHOLD SEARCH
# ============================================================================


def find_best_classification_threshold(
    y_true: Any,
    y_probability: Any,
    *,
    metric: str = "f1_score",
    minimum_recall: Optional[float] = None,
    minimum_precision: Optional[float] = None,
    thresholds: Optional[Sequence[float]] = None,
) -> Dict[str, Any]:
    """
    Find the best probability threshold.

    This is especially useful for LANDGUARD because the default
    0.50 threshold is not always the best operating point.

    Supported optimization metrics:

        accuracy
        balanced_accuracy
        precision
        recall
        f1_score

    Optional constraints:

        minimum_recall
        minimum_precision
    """

    true_values = _flatten(
        y_true
    )

    probability_values = _flatten(
        y_probability
    ).astype(float)

    if len(true_values) != len(
        probability_values
    ):

        raise ValueError(
            "y_true and y_probability must "
            "have the same length."
        )

    if thresholds is None:

        thresholds = np.arange(
            0.10,
            0.91,
            0.01,
        )

    metric = str(
        metric
    ).lower().strip()

    allowed_metrics = {

        "accuracy",
        "balanced_accuracy",
        "precision",
        "recall",
        "f1_score",
    }

    if metric not in allowed_metrics:

        raise ValueError(
            f"Unsupported threshold metric: {metric}. "
            f"Choose from {sorted(allowed_metrics)}."
        )

    minimum_recall_value = (
        None
        if minimum_recall is None
        else _safe_float(
            minimum_recall
        )
    )

    minimum_precision_value = (
        None
        if minimum_precision is None
        else _safe_float(
            minimum_precision
        )
    )

    candidates = []

    for threshold in thresholds:

        threshold = _safe_float(
            threshold
        )

        if not 0.0 < threshold < 1.0:
            continue

        predictions = (
            probabilities_to_labels(
                probability_values,
                threshold,
            )
        )

        metrics = classification_metrics(

            true_values,

            predictions,

            y_probability=probability_values,

            threshold=threshold,
        )

        if (
            minimum_recall_value is not None
            and metrics["recall"]
            < minimum_recall_value
        ):
            continue

        if (
            minimum_precision_value is not None
            and metrics["precision"]
            < minimum_precision_value
        ):
            continue

        candidates.append(
            metrics
        )

    if not candidates:

        raise ValueError(
            "No threshold satisfies the supplied constraints."
        )

    best = max(
        candidates,
        key=lambda item: (
            item[metric],
            item["balanced_accuracy"],
            item["f1_score"],
        ),
    )

    return best


# ============================================================================
# REGRESSION METRICS
# ============================================================================


def regression_metrics(
    y_true: Any,
    y_pred: Any,
) -> Dict[str, Any]:
    """
    Calculate complete LANDGUARD regression metrics.

    Metrics:

        MAE
        MSE
        RMSE
        R2
        MAPE
        Median Absolute Error
    """

    true_values = (
        _flatten(
            y_true
        ).astype(float)
    )

    predicted_values = (
        _flatten(
            y_pred
        ).astype(float)
    )

    _validate_same_length(
        true_values,
        predicted_values,
    )

    if not np.isfinite(
        true_values
    ).all():

        raise ValueError(
            "y_true contains NaN or infinite values."
        )

    if not np.isfinite(
        predicted_values
    ).all():

        raise ValueError(
            "y_pred contains NaN or infinite values."
        )

    mae = mean_absolute_error(
        true_values,
        predicted_values,
    )

    mse = mean_squared_error(
        true_values,
        predicted_values,
    )

    rmse = np.sqrt(
        mse
    )

    r2 = r2_score(
        true_values,
        predicted_values,
    )

    median_ae = (
        median_absolute_error(
            true_values,
            predicted_values,
        )
    )

    # ------------------------------------------------------------------------
    # MAPE
    # ------------------------------------------------------------------------
    #
    # Actual delay can legitimately be 0.
    # Therefore zero targets are excluded from MAPE.
    #

    nonzero_mask = (
        np.abs(true_values) > 1e-9
    )

    if nonzero_mask.any():

        mape = np.mean(
            np.abs(
                (
                    true_values[
                        nonzero_mask
                    ]
                    - predicted_values[
                        nonzero_mask
                    ]
                )
                / true_values[
                    nonzero_mask
                ]
            )
        ) * 100.0

    else:

        mape = None

    return {

        "mae":
            _round(
                mae
            ),

        "mse":
            _round(
                mse
            ),

        "rmse":
            _round(
                rmse
            ),

        "r2":
            _round(
                r2
            ),

        "mape":
            (
                _round(
                    mape
                )
                if mape is not None
                else None
            ),

        "median_absolute_error":
            _round(
                median_ae
            ),

        "support":
            int(
                len(true_values)
            ),
    }


# ============================================================================
# EVALUATE REGRESSOR
# ============================================================================


def evaluate_regressor(
    y_true: Any,
    y_pred: Any,
) -> Dict[str, Any]:
    """
    Evaluate a regression model.

    Example
    -------

        metrics = evaluate_regressor(
            y_test,
            model.predict(X_test),
        )
    """

    return regression_metrics(
        y_true,
        y_pred,
    )


# ============================================================================
# CONFUSION MATRIX
# ============================================================================


def get_confusion_matrix(
    y_true: Any,
    y_pred: Any,
) -> Dict[str, int]:
    """
    Return confusion matrix values in dictionary form.
    """

    true_values = _flatten(
        y_true
    ).astype(int)

    predicted_values = _flatten(
        y_pred
    ).astype(int)

    _validate_same_length(
        true_values,
        predicted_values,
    )

    cm = confusion_matrix(
        true_values,
        predicted_values,
        labels=[0, 1],
    )

    tn, fp, fn, tp = (
        cm.ravel()
    )

    return {

        "true_negatives":
            int(tn),

        "false_positives":
            int(fp),

        "false_negatives":
            int(fn),

        "true_positives":
            int(tp),
    }


# ============================================================================
# CLASS DISTRIBUTION
# ============================================================================


def get_class_distribution(
    y_true: Any,
) -> Dict[str, Any]:
    """
    Return binary classification distribution.
    """

    values = _flatten(
        y_true
    ).astype(int)

    total = len(
        values
    )

    count_0 = int(
        np.sum(
            values == 0
        )
    )

    count_1 = int(
        np.sum(
            values == 1
        )
    )

    return {

        "total":
            total,

        "class_0":
            count_0,

        "class_1":
            count_1,

        "class_0_percentage":
            _round(
                (
                    count_0
                    / total
                    * 100.0
                )
                if total
                else 0.0
            ),

        "class_1_percentage":
            _round(
                (
                    count_1
                    / total
                    * 100.0
                )
                if total
                else 0.0
            ),
    }


# ============================================================================
# MODEL PERFORMANCE STATUS
# ============================================================================


def classify_classifier_performance(
    metrics: Dict[str, Any],
    *,
    target_accuracy: float = 0.80,
    target_f1: float = 0.80,
    target_roc_auc: float = 0.80,
) -> Dict[str, Any]:
    """
    Determine whether the classifier meets target performance.

    This does not change the model.

    It provides a simple project-level evaluation status.
    """

    accuracy = _safe_float(
        metrics.get(
            "accuracy"
        )
    )

    f1 = _safe_float(
        metrics.get(
            "f1_score"
        )
    )

    roc_auc = _safe_float(
        metrics.get(
            "roc_auc"
        )
    )

    checks = {

        "accuracy_target_met":
            accuracy >= target_accuracy,

        "f1_target_met":
            f1 >= target_f1,

        "roc_auc_target_met":
            roc_auc >= target_roc_auc,
    }

    passed = all(
        checks.values()
    )

    return {

        "status":
            "PASS"
            if passed
            else "NEEDS_IMPROVEMENT",

        "checks":
            checks,

        "target_accuracy":
            target_accuracy,

        "target_f1":
            target_f1,

        "target_roc_auc":
            target_roc_auc,
    }


def classify_regressor_performance(
    metrics: Dict[str, Any],
    *,
    minimum_r2: float = 0.70,
    maximum_mae: Optional[float] = None,
    maximum_rmse: Optional[float] = None,
) -> Dict[str, Any]:
    """
    Determine whether the regression model meets configured targets.
    """

    r2 = _safe_float(
        metrics.get(
            "r2"
        ),
            -999,
    )

    mae = _safe_float(
        metrics.get(
            "mae"
        ),
            float("inf"),
    )

    rmse = _safe_float(
        metrics.get(
            "rmse"
        ),
            float("inf"),
    )

    checks = {

        "r2_target_met":
            r2 >= minimum_r2,
    }

    if maximum_mae is not None:

        checks[
            "mae_target_met"
        ] = (
            mae <= maximum_mae
        )

    if maximum_rmse is not None:

        checks[
            "rmse_target_met"
        ] = (
            rmse <= maximum_rmse
        )

    return {

        "status":
            "PASS"
            if all(
                checks.values()
            )
            else "NEEDS_IMPROVEMENT",

        "checks":
            checks,

        "minimum_r2":
            minimum_r2,

        "maximum_mae":
            maximum_mae,

        "maximum_rmse":
            maximum_rmse,
    }


# ============================================================================
# COMBINED MODEL REPORT
# ============================================================================


def build_model_report(
    *,
    classifier_metrics_result: Optional[
        Dict[str, Any]
    ] = None,
    regressor_metrics_result: Optional[
        Dict[str, Any]
    ] = None,
) -> Dict[str, Any]:
    """
    Build one combined LANDGUARD model evaluation report.
    """

    report = {

        "project":
            "LANDGUARD AI",

        "classification":
            classifier_metrics_result,

        "regression":
            regressor_metrics_result,
    }

    if classifier_metrics_result is not None:

        report[
            "classification_status"
        ] = classify_classifier_performance(
            classifier_metrics_result
        )

    if regressor_metrics_result is not None:

        report[
            "regression_status"
        ] = classify_regressor_performance(
            regressor_metrics_result
        )

    return report


# ============================================================================
# PRINT CLASSIFICATION REPORT
# ============================================================================


def print_classification_report(
    metrics: Dict[str, Any],
) -> None:
    """
    Print a readable classifier evaluation report.
    """

    print()
    print("=" * 70)
    print(
        "LANDGUARD AI - CLASSIFICATION METRICS"
    )
    print("=" * 70)

    print(
        f"Accuracy:           {metrics.get('accuracy', 0):.4f}"
    )

    print(
        f"Balanced Accuracy:  {metrics.get('balanced_accuracy', 0):.4f}"
    )

    print(
        f"Precision:          {metrics.get('precision', 0):.4f}"
    )

    print(
        f"Recall:             {metrics.get('recall', 0):.4f}"
    )

    print(
        f"F1 Score:           {metrics.get('f1_score', 0):.4f}"
    )

    roc_auc = metrics.get(
        "roc_auc"
    )

    print(
        "ROC-AUC:            "
        + (
            f"{roc_auc:.4f}"
            if roc_auc is not None
            else "N/A"
        )
    )

    average_precision = metrics.get(
        "average_precision"
    )

    print(
        "Average Precision:  "
        + (
            f"{average_precision:.4f}"
            if average_precision is not None
            else "N/A"
        )
    )

    print(
        f"Specificity:        {metrics.get('specificity', 0):.4f}"
    )

    print(
        f"Threshold:          {metrics.get('threshold', 0.5):.2f}"
    )

    print()
    print(
        "Confusion Matrix:"
    )

    print(
        f"  TN: {metrics.get('true_negatives', 0)}"
        f"    FP: {metrics.get('false_positives', 0)}"
    )

    print(
        f"  FN: {metrics.get('false_negatives', 0)}"
        f"    TP: {metrics.get('true_positives', 0)}"
    )

    print("=" * 70)


# ============================================================================
# PRINT REGRESSION REPORT
# ============================================================================


def print_regression_report(
    metrics: Dict[str, Any],
) -> None:
    """
    Print a readable regressor evaluation report.
    """

    print()
    print("=" * 70)
    print(
        "LANDGUARD AI - REGRESSION METRICS"
    )
    print("=" * 70)

    print(
        f"MAE:                 {metrics.get('mae', 0):.4f}"
    )

    print(
        f"MSE:                 {metrics.get('mse', 0):.4f}"
    )

    print(
        f"RMSE:                {metrics.get('rmse', 0):.4f}"
    )

    print(
        f"R² Score:            {metrics.get('r2', 0):.4f}"
    )

    mape = metrics.get(
        "mape"
    )

    print(
        "MAPE:                "
        + (
            f"{mape:.4f}%"
            if mape is not None
            else "N/A"
        )
    )

    print(
        f"Median Absolute Error: {metrics.get('median_absolute_error', 0):.4f}"
    )

    print(
        f"Samples:             {metrics.get('support', 0)}"
    )

    print("=" * 70)


# ============================================================================
# TEST
# ============================================================================


if __name__ == "__main__":

    print("=" * 70)
    print(
        "LANDGUARD AI - metrics.py"
    )
    print("=" * 70)

    # ------------------------------------------------------------------------
    # Classification demo
    # ------------------------------------------------------------------------

    y_class_true = np.array([
        0, 0, 0, 0, 0,
        1, 1, 1, 1, 1,
    ])

    y_class_probability = np.array([
        0.10,
        0.20,
        0.25,
        0.40,
        0.35,
        0.70,
        0.80,
        0.85,
        0.90,
        0.95,
    ])

    classifier_result = (
        evaluate_classifier(

            y_class_true,

            y_class_probability,

            threshold=0.50,
        )
    )

    print_classification_report(
        classifier_result
    )

    # ------------------------------------------------------------------------
    # Threshold optimization
    # ------------------------------------------------------------------------

    best_threshold = (
        find_best_classification_threshold(

            y_class_true,

            y_class_probability,

            metric="f1_score",
        )
    )

    print()
    print(
        "Best threshold:"
    )

    print(
        best_threshold[
            "threshold"
        ]
    )

    # ------------------------------------------------------------------------
    # Regression demo
    # ------------------------------------------------------------------------

    y_reg_true = np.array([
        10,
        20,
        35,
        50,
        80,
        100,
    ])

    y_reg_pred = np.array([
        12,
        18,
        32,
        55,
        76,
        105,
    ])

    regressor_result = (
        evaluate_regressor(
            y_reg_true,
            y_reg_pred,
        )
    )

    print_regression_report(
        regressor_result
    )

    # ------------------------------------------------------------------------
    # Combined report
    # ------------------------------------------------------------------------

    combined = build_model_report(

        classifier_metrics_result=
            classifier_result,

        regressor_metrics_result=
            regressor_result,
    )

    print()
    print(
        "Combined LANDGUARD model report:"
    )

    print(
        combined
    )

    print()
    print(
        "metrics.py is running successfully."
    )
