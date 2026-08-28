"""
LANDGUARD AI - Priority Engine
------------------------------

Converts project risk, delay probability, delay duration, and
project-impact factors into an actionable priority score.

Priority levels:
    CRITICAL
    HIGH
    MEDIUM
    LOW

This module does NOT train a model.

It is a deterministic decision layer that can be used after:
    risk.py
    stage_risk.py
    explainability.py
    recommendations.py
    simulator.py
"""

from __future__ import annotations

from typing import Any, Dict, Iterable, Optional

import numpy as np
import pandas as pd


# ============================================================================
# CONFIGURATION
# ============================================================================

PRIORITY_LEVELS = (
    "CRITICAL",
    "HIGH",
    "MEDIUM",
    "LOW",
)


# Default weights.
#
# The largest weight is assigned to predicted delay probability because
# delay prediction is the primary purpose of LANDGUARD AI.
#
# Risk score captures the overall project condition.
# Delay duration captures the expected practical impact.
# Urgency captures time-sensitive administrative/legal/compensation issues.
# Project importance captures the scale of the project.
#
# The weights sum to 1.0.

DEFAULT_WEIGHTS = {
    "delay_probability": 0.35,
    "risk_score": 0.30,
    "delay_duration": 0.15,
    "urgency": 0.10,
    "project_importance": 0.10,
}


# Thresholds for final priority score.

CRITICAL_THRESHOLD = 75.0
HIGH_THRESHOLD = 55.0
MEDIUM_THRESHOLD = 35.0


# ============================================================================
# COLUMN ALIASES
# ============================================================================

DELAY_PROBABILITY_COLUMNS = (
    "delay_probability",
    "predicted_delay_probability",
    "delay_prob",
    "probability",
)

RISK_SCORE_COLUMNS = (
    "risk_score",
    "overall_risk_score",
    "risk",
)

DELAY_DAYS_COLUMNS = (
    "predicted_delay_days",
    "actual_delay_days",
    "expected_delay_days",
    "delay_days",
)

URGENCY_COLUMNS = (
    "urgency",
    "urgency_score",
)

IMPORTANCE_COLUMNS = (
    "project_importance",
    "importance_score",
)

PROJECT_ID_COLUMNS = (
    "project_id",
    "id",
)

PROJECT_NAME_COLUMNS = (
    "project_name",
    "name",
)


# ============================================================================
# BASIC HELPERS
# ============================================================================


def _to_float(
    value: Any,
    default: float = 0.0,
) -> float:
    """
    Convert a value to float safely.
    """

    try:
        result = float(value)

        if not np.isfinite(result):
            return default

        return result

    except (
        TypeError,
        ValueError,
    ):
        return default


def _find_column(
    data: pd.DataFrame,
    candidates: Iterable[str],
) -> Optional[str]:
    """
    Find the first available column from a list of candidates.
    """

    for column in candidates:

        if column in data.columns:
            return column

    return None


def _clip(
    value: float,
    lower: float,
    upper: float,
) -> float:
    """
    Clip a numeric value.
    """

    return float(
        np.clip(
            value,
            lower,
            upper,
        )
    )


# ============================================================================
# NORMALIZATION
# ============================================================================


def normalize_probability(
    value: Any,
) -> float:
    """
    Normalize probability to [0, 1].

    Accepts:
        0.0 - 1.0
        0 - 100

    Examples:
        0.82 -> 0.82
        82 -> 0.82
    """

    value = _to_float(value)

    if value > 1.0:
        value = value / 100.0

    return _clip(
        value,
        0.0,
        1.0,
    )


def normalize_percentage(
    value: Any,
) -> float:
    """
    Normalize a percentage-like value to [0, 1].

    Examples:
        80 -> 0.80
        0.80 -> 0.80
    """

    value = _to_float(value)

    if value > 1.0:
        value = value / 100.0

    return _clip(
        value,
        0.0,
        1.0,
    )


def normalize_risk_score(
    value: Any,
) -> float:
    """
    Normalize risk score to [0, 1].

    Supports either:
        0 - 1
    or:
        0 - 100
    """

    value = _to_float(value)

    if value > 1.0:
        value = value / 100.0

    return _clip(
        value,
        0.0,
        1.0,
    )


# ============================================================================
# DELAY DURATION SCORE
# ============================================================================


def delay_duration_score(
    delay_days: Any,
    *,
    scale: float = 120.0,
) -> float:
    """
    Convert predicted delay duration into a normalized score.

    0 days:
        0.0

    120+ days:
        1.0

    A smooth saturation function is used so that very large delays
    do not completely dominate the priority calculation.
    """

    days = max(
        _to_float(delay_days),
        0.0,
    )

    scale = max(
        _to_float(scale, 120.0),
        1e-9,
    )

    score = (
        1.0
        - np.exp(
            -days / scale
        )
    )

    return _clip(
        score,
        0.0,
        1.0,
    )


# ============================================================================
# PRIORITY SCORE
# ============================================================================


def calculate_priority_score(
    delay_probability: Any = 0.0,
    risk_score: Any = 0.0,
    delay_days: Any = 0.0,
    urgency: Any = 0.0,
    project_importance: Any = 0.0,
    *,
    weights: Optional[Dict[str, float]] = None,
) -> float:
    """
    Calculate final LANDGUARD priority score.

    Returns:
        0 - 100

    Formula:

        priority =
            delay probability
            + overall risk
            + delay duration
            + urgency
            + project importance

    weighted into a final score from 0 to 100.
    """

    active_weights = dict(
        DEFAULT_WEIGHTS
    )

    if weights is not None:

        active_weights.update(
            weights
        )

    total_weight = sum(
        max(
            _to_float(weight),
            0.0,
        )
        for weight in active_weights.values()
    )

    if total_weight <= 0:

        raise ValueError(
            "Priority weights must contain "
            "at least one positive value."
        )

    delay_probability_score = (
        normalize_probability(
            delay_probability
        )
    )

    risk_score_normalized = (
        normalize_risk_score(
            risk_score
        )
    )

    duration_score = (
        delay_duration_score(
            delay_days
        )
    )

    urgency_score = (
        normalize_percentage(
            urgency
        )
    )

    importance_score = (
        normalize_percentage(
            project_importance
        )
    )

    weighted_score = (

        active_weights[
            "delay_probability"
        ]
        * delay_probability_score

        + active_weights[
            "risk_score"
        ]
        * risk_score_normalized

        + active_weights[
            "delay_duration"
        ]
        * duration_score

        + active_weights[
            "urgency"
        ]
        * urgency_score

        + active_weights[
            "project_importance"
        ]
        * importance_score
    )

    weighted_score = (
        weighted_score
        / total_weight
    )

    return round(
        _clip(
            weighted_score * 100.0,
            0.0,
            100.0,
        ),
        2,
    )


# ============================================================================
# PRIORITY LEVEL
# ============================================================================


def get_priority_level(
    priority_score: Any,
) -> str:
    """
    Convert numeric priority score into a priority level.
    """

    score = _to_float(
        priority_score
    )

    if score >= CRITICAL_THRESHOLD:
        return "CRITICAL"

    if score >= HIGH_THRESHOLD:
        return "HIGH"

    if score >= MEDIUM_THRESHOLD:
        return "MEDIUM"

    return "LOW"


# ============================================================================
# PRIORITY DESCRIPTION
# ============================================================================


def get_priority_description(
    priority_level: str,
) -> str:
    """
    Return a human-readable explanation of the priority level.
    """

    level = str(
        priority_level
    ).upper().strip()

    descriptions = {

        "CRITICAL":
            "Immediate intervention required. "
            "Project has a very high likelihood or impact "
            "of delay.",

        "HIGH":
            "Urgent attention required. "
            "Project has significant delay risk and should "
            "be actively monitored.",

        "MEDIUM":
            "Moderate attention required. "
            "Project should be monitored and preventive "
            "actions should be considered.",

        "LOW":
            "Low immediate concern. "
            "Continue routine monitoring.",
    }

    return descriptions.get(
        level,
        "Priority level is undefined.",
    )


# ============================================================================
# RECOMMENDED ACTION
# ============================================================================


def get_priority_action(
    priority_level: str,
) -> str:
    """
    Return the recommended management action.
    """

    level = str(
        priority_level
    ).upper().strip()

    actions = {

        "CRITICAL":
            "Escalate immediately and assign corrective actions.",

        "HIGH":
            "Review major delay drivers and initiate mitigation.",

        "MEDIUM":
            "Monitor closely and address emerging risk factors.",

        "LOW":
            "Continue routine monitoring.",
    }

    return actions.get(
        level,
        "Review project status.",
    )


# ============================================================================
# SINGLE PROJECT PRIORITY
# ============================================================================


def evaluate_priority(
    *,
    delay_probability: Any = 0.0,
    risk_score: Any = 0.0,
    delay_days: Any = 0.0,
    urgency: Any = 0.0,
    project_importance: Any = 0.0,
    project_id: Optional[Any] = None,
    project_name: Optional[Any] = None,
    weights: Optional[Dict[str, float]] = None,
) -> Dict[str, Any]:
    """
    Evaluate priority for one project.

    Returns a dictionary suitable for:
        API responses
        Streamlit dashboards
        JSON serialization
        reports
    """

    priority_score = calculate_priority_score(

        delay_probability=delay_probability,

        risk_score=risk_score,

        delay_days=delay_days,

        urgency=urgency,

        project_importance=project_importance,

        weights=weights,
    )

    priority_level = (
        get_priority_level(
            priority_score
        )
    )

    result = {

        "priority_score":
            priority_score,

        "priority_level":
            priority_level,

        "description":
            get_priority_description(
                priority_level
            ),

        "recommended_action":
            get_priority_action(
                priority_level
            ),

        "delay_probability":
            round(
                normalize_probability(
                    delay_probability
                ) * 100.0,
                2,
            ),

        "risk_score":
            round(
                normalize_risk_score(
                    risk_score
                ) * 100.0,
                2,
            ),

        "predicted_delay_days":
            round(
                max(
                    _to_float(
                        delay_days
                    ),
                    0.0,
                ),
                2,
            ),

        "urgency":
            round(
                normalize_percentage(
                    urgency
                ) * 100.0,
                2,
            ),

        "project_importance":
            round(
                normalize_percentage(
                    project_importance
                ) * 100.0,
                2,
            ),
    }

    if project_id is not None:

        result[
            "project_id"
        ] = project_id

    if project_name is not None:

        result[
            "project_name"
        ] = project_name

    return result


# ============================================================================
# DATAFRAME COLUMN EXTRACTION
# ============================================================================


def _extract_value(
    row: pd.Series,
    candidates: Iterable[str],
    default: float = 0.0,
) -> float:
    """
    Extract a numeric value from a row using column aliases.
    """

    for column in candidates:

        if column in row.index:

            return _to_float(
                row[column],
                default,
            )

    return default


# ============================================================================
# PRIORITY FOR DATAFRAME
# ============================================================================


def add_priority_columns(
    data: pd.DataFrame,
    *,
    weights: Optional[Dict[str, float]] = None,
) -> pd.DataFrame:
    """
    Add priority columns to a project dataframe.

    Expected possible input columns:

        delay_probability
        risk_score
        predicted_delay_days
        urgency
        project_importance

    The function also supports common aliases.

    Added columns:

        priority_score
        priority_level
        priority_description
        priority_action
    """

    if not isinstance(
        data,
        pd.DataFrame,
    ):

        raise TypeError(
            "data must be a pandas.DataFrame."
        )

    result = data.copy()

    priority_scores = []
    priority_levels = []
    descriptions = []
    actions = []

    for _, row in result.iterrows():

        delay_probability = (
            _extract_value(
                row,
                DELAY_PROBABILITY_COLUMNS,
            )
        )

        risk_score = (
            _extract_value(
                row,
                RISK_SCORE_COLUMNS,
            )
        )

        delay_days = (
            _extract_value(
                row,
                DELAY_DAYS_COLUMNS,
            )
        )

        urgency = (
            _extract_value(
                row,
                URGENCY_COLUMNS,
            )
        )

        project_importance = (
            _extract_value(
                row,
                IMPORTANCE_COLUMNS,
            )
        )

        score = calculate_priority_score(

            delay_probability=delay_probability,

            risk_score=risk_score,

            delay_days=delay_days,

            urgency=urgency,

            project_importance=project_importance,

            weights=weights,
        )

        level = (
            get_priority_level(
                score
            )
        )

        priority_scores.append(
            score
        )

        priority_levels.append(
            level
        )

        descriptions.append(
            get_priority_description(
                level
            )
        )

        actions.append(
            get_priority_action(
                level
            )
        )

    result[
        "priority_score"
    ] = priority_scores

    result[
        "priority_level"
    ] = priority_levels

    result[
        "priority_description"
    ] = descriptions

    result[
        "priority_action"
    ] = actions

    return result


# ============================================================================
# PRIORITY RANKING
# ============================================================================


def rank_projects(
    data: pd.DataFrame,
    *,
    weights: Optional[Dict[str, float]] = None,
    ascending: bool = False,
) -> pd.DataFrame:
    """
    Calculate priority and rank projects.

    Highest priority receives rank 1 by default.
    """

    result = add_priority_columns(
        data,
        weights=weights,
    )

    result = result.sort_values(
        "priority_score",
        ascending=ascending,
        kind="stable",
    ).reset_index(
        drop=True
    )

    result[
        "priority_rank"
    ] = np.arange(
        1,
        len(result) + 1,
    )

    return result


# ============================================================================
# CRITICAL PROJECT FILTER
# ============================================================================


def get_critical_projects(
    data: pd.DataFrame,
    *,
    weights: Optional[Dict[str, float]] = None,
) -> pd.DataFrame:
    """
    Return only CRITICAL projects.
    """

    result = add_priority_columns(
        data,
        weights=weights,
    )

    return result[
        result[
            "priority_level"
        ] == "CRITICAL"
    ].copy()


def get_high_priority_projects(
    data: pd.DataFrame,
    *,
    weights: Optional[Dict[str, float]] = None,
) -> pd.DataFrame:
    """
    Return CRITICAL and HIGH priority projects.
    """

    result = add_priority_columns(
        data,
        weights=weights,
    )

    return result[
        result[
            "priority_level"
        ].isin(
            [
                "CRITICAL",
                "HIGH",
            ]
        )
    ].copy()


# ============================================================================
# PRIORITY SUMMARY
# ============================================================================


def get_priority_summary(
    data: pd.DataFrame,
    *,
    weights: Optional[Dict[str, float]] = None,
) -> Dict[str, Any]:
    """
    Generate a summary of project priorities.
    """

    result = add_priority_columns(
        data,
        weights=weights,
    )

    counts = (
        result[
            "priority_level"
        ]
        .value_counts()
        .to_dict()
    )

    for level in PRIORITY_LEVELS:

        counts.setdefault(
            level,
            0,
        )

    total = len(
        result
    )

    critical = counts[
        "CRITICAL"
    ]

    high = counts[
        "HIGH"
    ]

    summary = {

        "total_projects":
            int(total),

        "critical_projects":
            int(critical),

        "high_projects":
            int(high),

        "medium_projects":
            int(
                counts[
                    "MEDIUM"
                ]
            ),

        "low_projects":
            int(
                counts[
                    "LOW"
                ]
            ),

        "critical_percentage":
            round(
                (
                    critical
                    / total
                    * 100
                )
                if total > 0
                else 0.0,
                2,
            ),

        "high_or_critical_percentage":
            round(
                (
                    (critical + high)
                    / total
                    * 100
                )
                if total > 0
                else 0.0,
                2,
            ),

        "average_priority_score":
            round(
                float(
                    result[
                        "priority_score"
                    ].mean()
                )
                if total > 0
                else 0.0,
                2,
            ),
    }

    return summary


# ============================================================================
# PRIORITY DISTRIBUTION
# ============================================================================


def get_priority_distribution(
    data: pd.DataFrame,
    *,
    weights: Optional[Dict[str, float]] = None,
) -> Dict[str, int]:
    """
    Return priority counts.
    """

    result = add_priority_columns(
        data,
        weights=weights,
    )

    counts = (
        result[
            "priority_level"
        ]
        .value_counts()
        .to_dict()
    )

    return {
        level: int(
            counts.get(
                level,
                0,
            )
        )
        for level in PRIORITY_LEVELS
    }


# ============================================================================
# PRIORITY COLOR / UI LABEL
# ============================================================================


def get_priority_badge(
    priority_level: str,
) -> str:
    """
    Return a simple UI badge label.

    No styling or framework dependency is used.
    """

    level = str(
        priority_level
    ).upper().strip()

    badges = {

        "CRITICAL":
            "🔴 CRITICAL",

        "HIGH":
            "🟠 HIGH",

        "MEDIUM":
            "🟡 MEDIUM",

        "LOW":
            "🟢 LOW",
    }

    return badges.get(
        level,
        "⚪ UNKNOWN",
    )


# ============================================================================
# EXPLAIN PRIORITY
# ============================================================================


def explain_priority(
    *,
    delay_probability: Any = 0.0,
    risk_score: Any = 0.0,
    delay_days: Any = 0.0,
    urgency: Any = 0.0,
    project_importance: Any = 0.0,
) -> Dict[str, Any]:
    """
    Explain which components contributed to priority.

    Useful for dashboards and explainability output.
    """

    components = {

        "delay_probability":
            normalize_probability(
                delay_probability
            ),

        "risk_score":
            normalize_risk_score(
                risk_score
            ),

        "delay_duration":
            delay_duration_score(
                delay_days
            ),

        "urgency":
            normalize_percentage(
                urgency
            ),

        "project_importance":
            normalize_percentage(
                project_importance
            ),
    }

    weighted = {

        name:
            round(
                value
                * DEFAULT_WEIGHTS[
                    name
                ]
                * 100.0,
                2,
            )

        for name, value
        in components.items()
    }

    dominant_factor = max(
        weighted,
        key=weighted.get,
    )

    return {

        "normalized_components": {
            key: round(
                value,
                4,
            )
            for key, value
            in components.items()
        },

        "weighted_contributions":
            weighted,

        "dominant_factor":
            dominant_factor,

        "dominant_factor_contribution":
            weighted[
                dominant_factor
            ],
    }


# ============================================================================
# BATCH PRIORITY EVALUATION
# ============================================================================


def evaluate_projects(
    data: pd.DataFrame,
    *,
    weights: Optional[Dict[str, float]] = None,
) -> Dict[str, Any]:
    """
    Evaluate an entire project dataframe.

    Returns:

        {
            "projects": [...],
            "summary": {...},
            "distribution": {...}
        }
    """

    if not isinstance(
        data,
        pd.DataFrame,
    ):

        raise TypeError(
            "data must be a pandas.DataFrame."
        )

    result = add_priority_columns(
        data,
        weights=weights,
    )

    project_results = []

    id_column = _find_column(
        result,
        PROJECT_ID_COLUMNS,
    )

    name_column = _find_column(
        result,
        PROJECT_NAME_COLUMNS,
    )

    for _, row in result.iterrows():

        item = {

            "priority_score":
                float(
                    row[
                        "priority_score"
                    ]
                ),

            "priority_level":
                row[
                    "priority_level"
                ],

            "description":
                row[
                    "priority_description"
                ],

            "recommended_action":
                row[
                    "priority_action"
                ],
        }

        if id_column is not None:

            item[
                "project_id"
            ] = row[
                id_column
            ]

        if name_column is not None:

            item[
                "project_name"
            ] = row[
                name_column
            ]

        project_results.append(
            item
        )

    return {

        "projects":
            project_results,

        "summary":
            get_priority_summary(
                data,
                weights=weights,
            ),

        "distribution":
            get_priority_distribution(
                data,
                weights=weights,
            ),
    }


# ============================================================================
# VALIDATION
# ============================================================================


def validate_priority_result(
    result: Dict[str, Any],
) -> bool:
    """
    Validate a priority result dictionary.
    """

    if not isinstance(
        result,
        dict,
    ):

        raise TypeError(
            "Priority result must be a dictionary."
        )

    required = (
        "priority_score",
        "priority_level",
    )

    missing = [
        key
        for key in required
        if key not in result
    ]

    if missing:

        raise ValueError(
            "Priority result is missing: "
            + ", ".join(
                missing
            )
        )

    score = _to_float(
        result[
            "priority_score"
        ],
        -1,
    )

    if not 0.0 <= score <= 100.0:

        raise ValueError(
            "priority_score must be between 0 and 100."
        )

    level = str(
        result[
            "priority_level"
        ]
    ).upper()

    if level not in PRIORITY_LEVELS:

        raise ValueError(
            f"Invalid priority level: {level}"
        )

    return True


# ============================================================================
# TEST / DEMO
# ============================================================================


if __name__ == "__main__":

    print("=" * 70)
    print("LANDGUARD AI - Priority Engine")
    print("=" * 70)

    examples = [

        {
            "project_id": "P00001",
            "project_name": "Highway Project",
            "delay_probability": 0.92,
            "risk_score": 0.88,
            "predicted_delay_days": 140,
            "urgency": 0.90,
            "project_importance": 0.95,
        },

        {
            "project_id": "P00002",
            "project_name": "Railway Project",
            "delay_probability": 0.68,
            "risk_score": 0.62,
            "predicted_delay_days": 70,
            "urgency": 0.60,
            "project_importance": 0.75,
        },

        {
            "project_id": "P00003",
            "project_name": "Metro Project",
            "delay_probability": 0.35,
            "risk_score": 0.30,
            "predicted_delay_days": 25,
            "urgency": 0.30,
            "project_importance": 0.55,
        },

        {
            "project_id": "P00004",
            "project_name": "Irrigation Project",
            "delay_probability": 0.12,
            "risk_score": 0.15,
            "predicted_delay_days": 8,
            "urgency": 0.10,
            "project_importance": 0.30,
        },
    ]

    data = pd.DataFrame(
        examples
    )

    result = rank_projects(
        data
    )

    print()
    print(
        result[
            [
                "project_id",
                "project_name",
                "priority_score",
                "priority_level",
                "priority_rank",
            ]
        ].to_string(
            index=False
        )
    )

    print()
    print(
        "Priority summary:"
    )

    print(
        get_priority_summary(
            data
        )
    )

    print()
    print(
        "Priority distribution:"
    )

    print(
        get_priority_distribution(
            data
        )
    )

    print()
    print(
        "Priority explanation:"
    )

    explanation = explain_priority(

        delay_probability=0.85,

        risk_score=0.80,

        delay_days=110,

        urgency=0.90,

        project_importance=0.85,
    )

    print(
        explanation
    )

    print()
    print(
        "priority.py is running successfully."
    )
