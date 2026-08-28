"""
LANDGUARD AI - Risk Scoring
---------------------------

Calculates an interpretable project risk score for LANDGUARD AI.

Risk score:
    0.0 - 1.0

Risk levels:
    LOW
    MODERATE
    HIGH
    CRITICAL

IMPORTANT
---------
This module does NOT use prediction targets:

    delayed
    actual_delay_days

Risk is calculated only from observable project conditions.

Main inputs:
    compensation
    legal disputes
    approvals
    documentation
    rehabilitation & resettlement
    possession
    ownership conflicts
    stakeholder response
    administrative bottlenecks
    notification delays
"""

from __future__ import annotations

from typing import Any

import numpy as np
import pandas as pd

from features import engineer_features


# ============================================================================
# RISK LEVEL THRESHOLDS
# ============================================================================

LOW_THRESHOLD = 0.25
MODERATE_THRESHOLD = 0.50
HIGH_THRESHOLD = 0.75


# ============================================================================
# RISK WEIGHTS
# ============================================================================

RISK_WEIGHTS = {
    "compensation": 0.18,
    "approval": 0.16,
    "legal": 0.15,
    "documentation": 0.10,
    "rr": 0.10,
    "possession": 0.08,
    "ownership": 0.08,
    "notification": 0.05,
    "stakeholder": 0.05,
    "administrative": 0.05,
}


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def _clip_score(
    value: float,
) -> float:
    """
    Keep a score between 0 and 1.
    """

    return float(
        np.clip(
            value,
            0.0,
            1.0,
        )
    )


def _saturation_score(
    value: float,
    scale: float,
) -> float:
    """
    Convert an increasing risk variable into a 0-1 score.

    Higher value = higher risk.
    """

    value = max(
        float(value),
        0.0,
    )

    scale = max(
        float(scale),
        1e-9,
    )

    score = (
        1.0
        - np.exp(
            -value / scale
        )
    )

    return _clip_score(
        score
    )


def _percentage_risk(
    completion_pct: float,
) -> float:
    """
    Convert a completion percentage into risk.

    Example:

        100% completion -> 0 risk
        0% completion   -> 1 risk
    """

    completion_pct = float(
        np.clip(
            completion_pct,
            0.0,
            100.0,
        )
    )

    return _clip_score(
        1.0
        - completion_pct / 100.0
    )


# ============================================================================
# INDIVIDUAL RISK COMPONENTS
# ============================================================================

def calculate_compensation_risk(
    row: pd.Series,
) -> float:
    """
    Calculate compensation-related risk.
    """

    completion = row.get(
        "compensation_completed_pct",
        0.0,
    )

    pending_cases = row.get(
        "pending_compensation_cases",
        0.0,
    )

    completion_risk = (
        _percentage_risk(
            completion
        )
    )

    pending_case_risk = (
        _saturation_score(
            pending_cases,
            scale=30.0,
        )
    )

    return _clip_score(
        0.70 * completion_risk
        + 0.30 * pending_case_risk
    )


def calculate_approval_risk(
    row: pd.Series,
) -> float:
    """
    Calculate approval-related risk.
    """

    delay_days = row.get(
        "approval_delay_days",
        0.0,
    )

    pending_approvals = row.get(
        "pending_approvals",
        0.0,
    )

    delay_risk = _saturation_score(
        delay_days,
        scale=35.0,
    )

    pending_risk = _saturation_score(
        pending_approvals,
        scale=5.0,
    )

    return _clip_score(
        0.70 * delay_risk
        + 0.30 * pending_risk
    )


def calculate_legal_risk(
    row: pd.Series,
) -> float:
    """
    Calculate legal dispute risk.
    """

    legal_disputes = row.get(
        "legal_disputes",
        0.0,
    )

    pending_cases = row.get(
        "pending_legal_cases",
        0.0,
    )

    resolution_time = row.get(
        "average_legal_resolution_time",
        0.0,
    )

    dispute_risk = _saturation_score(
        legal_disputes,
        scale=7.0,
    )

    pending_risk = _saturation_score(
        pending_cases,
        scale=8.0,
    )

    resolution_risk = _saturation_score(
        resolution_time,
        scale=100.0,
    )

    return _clip_score(
        0.40 * dispute_risk
        + 0.40 * pending_risk
        + 0.20 * resolution_risk
    )


def calculate_documentation_risk(
    row: pd.Series,
) -> float:
    """
    Calculate documentation risk.
    """

    completion = row.get(
        "documentation_completion_pct",
        0.0,
    )

    return _percentage_risk(
        completion
    )


def calculate_rr_risk(
    row: pd.Series,
) -> float:
    """
    Calculate rehabilitation and resettlement risk.
    """

    completion = row.get(
        "rr_completion_pct",
        0.0,
    )

    waiting_families = row.get(
        "rr_waiting_families",
        0.0,
    )

    pending_cases = row.get(
        "pending_resettlement_cases",
        0.0,
    )

    completion_risk = _percentage_risk(
        completion
    )

    family_risk = _saturation_score(
        waiting_families,
        scale=55.0,
    )

    case_risk = _saturation_score(
        pending_cases,
        scale=18.0,
    )

    return _clip_score(
        0.50 * completion_risk
        + 0.30 * family_risk
        + 0.20 * case_risk
    )


def calculate_possession_risk(
    row: pd.Series,
) -> float:
    """
    Calculate land possession risk.
    """

    possession = row.get(
        "possession_pct",
        0.0,
    )

    return _percentage_risk(
        possession
    )


def calculate_ownership_risk(
    row: pd.Series,
) -> float:
    """
    Calculate ownership conflict risk.
    """

    conflicts = row.get(
        "ownership_conflict_count",
        0.0,
    )

    return _saturation_score(
        conflicts,
        scale=4.0,
    )


def calculate_notification_risk(
    row: pd.Series,
) -> float:
    """
    Calculate notification delay risk.
    """

    pending_days = row.get(
        "notification_pending_days",
        0.0,
    )

    return _saturation_score(
        pending_days,
        scale=35.0,
    )


def calculate_stakeholder_risk(
    row: pd.Series,
) -> float:
    """
    Calculate stakeholder response risk.
    """

    response_time = row.get(
        "avg_stakeholder_response_time",
        0.0,
    )

    pending_requests = row.get(
        "pending_requests",
        0.0,
    )

    response_risk = _saturation_score(
        response_time,
        scale=25.0,
    )

    request_risk = _saturation_score(
        pending_requests,
        scale=12.0,
    )

    return _clip_score(
        0.70 * response_risk
        + 0.30 * request_risk
    )


def calculate_administrative_risk(
    row: pd.Series,
) -> float:
    """
    Calculate administrative bottleneck risk.
    """

    bottlenecks = row.get(
        "administrative_bottleneck_count",
        0.0,
    )

    coordination = row.get(
        "department_coordination_score",
        100.0,
    )

    bottleneck_risk = _saturation_score(
        bottlenecks,
        scale=4.0,
    )

    coordination_risk = _percentage_risk(
        coordination
    )

    return _clip_score(
        0.70 * bottleneck_risk
        + 0.30 * coordination_risk
    )


# ============================================================================
# RAW RISK COMPONENTS
# ============================================================================

def calculate_risk_components(
    data: pd.DataFrame,
) -> pd.DataFrame:
    """
    Calculate individual risk components.

    Parameters
    ----------
    data:
        Raw LANDGUARD project dataframe.

    Returns
    -------
    pandas.DataFrame
        Risk component scores between 0 and 1.
    """

    if not isinstance(
        data,
        pd.DataFrame,
    ):
        raise TypeError(
            "data must be a pandas.DataFrame."
        )

    if len(data) == 0:
        return pd.DataFrame(
            index=data.index
        )

    features = engineer_features(
        data
    )

    components = []

    for index, row in features.iterrows():

        components.append(
            {
                "compensation_risk":
                    calculate_compensation_risk(
                        row
                    ),

                "approval_risk":
                    calculate_approval_risk(
                        row
                    ),

                "legal_risk":
                    calculate_legal_risk(
                        row
                    ),

                "documentation_risk":
                    calculate_documentation_risk(
                        row
                    ),

                "rr_risk":
                    calculate_rr_risk(
                        row
                    ),

                "possession_risk":
                    calculate_possession_risk(
                        row
                    ),

                "ownership_risk":
                    calculate_ownership_risk(
                        row
                    ),

                "notification_risk":
                    calculate_notification_risk(
                        row
                    ),

                "stakeholder_risk":
                    calculate_stakeholder_risk(
                        row
                    ),

                "administrative_risk":
                    calculate_administrative_risk(
                        row
                    ),
            }
        )

    result = pd.DataFrame(
        components,
        index=data.index,
    )

    return result


# ============================================================================
# OVERALL RISK SCORE
# ============================================================================

def calculate_risk_score(
    data: pd.DataFrame,
) -> pd.Series:
    """
    Calculate overall LANDGUARD risk score.

    Returns
    -------
    pandas.Series
        Risk score from 0 to 1.
    """

    components = calculate_risk_components(
        data
    )

    if len(components) == 0:

        return pd.Series(
            dtype=float,
            index=data.index,
        )

    score = np.zeros(
        len(components),
        dtype=float,
    )

    for component, weight in RISK_WEIGHTS.items():

        column = (
            f"{component}_risk"
        )

        score += (
            weight
            * components[column].to_numpy()
        )

    score = np.clip(
        score,
        0.0,
        1.0,
    )

    return pd.Series(
        score,
        index=data.index,
        name="risk_score",
    )


# ============================================================================
# RISK PERCENTAGE
# ============================================================================

def calculate_risk_percentage(
    risk_score: float,
) -> float:
    """
    Convert a 0-1 risk score to percentage.
    """

    return float(
        np.clip(
            risk_score,
            0.0,
            1.0,
        )
        * 100.0
    )


# ============================================================================
# RISK LEVEL
# ============================================================================

def get_risk_level(
    risk_score: float,
) -> str:
    """
    Convert risk score into a human-readable level.

    Thresholds:

        0.00 - 0.2499 -> LOW
        0.25 - 0.4999 -> MODERATE
        0.50 - 0.7499 -> HIGH
        0.75 - 1.00   -> CRITICAL
    """

    score = _clip_score(
        risk_score
    )

    if score < LOW_THRESHOLD:

        return "LOW"

    if score < MODERATE_THRESHOLD:

        return "MODERATE"

    if score < HIGH_THRESHOLD:

        return "HIGH"

    return "CRITICAL"


# ============================================================================
# RISK LEVEL FOR SERIES
# ============================================================================

def get_risk_levels(
    risk_scores: pd.Series,
) -> pd.Series:
    """
    Convert a series of risk scores into risk levels.
    """

    return risk_scores.apply(
        get_risk_level
    )


# ============================================================================
# TOP RISK FACTORS
# ============================================================================

def get_top_risk_factors(
    component_scores: pd.Series,
    top_n: int = 3,
) -> list[dict]:
    """
    Return the strongest risk contributors.

    Parameters
    ----------
    component_scores:
        One row from calculate_risk_components().

    top_n:
        Number of factors to return.
    """

    if not isinstance(
        component_scores,
        pd.Series,
    ):
        raise TypeError(
            "component_scores must be a pandas Series."
        )

    records = []

    for name, score in component_scores.items():

        clean_name = (
            str(name)
            .replace(
                "_risk",
                "",
            )
            .replace(
                "_",
                " ",
            )
            .title()
        )

        records.append(
            {
                "factor": clean_name,
                "score": round(
                    float(score),
                    4,
                ),
                "percentage": round(
                    float(score) * 100,
                    2,
                ),
            }
        )

    records.sort(
        key=lambda item: item["score"],
        reverse=True,
    )

    return records[:max(top_n, 0)]


# ============================================================================
# RECOMMENDATIONS
# ============================================================================

def generate_risk_recommendations(
    component_scores: pd.Series,
) -> list[str]:
    """
    Generate simple actionable recommendations based on
    the highest risk components.
    """

    recommendations = []

    checks = [
        (
            "compensation_risk",
            0.60,
            "Prioritize pending compensation cases and "
            "complete outstanding compensation processing.",
        ),

        (
            "approval_risk",
            0.60,
            "Escalate delayed approvals and review "
            "pending approval bottlenecks.",
        ),

        (
            "legal_risk",
            0.60,
            "Review pending legal disputes and prioritize "
            "cases with long resolution times.",
        ),

        (
            "documentation_risk",
            0.60,
            "Accelerate documentation completion and "
            "resolve missing project records.",
        ),

        (
            "rr_risk",
            0.60,
            "Prioritize rehabilitation and resettlement "
            "cases and reduce the waiting backlog.",
        ),

        (
            "possession_risk",
            0.60,
            "Accelerate land possession activities "
            "where legally and operationally feasible.",
        ),

        (
            "ownership_risk",
            0.60,
            "Resolve ownership conflicts and verify "
            "disputed land records.",
        ),

        (
            "notification_risk",
            0.60,
            "Address projects with prolonged notification "
            "pending periods.",
        ),

        (
            "stakeholder_risk",
            0.60,
            "Reduce stakeholder response times and "
            "clear pending requests.",
        ),

        (
            "administrative_risk",
            0.60,
            "Review administrative bottlenecks and "
            "improve inter-department coordination.",
        ),
    ]

    for column, threshold, message in checks:

        if (
            column in component_scores
            and float(
                component_scores[column]
            ) >= threshold
        ):

            recommendations.append(
                message
            )

    return recommendations


# ============================================================================
# COMPLETE RISK ANALYSIS
# ============================================================================

def analyze_risk(
    data: pd.DataFrame,
) -> pd.DataFrame:
    """
    Generate complete risk analysis for multiple projects.

    Output columns:

        risk_score
        risk_percentage
        risk_level
        top_risk_factor
        top_risk_score
    """

    if not isinstance(
        data,
        pd.DataFrame,
    ):
        raise TypeError(
            "data must be a pandas.DataFrame."
        )

    components = calculate_risk_components(
        data
    )

    scores = calculate_risk_score(
        data
    )

    result = components.copy()

    result["risk_score"] = scores

    result["risk_percentage"] = (
        scores * 100.0
    )

    result["risk_level"] = (
        scores.apply(
            get_risk_level
        )
    )

    top_factors = []

    for _, row in components.iterrows():

        factors = get_top_risk_factors(
            row,
            top_n=1,
        )

        if factors:

            top_factors.append(
                factors[0]["factor"]
            )

        else:

            top_factors.append(
                "None"
            )

    result["top_risk_factor"] = (
        top_factors
    )

    return result


# ============================================================================
# SINGLE PROJECT ANALYSIS
# ============================================================================

def analyze_single_project(
    data: pd.DataFrame,
) -> dict[str, Any]:
    """
    Analyze one LANDGUARD project.

    Returns a dictionary suitable for APIs.

    Example output:

        {
            "risk_score": 0.73,
            "risk_percentage": 73.0,
            "risk_level": "HIGH",
            "risk_factors": [...],
            "recommendations": [...]
        }
    """

    if not isinstance(
        data,
        pd.DataFrame,
    ):
        raise TypeError(
            "data must be a pandas DataFrame."
        )

    if len(data) != 1:

        raise ValueError(
            "analyze_single_project() expects "
            "exactly one project row."
        )

    components = calculate_risk_components(
        data
    )

    score = float(
        calculate_risk_score(
            data
        ).iloc[0]
    )

    component_row = components.iloc[0]

    risk_factors = (
        get_top_risk_factors(
            component_row,
            top_n=5,
        )
    )

    recommendations = (
        generate_risk_recommendations(
            component_row
        )
    )

    return {
        "risk_score": round(
            score,
            4,
        ),

        "risk_percentage": round(
            calculate_risk_percentage(
                score
            ),
            2,
        ),

        "risk_level": get_risk_level(
            score
        ),

        "risk_factors": risk_factors,

        "recommendations": recommendations,
    }


# ============================================================================
# RISK SUMMARY
# ============================================================================

def get_risk_summary(
    data: pd.DataFrame,
) -> dict[str, Any]:
    """
    Return summary statistics for a collection of projects.
    """

    analysis = analyze_risk(
        data
    )

    if len(analysis) == 0:

        return {
            "total_projects": 0,
            "average_risk_score": 0.0,
            "average_risk_percentage": 0.0,
            "risk_distribution": {},
        }

    distribution = (
        analysis[
            "risk_level"
        ]
        .value_counts()
        .to_dict()
    )

    return {
        "total_projects": int(
            len(analysis)
        ),

        "average_risk_score": round(
            float(
                analysis[
                    "risk_score"
                ].mean()
            ),
            4,
        ),

        "average_risk_percentage": round(
            float(
                analysis[
                    "risk_percentage"
                ].mean()
            ),
            2,
        ),

        "risk_distribution": {
            str(key): int(value)
            for key, value
            in distribution.items()
        },
    }


# ============================================================================
# TEST
# ============================================================================

if __name__ == "__main__":

    from features import (
        make_synthetic_dataset,
    )

    print()
    print("=" * 70)
    print("LANDGUARD AI - RISK ENGINE TEST")
    print("=" * 70)

    data = make_synthetic_dataset(
        n=100,
        seed=42,
    )

    print()
    print(
        f"Projects tested: {len(data)}"
    )

    analysis = analyze_risk(
        data
    )

    print()
    print("RISK RESULTS")
    print("-" * 70)

    display_columns = [
        "risk_score",
        "risk_percentage",
        "risk_level",
        "top_risk_factor",
    ]

    print(
        analysis[
            display_columns
        ].to_string(
            index=False
        )
    )

    print()
    print("RISK SUMMARY")
    print("-" * 70)

    summary = get_risk_summary(
        data
    )

    for key, value in summary.items():

        print(
            f"{key}: {value}"
        )

    print()
    print("SINGLE PROJECT ANALYSIS")
    print("-" * 70)

    single = analyze_single_project(
        data.iloc[
            [0]
        ]
    )

    print(
        single
    )

    print()
    print(
        "risk.py is running successfully."
    )
