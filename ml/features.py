"""
LANDGUARD AI - Feature Engineering
-----------------------------------

Feature engineering and synthetic development data generation
for LANDGUARD AI delay prediction.

Targets:
    delayed
        0 = not delayed
        1 = delayed

    actual_delay_days
        Regression target.

IMPORTANT:
    Target and leakage columns are never returned by
    engineer_features().
"""

from __future__ import annotations

from typing import Iterable, Optional

import numpy as np
import pandas as pd


# ============================================================================
# RAW NUMERIC FEATURES
# ============================================================================

BASE_NUMERIC_FEATURES = [
    "land_area",
    "affected_families",
    "landowners",

    "notification_pending_days",
    "documentation_completion_pct",

    "ownership_conflict_count",

    "possession_pct",

    "compensation_amount",
    "compensation_completed_pct",
    "pending_compensation_cases",
    "average_processing_days",
    "pending_compensation_amount",

    "legal_disputes",
    "pending_legal_cases",
    "average_legal_resolution_time",

    "pending_approvals",
    "approval_delay_days",

    "rr_completion_pct",
    "rr_waiting_families",
    "pending_resettlement_cases",

    "avg_stakeholder_response_time",
    "pending_requests",

    "department_coordination_score",
    "administrative_bottleneck_count",
]


# ============================================================================
# CATEGORICAL FEATURES
# ============================================================================

CATEGORICAL_FEATURES = [
    "project_type",
    "state",
    "district",
    "notification_status",
    "ownership_status",
    "compensation_status",
    "legal_status",
    "approval_status",
]


# ============================================================================
# ENGINEERED FEATURES
# ============================================================================

ENGINEERED_FEATURES = [
    "compensation_pending_ratio",
    "legal_dispute_density",
    "approval_delay_score",
    "documentation_score",
    "rr_score",
    "possession_score",
    "ownership_conflict_score",
    "stakeholder_response_score",
    "administrative_bottleneck_score",
    "project_importance",
    "delay_impact",
    "urgency",
]


# ============================================================================
# FINAL FEATURE LIST
# ============================================================================

PREDICTION_FEATURES = (
    BASE_NUMERIC_FEATURES
    + ENGINEERED_FEATURES
    + CATEGORICAL_FEATURES
)


# ============================================================================
# TARGETS
# ============================================================================

TARGET_COLUMNS = {
    "classification": "delayed",
    "regression": "actual_delay_days",
}


# ============================================================================
# LEAKAGE COLUMNS
# ============================================================================

LEAKAGE_COLUMNS = {
    "delayed",
    "actual_delay_days",
    "actual_delay",
    "delay_days",
    "final_delay_days",
    "project_outcome",
    "final_outcome",
    "completion_date",
    "actual_completion_date",
    "final_completion_date",
    "days_to_completion",
}


# ============================================================================
# DEFAULT VALUES
# ============================================================================

DEFAULT_CATEGORICAL_VALUE = "Unknown"

DEFAULT_NUMERIC_VALUE = 0.0


# ============================================================================
# HELPERS
# ============================================================================

def _numeric_series(
    df: pd.DataFrame,
    column: str,
    default: float = DEFAULT_NUMERIC_VALUE,
) -> pd.Series:

    if column not in df.columns:

        return pd.Series(
            default,
            index=df.index,
            dtype=float,
        )

    return (
        pd.to_numeric(
            df[column],
            errors="coerce",
        )
        .fillna(default)
    )


def _safe_divide(
    numerator: pd.Series,
    denominator: pd.Series,
    default: float = 0.0,
) -> pd.Series:

    denominator = denominator.replace(
        0,
        np.nan,
    )

    result = numerator / denominator

    return (
        result
        .replace(
            [np.inf, -np.inf],
            np.nan,
        )
        .fillna(default)
    )


def _clip_percentage(
    series: pd.Series,
) -> pd.Series:

    return series.clip(
        lower=0.0,
        upper=100.0,
    )


def _normalize_percentage(
    series: pd.Series,
) -> pd.Series:

    return (
        _clip_percentage(series)
        / 100.0
    )


def _saturation_score(
    series: pd.Series,
    scale: float,
) -> pd.Series:

    scale = max(
        float(scale),
        1e-9,
    )

    values = series.clip(
        lower=0.0
    )

    return (
        1.0
        - np.exp(
            -values / scale
        )
    ).clip(
        0.0,
        1.0,
    )


# ============================================================================
# INPUT VALIDATION
# ============================================================================

def validate_input_columns(
    data: pd.DataFrame,
    required: Optional[Iterable[str]] = None,
) -> dict:

    if not isinstance(
        data,
        pd.DataFrame,
    ):

        raise TypeError(
            "data must be a pandas.DataFrame"
        )

    required_columns = list(
        required
        if required is not None
        else PREDICTION_FEATURES
    )

    present = [
        column
        for column in required_columns
        if column in data.columns
    ]

    missing = [
        column
        for column in required_columns
        if column not in data.columns
    ]

    return {
        "required": required_columns,
        "present": present,
        "missing": missing,
    }


# ============================================================================
# FEATURE ENGINEERING
# ============================================================================

def engineer_features(
    data: pd.DataFrame,
    *,
    include_identifiers: bool = False,
) -> pd.DataFrame:

    if not isinstance(
        data,
        pd.DataFrame,
    ):

        raise TypeError(
            "engineer_features() expects "
            "a pandas.DataFrame"
        )

    df = data.copy()

    # ------------------------------------------------------------------------
    # NUMERIC COLUMNS
    # ------------------------------------------------------------------------

    for column in BASE_NUMERIC_FEATURES:

        if column not in df.columns:

            df[column] = (
                DEFAULT_NUMERIC_VALUE
            )

        df[column] = (
            pd.to_numeric(
                df[column],
                errors="coerce",
            )
            .fillna(
                DEFAULT_NUMERIC_VALUE
            )
        )

    # ------------------------------------------------------------------------
    # CATEGORICAL COLUMNS
    # ------------------------------------------------------------------------

    for column in CATEGORICAL_FEATURES:

        if column not in df.columns:

            df[column] = (
                DEFAULT_CATEGORICAL_VALUE
            )

        df[column] = (
            df[column]
            .fillna(
                DEFAULT_CATEGORICAL_VALUE
            )
            .astype(str)
            .replace(
                "",
                DEFAULT_CATEGORICAL_VALUE,
            )
        )

    # ------------------------------------------------------------------------
    # REFERENCES
    # ------------------------------------------------------------------------

    land_area = _numeric_series(
        df,
        "land_area",
    )

    affected_families = _numeric_series(
        df,
        "affected_families",
    )

    landowners = _numeric_series(
        df,
        "landowners",
    ).clip(
        lower=1
    )

    notification_pending_days = _numeric_series(
        df,
        "notification_pending_days",
    )

    documentation_completion_pct = _numeric_series(
        df,
        "documentation_completion_pct",
    )

    ownership_conflict_count = _numeric_series(
        df,
        "ownership_conflict_count",
    )

    possession_pct = _numeric_series(
        df,
        "possession_pct",
    )

    compensation_completed_pct = _numeric_series(
        df,
        "compensation_completed_pct",
    )

    pending_compensation_cases = _numeric_series(
        df,
        "pending_compensation_cases",
    )

    legal_disputes = _numeric_series(
        df,
        "legal_disputes",
    )

    pending_legal_cases = _numeric_series(
        df,
        "pending_legal_cases",
    )

    approval_delay_days = _numeric_series(
        df,
        "approval_delay_days",
    )

    pending_approvals = _numeric_series(
        df,
        "pending_approvals",
    )

    rr_completion_pct = _numeric_series(
        df,
        "rr_completion_pct",
    )

    pending_resettlement_cases = _numeric_series(
        df,
        "pending_resettlement_cases",
    )

    avg_stakeholder_response_time = _numeric_series(
        df,
        "avg_stakeholder_response_time",
    )

    pending_requests = _numeric_series(
        df,
        "pending_requests",
    )

    administrative_bottleneck_count = _numeric_series(
        df,
        "administrative_bottleneck_count",
    )

    # =========================================================================
    # ENGINEERED FEATURES
    # =========================================================================

    # Compensation risk
    df["compensation_pending_ratio"] = (
        1.0
        - _normalize_percentage(
            compensation_completed_pct
        )
    ).clip(
        0.0,
        1.0,
    )

    # Legal dispute density
    df["legal_dispute_density"] = (
        _safe_divide(
            legal_disputes,
            landowners,
        )
        .clip(
            0.0,
            10.0,
        )
    )

    # Approval delay
    df["approval_delay_score"] = (
        _saturation_score(
            approval_delay_days,
            scale=35.0,
        )
    )

    # Documentation
    df["documentation_score"] = (
        _normalize_percentage(
            documentation_completion_pct
        )
    )

    # R&R
    df["rr_score"] = (
        _normalize_percentage(
            rr_completion_pct
        )
    )

    # Possession
    df["possession_score"] = (
        _normalize_percentage(
            possession_pct
        )
    )

    # Ownership conflict
    df["ownership_conflict_score"] = (
        _saturation_score(
            ownership_conflict_count,
            scale=4.0,
        )
    )

    # Stakeholder response
    df["stakeholder_response_score"] = (
        _saturation_score(
            avg_stakeholder_response_time,
            scale=25.0,
        )
    )

    # Administrative bottleneck
    df["administrative_bottleneck_score"] = (
        _saturation_score(
            administrative_bottleneck_count,
            scale=4.0,
        )
    )

    # =========================================================================
    # PROJECT IMPORTANCE
    # =========================================================================

    if len(df) > 1:

        family_rank = (
            affected_families
            .rank(
                method="average",
                pct=True,
            )
            .fillna(0.5)
        )

        area_rank = (
            land_area
            .rank(
                method="average",
                pct=True,
            )
            .fillna(0.5)
        )

    else:

        family_rank = pd.Series(
            0.5,
            index=df.index,
        )

        area_rank = pd.Series(
            0.5,
            index=df.index,
        )

    df["project_importance"] = (
        0.50 * family_rank
        + 0.50 * area_rank
    ).clip(
        0.0,
        1.0,
    )

    # =========================================================================
    # DELAY IMPACT
    # =========================================================================

    df["delay_impact"] = (
        0.60 * family_rank
        + 0.40 * area_rank
    ).clip(
        0.0,
        1.0,
    )

    # =========================================================================
    # URGENCY
    # =========================================================================

    compensation_urgency = (
        1.0
        - _normalize_percentage(
            compensation_completed_pct
        )
    ).clip(
        0.0,
        1.0,
    )

    approval_urgency = (
        df["approval_delay_score"]
    )

    notification_urgency = (
        _saturation_score(
            notification_pending_days,
            scale=35.0,
        )
    )

    legal_urgency = (
        _saturation_score(
            pending_legal_cases,
            scale=6.0,
        )
    )

    df["urgency"] = (
        0.30 * compensation_urgency
        + 0.30 * approval_urgency
        + 0.20 * notification_urgency
        + 0.20 * legal_urgency
    ).clip(
        0.0,
        1.0,
    )

    # =========================================================================
    # FINAL CLEANUP
    # =========================================================================

    for column in PREDICTION_FEATURES:

        if column not in df.columns:

            if column in CATEGORICAL_FEATURES:

                df[column] = (
                    DEFAULT_CATEGORICAL_VALUE
                )

            else:

                df[column] = (
                    DEFAULT_NUMERIC_VALUE
                )

    for column in (
        BASE_NUMERIC_FEATURES
        + ENGINEERED_FEATURES
    ):

        df[column] = (
            pd.to_numeric(
                df[column],
                errors="coerce",
            )
            .fillna(
                DEFAULT_NUMERIC_VALUE
            )
        )

    for column in CATEGORICAL_FEATURES:

        df[column] = (
            df[column]
            .fillna(
                DEFAULT_CATEGORICAL_VALUE
            )
            .astype(str)
            .replace(
                "",
                DEFAULT_CATEGORICAL_VALUE,
            )
        )

    result = df.loc[
        :,
        PREDICTION_FEATURES,
    ].copy()

    if include_identifiers:

        result.attrs[
            "identifier_columns"
        ] = [
            column
            for column in [
                "project_id",
                "project_name",
                "id",
            ]
            if column in data.columns
        ]

    return result


# ============================================================================
# TRAINING DATA VALIDATION
# ============================================================================

def validate_training_data(
    data: pd.DataFrame,
    require_classification_target: bool = True,
    require_regression_target: bool = True,
) -> dict:

    if not isinstance(
        data,
        pd.DataFrame,
    ):

        raise TypeError(
            "Training data must be "
            "a pandas.DataFrame"
        )

    report = {

        "rows": int(
            len(data)
        ),

        "columns": int(
            len(data.columns)
        ),

        "classification_target_present": (
            TARGET_COLUMNS[
                "classification"
            ]
            in data.columns
        ),

        "regression_target_present": (
            TARGET_COLUMNS[
                "regression"
            ]
            in data.columns
        ),

        "missing_prediction_features": [
            column
            for column in PREDICTION_FEATURES
            if column not in data.columns
        ],

        "warnings": [],
    }

    if (
        require_classification_target
        and not report[
            "classification_target_present"
        ]
    ):

        report["warnings"].append(
            "Missing classification target: delayed"
        )

    if (
        require_regression_target
        and not report[
            "regression_target_present"
        ]
    ):

        report["warnings"].append(
            "Missing regression target: "
            "actual_delay_days"
        )

    if len(data) == 0:

        report["warnings"].append(
            "Training dataframe is empty."
        )

    if report[
        "classification_target_present"
    ]:

        target = pd.to_numeric(
            data[
                TARGET_COLUMNS[
                    "classification"
                ]
            ],
            errors="coerce",
        )

        report[
            "classification_missing_targets"
        ] = int(
            target.isna().sum()
        )

        report[
            "classification_classes"
        ] = sorted(
            target.dropna()
            .unique()
            .tolist()
        )

    if report[
        "regression_target_present"
    ]:

        target = pd.to_numeric(
            data[
                TARGET_COLUMNS[
                    "regression"
                ]
            ],
            errors="coerce",
        )

        report[
            "regression_missing_targets"
        ] = int(
            target.isna().sum()
        )

    return report


# ============================================================================
# CLASSIFICATION TARGET
# ============================================================================

def get_classification_target(
    data: pd.DataFrame,
) -> pd.Series:

    column = TARGET_COLUMNS[
        "classification"
    ]

    if column not in data.columns:

        raise ValueError(
            f"Missing required classification "
            f"target column: {column}"
        )

    target = pd.to_numeric(
        data[column],
        errors="coerce",
    )

    if target.isna().any():

        raise ValueError(
            f"Classification target '{column}' "
            f"contains invalid or missing values."
        )

    unique_values = set(
        target.unique()
    )

    if not unique_values.issubset(
        {0, 1}
    ):

        raise ValueError(
            f"Classification target '{column}' "
            f"must contain only 0 and 1. "
            f"Found: {sorted(unique_values)}"
        )

    return target.astype(int)


# ============================================================================
# REGRESSION TARGET
# ============================================================================

def get_regression_target(
    data: pd.DataFrame,
) -> pd.Series:

    column = TARGET_COLUMNS[
        "regression"
    ]

    if column not in data.columns:

        raise ValueError(
            f"Missing required regression "
            f"target column: {column}"
        )

    target = pd.to_numeric(
        data[column],
        errors="coerce",
    )

    if target.isna().any():

        raise ValueError(
            f"Regression target '{column}' "
            f"contains invalid or missing values."
        )

    if (target < 0).any():

        raise ValueError(
            f"Regression target '{column}' "
            f"cannot contain negative values."
        )

    return target.astype(float)


# ============================================================================
# SYNTHETIC DATA GENERATOR
# ============================================================================

def make_synthetic_dataset(
    n: int = 2000,
    seed: int = 42,
) -> pd.DataFrame:

    if n < 50:

        raise ValueError(
            "Synthetic dataset should contain "
            "at least 50 rows."
        )

    rng = np.random.default_rng(
        seed
    )

    project_types = np.array([
        "Highway",
        "Railway",
        "Industrial Corridor",
        "Metro",
        "Irrigation",
    ])

    states = np.array([
        "Tamil Nadu",
        "Karnataka",
        "Kerala",
        "Andhra Pradesh",
        "Telangana",
    ])

    districts = np.array([
        "District A",
        "District B",
        "District C",
        "District D",
        "District E",
    ])

    df = pd.DataFrame({

        "project_id": [
            f"P{i:05d}"
            for i in range(1, n + 1)
        ],

        "project_name": [
            f"LANDGUARD Project {i:05d}"
            for i in range(1, n + 1)
        ],

        "project_type": rng.choice(
            project_types,
            size=n,
        ),

        "state": rng.choice(
            states,
            size=n,
        ),

        "district": rng.choice(
            districts,
            size=n,
        ),

        "land_area": rng.lognormal(
            mean=5.7,
            sigma=0.8,
            size=n,
        ).clip(
            20,
            2500,
        ),

        "affected_families": rng.poisson(
            lam=260,
            size=n,
        ).clip(
            10,
            1500,
        ),

        "landowners": rng.poisson(
            lam=180,
            size=n,
        ).clip(
            5,
            1200,
        ),

        "notification_pending_days": rng.gamma(
            shape=2.2,
            scale=20,
            size=n,
        ).clip(
            0,
            240,
        ),

        "documentation_completion_pct": (
            rng.beta(
                7,
                2.5,
                size=n,
            )
            * 100
        ),

        "ownership_conflict_count": rng.poisson(
            lam=4,
            size=n,
        ),

        "possession_pct": (
            rng.beta(
                5,
                3,
                size=n,
            )
            * 100
        ),

        "compensation_amount": rng.lognormal(
            mean=15,
            sigma=1.1,
            size=n,
        ),

        "compensation_completed_pct": (
            rng.beta(
                4.5,
                3.5,
                size=n,
            )
            * 100
        ),

        "pending_compensation_cases": rng.poisson(
            lam=22,
            size=n,
        ),

        "average_processing_days": rng.gamma(
            shape=2.5,
            scale=8,
            size=n,
        ).clip(
            1,
            100,
        ),

        "pending_compensation_amount": rng.lognormal(
            mean=14,
            sigma=1.1,
            size=n,
        ),

        "legal_disputes": rng.poisson(
            lam=7,
            size=n,
        ),

        "pending_legal_cases": rng.poisson(
            lam=8,
            size=n,
        ),

        "average_legal_resolution_time": rng.gamma(
            shape=3,
            scale=35,
            size=n,
        ).clip(
            5,
            500,
        ),

        "pending_approvals": rng.poisson(
            lam=3,
            size=n,
        ),

        "approval_delay_days": rng.gamma(
            shape=2.2,
            scale=15,
            size=n,
        ).clip(
            0,
            180,
        ),

        "rr_completion_pct": (
            rng.beta(
                4,
                4,
                size=n,
            )
            * 100
        ),

        "rr_waiting_families": rng.poisson(
            lam=55,
            size=n,
        ),

        "pending_resettlement_cases": rng.poisson(
            lam=18,
            size=n,
        ),

        "avg_stakeholder_response_time": rng.gamma(
            shape=2.5,
            scale=7,
            size=n,
        ).clip(
            1,
            90,
        ),

        "pending_requests": rng.poisson(
            lam=12,
            size=n,
        ),

        "department_coordination_score": (
            rng.beta(
                6,
                2,
                size=n,
            )
            * 100
        ),

        "administrative_bottleneck_count": rng.poisson(
            lam=3,
            size=n,
        ),
    })

    # =========================================================================
    # STATUS
    # =========================================================================

    df["notification_status"] = np.where(
        df[
            "notification_pending_days"
        ] > 30,
        "Pending",
        "Completed",
    )

    df["ownership_status"] = np.where(
        df[
            "ownership_conflict_count"
        ] > 5,
        "Conflict",
        "Verified",
    )

    df["compensation_status"] = np.where(
        df[
            "compensation_completed_pct"
        ] < 70,
        "Pending",
        "On Track",
    )

    df["legal_status"] = np.where(
        df[
            "pending_legal_cases"
        ] > 5,
        "Pending",
        "Low",
    )

    df["approval_status"] = np.where(
        df[
            "approval_delay_days"
        ] > 30,
        "Pending",
        "On Track",
    )

    # =========================================================================
    # LATENT DELAY RISK
    # =========================================================================

    # IMPORTANT:
    # This target is generated from observable project conditions.
    #
    # There is noise, but the relationship is intentionally strong enough
    # for a development/demo model to learn.

    compensation_risk = (
        1.0
        - (
            df[
                "compensation_completed_pct"
            ].clip(
                0,
                100,
            )
            / 100.0
        )
    )

    documentation_risk = (
        1.0
        - (
            df[
                "documentation_completion_pct"
            ].clip(
                0,
                100,
            )
            / 100.0
        )
    )

    rr_risk = (
        1.0
        - (
            df[
                "rr_completion_pct"
            ].clip(
                0,
                100,
            )
            / 100.0
        )
    )

    possession_risk = (
        1.0
        - (
            df[
                "possession_pct"
            ].clip(
                0,
                100,
            )
            / 100.0
        )
    )

    approval_risk = np.clip(
        df[
            "approval_delay_days"
        ] / 60.0,
        0,
        1.5,
    )

    notification_risk = np.clip(
        df[
            "notification_pending_days"
        ] / 100.0,
        0,
        1.5,
    )

    legal_risk = np.clip(
        (
            df[
                "pending_legal_cases"
            ] / 12.0
        ),
        0,
        1.5,
    )

    ownership_risk = np.clip(
        (
            df[
                "ownership_conflict_count"
            ] / 8.0
        ),
        0,
        1.5,
    )

    stakeholder_risk = np.clip(
        (
            df[
                "avg_stakeholder_response_time"
            ] / 45.0
        ),
        0,
        1.5,
    )

    administrative_risk = np.clip(
        (
            df[
                "administrative_bottleneck_count"
            ] / 7.0
        ),
        0,
        1.5,
    )

    # Composite risk score.
    risk_score = (

        2.8
        * compensation_risk

        + 2.4
        * approval_risk

        + 2.2
        * legal_risk

        + 2.0
        * documentation_risk

        + 1.8
        * rr_risk

        + 1.7
        * possession_risk

        + 1.5
        * ownership_risk

        + 1.2
        * notification_risk

        + 1.0
        * stakeholder_risk

        + 0.9
        * administrative_risk

        + 0.4
        * (
            df[
                "pending_compensation_cases"
            ] / 30.0
        )

        + 0.3
        * (
            df[
                "pending_approvals"
            ] / 5.0
        )

        + rng.normal(
            0,
            0.30,
            n,
        )
    )

    # =========================================================================
    # DELAY PROBABILITY
    # =========================================================================

    # Logistic transformation.
    #
    # Centering around the median produces a useful mix of classes.

    center = np.median(
        risk_score
    )

    probability = (
        1.0
        / (
            1.0
            + np.exp(
                -(
                    risk_score
                    - center
                )
                * 1.35
            )
        )
    )

    probability = np.clip(
        probability,
        0.02,
        0.98,
    )

    # =========================================================================
    # CLASSIFICATION TARGET
    # =========================================================================

    df["delayed"] = (
        rng.binomial(
            1,
            probability,
        )
    )

    # =========================================================================
    # REGRESSION TARGET
    # =========================================================================

    df["actual_delay_days"] = np.clip(

        (
            5.0

            + 100.0
            * probability

            + 0.35
            * df[
                "approval_delay_days"
            ]

            + 1.20
            * df[
                "pending_legal_cases"
            ]

            + 0.45
            * df[
                "pending_compensation_cases"
            ]

            + 0.30
            * df[
                "pending_resettlement_cases"
            ]

            + rng.normal(
                0,
                8,
                n,
            )
        ),

        0,

        None,
    )

    return df


# ============================================================================
# FEATURE INFORMATION
# ============================================================================

def get_feature_groups() -> dict:

    return {

        "base_numeric": list(
            BASE_NUMERIC_FEATURES
        ),

        "engineered": list(
            ENGINEERED_FEATURES
        ),

        "categorical": list(
            CATEGORICAL_FEATURES
        ),

        "all_prediction_features": list(
            PREDICTION_FEATURES
        ),

        "targets": dict(
            TARGET_COLUMNS
        ),

        "leakage_columns": sorted(
            LEAKAGE_COLUMNS
        ),
    }


def get_feature_count() -> int:

    return len(
        PREDICTION_FEATURES
    )


# ============================================================================
# TEST
# ============================================================================

if __name__ == "__main__":

    print(
        "LANDGUARD features.py"
    )

    print(
        "Logical features:",
        len(PREDICTION_FEATURES),
    )

    data = make_synthetic_dataset(
        n=100,
        seed=42,
    )

    print(
        "Synthetic rows:",
        len(data),
    )

    print(
        "Delayed distribution:"
    )

    print(
        data["delayed"].value_counts()
    )

    features = engineer_features(
        data
    )

    print(
        "Engineered shape:",
        features.shape,
    )

    print(
        "features.py is running successfully"
    )
