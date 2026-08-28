"""
LANDGUARD AI - Stage-wise Risk Analysis
----------------------------------------

Provides stage-level risk analysis for LANDGUARD AI projects.

Stages:
    1. Notification
    2. Ownership
    3. Documentation
    4. Compensation
    5. Legal
    6. Approval
    7. Rehabilitation & Resettlement
    8. Possession
    9. Stakeholder
    10. Administration

Each stage receives:
    - risk score       : 0.0 - 1.0
    - risk percentage  : 0 - 100
    - risk level       : LOW / MODERATE / HIGH / CRITICAL

The module also provides:
    - overall stage risk
    - highest-risk stage
    - risk factors
    - recommendations
    - project-level stage summary

IMPORTANT
---------
This module intentionally does NOT use:

    delayed
    actual_delay_days

Those are prediction targets and would cause target leakage.
"""

from __future__ import annotations

from typing import Any

import numpy as np
import pandas as pd

from features import engineer_features


# ============================================================================
# RISK THRESHOLDS
# ============================================================================

LOW_THRESHOLD = 0.25
MODERATE_THRESHOLD = 0.50
HIGH_THRESHOLD = 0.75


# ============================================================================
# STAGE DEFINITIONS
# ============================================================================

STAGES = [
    "Notification",
    "Ownership",
    "Documentation",
    "Compensation",
    "Legal",
    "Approval",
    "R&R",
    "Possession",
    "Stakeholder",
    "Administration",
]


# ============================================================================
# STAGE WEIGHTS
# ============================================================================

STAGE_WEIGHTS = {
    "Notification": 0.05,
    "Ownership": 0.08,
    "Documentation": 0.10,
    "Compensation": 0.18,
    "Legal": 0.15,
    "Approval": 0.16,
    "R&R": 0.10,
    "Possession": 0.08,
    "Stakeholder": 0.05,
    "Administration": 0.05,
}


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def _clip_score(
    value: float,
) -> float:
    """
    Restrict a risk score to 0-1.
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
    Convert an increasing risk variable into a 0-1 risk score.

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


def _completion_risk(
    completion_pct: float,
) -> float:
    """
    Convert completion percentage to risk.

    100% = 0 risk
    0%   = 1 risk
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
# STAGE RISK CALCULATORS
# ============================================================================

def calculate_notification_stage_risk(
    row: pd.Series,
) -> float:
    """
    Notification stage risk.
    """

    pending_days = row.get(
        "notification_pending_days",
        0.0,
    )

    return _saturation_score(
        pending_days,
        scale=35.0,
    )


def calculate_ownership_stage_risk(
    row: pd.Series,
) -> float:
    """
    Ownership stage risk.
    """

    conflicts = row.get(
        "ownership_conflict_count",
        0.0,
    )

    landowners = max(
        float(
            row.get(
                "landowners",
                1.0,
            )
        ),
        1.0,
    )

    conflict_risk = _saturation_score(
        conflicts,
        scale=4.0,
    )

    density_risk = _clip_score(
        (
            conflicts
            / landowners
        )
        * 20.0
    )

    return _clip_score(
        0.75 * conflict_risk
        + 0.25 * density_risk
    )


def calculate_documentation_stage_risk(
    row: pd.Series,
) -> float:
    """
    Documentation stage risk.
    """

    completion = row.get(
        "documentation_completion_pct",
        0.0,
    )

    return _completion_risk(
        completion
    )


def calculate_compensation_stage_risk(
    row: pd.Series,
) -> float:
    """
    Compensation stage risk.
    """

    completion = row.get(
        "compensation_completed_pct",
        0.0,
    )

    pending_cases = row.get(
        "pending_compensation_cases",
        0.0,
    )

    pending_amount = row.get(
        "pending_compensation_amount",
        0.0,
    )

    completion_risk = _completion_risk(
        completion
    )

    cases_risk = _saturation_score(
        pending_cases,
        scale=30.0,
    )

    amount_risk = _saturation_score(
        np.log1p(
            max(
                float(pending_amount),
                0.0,
            )
        ),
        scale=14.0,
    )

    return _clip_score(
        0.60 * completion_risk
        + 0.25 * cases_risk
        + 0.15 * amount_risk
    )


def calculate_legal_stage_risk(
    row: pd.Series,
) -> float:
    """
    Legal stage risk.
    """

    disputes = row.get(
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
        disputes,
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
        0.35 * dispute_risk
        + 0.40 * pending_risk
        + 0.25 * resolution_risk
    )


def calculate_approval_stage_risk(
    row: pd.Series,
) -> float:
    """
    Approval stage risk.
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


def calculate_rr_stage_risk(
    row: pd.Series,
) -> float:
    """
    Rehabilitation and Resettlement stage risk.
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

    completion_risk = _completion_risk(
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


def calculate_possession_stage_risk(
    row: pd.Series,
) -> float:
    """
    Possession stage risk.
    """

    possession = row.get(
        "possession_pct",
        0.0,
    )

    return _completion_risk(
        possession
    )


def calculate_stakeholder_stage_risk(
    row: pd.Series,
) -> float:
    """
    Stakeholder stage risk.
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


def calculate_administration_stage_risk(
    row: pd.Series,
) -> float:
    """
    Administration stage risk.
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

    coordination_risk = _completion_risk(
        coordination
    )

    return _clip_score(
        0.70 * bottleneck_risk
        + 0.30 * coordination_risk
    )


# ============================================================================
# STAGE CALCULATOR MAP
# ============================================================================

STAGE_CALCULATORS = {
    "Notification":
        calculate_notification_stage_risk,

    "Ownership":
        calculate_ownership_stage_risk,

    "Documentation":
        calculate_documentation_stage_risk,

    "Compensation":
        calculate_compensation_stage_risk,

    "Legal":
        calculate_legal_stage_risk,

    "Approval":
        calculate_approval_stage_risk,

    "R&R":
        calculate_rr_stage_risk,

    "Possession":
        calculate_possession_stage_risk,

    "Stakeholder":
        calculate_stakeholder_stage_risk,

    "Administration":
        calculate_administration_stage_risk,
}


# ============================================================================
# STAGE RISK LEVEL
# ============================================================================

def get_stage_risk_level(
    score: float,
) -> str:
    """
    Convert stage risk score to risk level.
    """

    score = _clip_score(
        score
    )

    if score < LOW_THRESHOLD:
        return "LOW"

    if score < MODERATE_THRESHOLD:
        return "MODERATE"

    if score < HIGH_THRESHOLD:
        return "HIGH"

    return "CRITICAL"


# ============================================================================
# CALCULATE STAGE SCORES
# ============================================================================

def calculate_stage_scores(
    data: pd.DataFrame,
) -> pd.DataFrame:
    """
    Calculate risk score for every stage.

    Returns
    -------
    pandas.DataFrame
        One row per project.
        One column per stage.
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

    result = pd.DataFrame(
        index=data.index
    )

    for stage in STAGES:

        calculator = (
            STAGE_CALCULATORS[
                stage
            ]
        )

        result[
            f"{stage.lower().replace('&', 'and').replace(' ', '_')}_risk"
        ] = [
            calculator(row)
            for _, row
            in features.iterrows()
        ]

    return result


# ============================================================================
# OVERALL STAGE RISK
# ============================================================================

def calculate_overall_stage_risk(
    stage_scores: pd.DataFrame,
) -> pd.Series:
    """
    Calculate weighted overall risk from stage scores.
    """

    if not isinstance(
        stage_scores,
        pd.DataFrame,
    ):
        raise TypeError(
            "stage_scores must be a pandas DataFrame."
        )

    if len(stage_scores) == 0:

        return pd.Series(
            dtype=float,
            index=stage_scores.index,
            name="stage_risk_score",
        )

    score = np.zeros(
        len(stage_scores),
        dtype=float,
    )

    for stage, weight in STAGE_WEIGHTS.items():

        column = (
            f"{stage.lower().replace('&', 'and').replace(' ', '_')}_risk"
        )

        if column in stage_scores.columns:

            score += (
                weight
                * stage_scores[
                    column
                ].to_numpy()
            )

    score = np.clip(
        score,
        0.0,
        1.0,
    )

    return pd.Series(
        score,
        index=stage_scores.index,
        name="stage_risk_score",
    )


# ============================================================================
# HIGHEST-RISK STAGE
# ============================================================================

def get_highest_risk_stage(
    stage_scores: pd.Series,
) -> dict[str, Any]:
    """
    Return the highest-risk stage for one project.
    """

    if not isinstance(
        stage_scores,
        pd.Series,
    ):
        raise TypeError(
            "stage_scores must be a pandas Series."
        )

    if len(stage_scores) == 0:

        return {
            "stage": "None",
            "score": 0.0,
            "percentage": 0.0,
            "risk_level": "LOW",
        }

    highest_column = (
        stage_scores.idxmax()
    )

    score = float(
        stage_scores[
            highest_column
        ]
    )

    stage_name = (
        str(highest_column)
        .replace(
            "_risk",
            "",
        )
        .replace(
            "_",
            " ",
        )
        .replace(
            "and",
            "&",
        )
        .title()
    )

    return {
        "stage": stage_name,
        "score": round(
            score,
            4,
        ),
        "percentage": round(
            score * 100.0,
            2,
        ),
        "risk_level": get_stage_risk_level(
            score
        ),
    }


# ============================================================================
# TOP RISK STAGES
# ============================================================================

def get_top_risk_stages(
    stage_scores: pd.Series,
    top_n: int = 3,
) -> list[dict]:
    """
    Return the highest-risk stages.
    """

    if not isinstance(
        stage_scores,
        pd.Series,
    ):
        raise TypeError(
            "stage_scores must be a pandas Series."
        )

    records = []

    for column, value in (
        stage_scores
        .sort_values(
            ascending=False
        )
        .head(
            max(
                int(top_n),
                0,
            )
        )
        .items()
    ):

        score = float(
            value
        )

        stage_name = (
            str(column)
            .replace(
                "_risk",
                "",
            )
            .replace(
                "_",
                " ",
            )
            .replace(
                "and",
                "&",
            )
            .title()
        )

        records.append(
            {
                "stage": stage_name,
                "score": round(
                    score,
                    4,
                ),
                "percentage": round(
                    score * 100.0,
                    2,
                ),
                "risk_level":
                    get_stage_risk_level(
                        score
                    ),
            }
        )

    return records


# ============================================================================
# STAGE RECOMMENDATIONS
# ============================================================================

STAGE_RECOMMENDATIONS = {
    "Notification":
        "Complete pending notifications and address prolonged notification delays.",

    "Ownership":
        "Resolve ownership conflicts and verify disputed land records.",

    "Documentation":
        "Accelerate documentation completion and resolve missing records.",

    "Compensation":
        "Prioritize pending compensation cases and reduce the compensation backlog.",

    "Legal":
        "Prioritize pending legal disputes and review cases with long resolution times.",

    "Approval":
        "Escalate delayed approvals and clear pending approval bottlenecks.",

    "R&R":
        "Accelerate rehabilitation and resettlement activities and reduce waiting families.",

    "Possession":
        "Increase land possession progress and address unresolved possession barriers.",

    "Stakeholder":
        "Reduce stakeholder response times and clear pending stakeholder requests.",

    "Administration":
        "Reduce administrative bottlenecks and improve inter-department coordination.",
}


def generate_stage_recommendations(
    stage_scores: pd.Series,
    threshold: float = 0.60,
) -> list[str]:
    """
    Generate recommendations for high-risk stages.
    """

    recommendations = []

    ordered = (
        stage_scores
        .sort_values(
            ascending=False
        )
    )

    for column, score in ordered.items():

        score = float(
            score
        )

        if score < threshold:
            continue

        stage_name = (
            str(column)
            .replace(
                "_risk",
                "",
            )
            .replace(
                "_",
                " ",
            )
            .replace(
                "and",
                "&",
            )
            .title()
        )

        if stage_name in STAGE_RECOMMENDATIONS:

            recommendations.append(
                STAGE_RECOMMENDATIONS[
                    stage_name
                ]
            )

    return recommendations


# ============================================================================
# COMPLETE STAGE ANALYSIS
# ============================================================================

def analyze_stage_risk(
    data: pd.DataFrame,
) -> pd.DataFrame:
    """
    Generate complete stage-wise risk analysis.

    Returns a dataframe containing:

        notification_risk
        ownership_risk
        documentation_risk
        compensation_risk
        legal_risk
        approval_risk
        r&r_risk
        possession_risk
        stakeholder_risk
        administration_risk

        stage_risk_score
        stage_risk_percentage
        stage_risk_level
        highest_risk_stage
    """

    if not isinstance(
        data,
        pd.DataFrame,
    ):
        raise TypeError(
            "data must be a pandas DataFrame."
        )

    stage_scores = (
        calculate_stage_scores(
            data
        )
    )

    overall = (
        calculate_overall_stage_risk(
            stage_scores
        )
    )

    result = stage_scores.copy()

    result[
        "stage_risk_score"
    ] = overall

    result[
        "stage_risk_percentage"
    ] = overall * 100.0

    result[
        "stage_risk_level"
    ] = overall.apply(
        get_stage_risk_level
    )

    highest_stages = []

    for _, row in stage_scores.iterrows():

        highest = (
            get_highest_risk_stage(
                row
            )
        )

        highest_stages.append(
            highest["stage"]
        )

    result[
        "highest_risk_stage"
    ] = highest_stages

    return result


# ============================================================================
# SINGLE PROJECT STAGE ANALYSIS
# ============================================================================

def analyze_single_project_stages(
    data: pd.DataFrame,
) -> dict[str, Any]:
    """
    Perform detailed stage-wise risk analysis for one project.
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
            "analyze_single_project_stages() "
            "expects exactly one project row."
        )

    stage_scores = (
        calculate_stage_scores(
            data
        )
    )

    row = stage_scores.iloc[0]

    overall = float(
        calculate_overall_stage_risk(
            stage_scores
        ).iloc[0]
    )

    stages = []

    for stage in STAGES:

        column = (
            f"{stage.lower().replace('&', 'and').replace(' ', '_')}_risk"
        )

        score = float(
            row[column]
        )

        stages.append(
            {
                "stage": stage,
                "score": round(
                    score,
                    4,
                ),
                "percentage": round(
                    score * 100.0,
                    2,
                ),
                "risk_level":
                    get_stage_risk_level(
                        score
                    ),
                "weight":
                    STAGE_WEIGHTS[
                        stage
                    ],
            }
        )

    stages.sort(
        key=lambda item: item[
            "score"
        ],
        reverse=True,
    )

    recommendations = (
        generate_stage_recommendations(
            row
        )
    )

    return {
        "stage_risk_score": round(
            overall,
            4,
        ),

        "stage_risk_percentage": round(
            overall * 100.0,
            2,
        ),

        "stage_risk_level":
            get_stage_risk_level(
                overall
            ),

        "highest_risk_stage":
            stages[0]["stage"]
            if stages
            else "None",

        "stages": stages,

        "recommendations":
            recommendations,
    }


# ============================================================================
# STAGE SUMMARY
# ============================================================================

def get_stage_risk_summary(
    data: pd.DataFrame,
) -> dict[str, Any]:
    """
    Generate summary statistics across multiple projects.
    """

    analysis = analyze_stage_risk(
        data
    )

    if len(analysis) == 0:

        return {
            "total_projects": 0,
            "average_stage_risk_score": 0.0,
            "average_stage_risk_percentage": 0.0,
            "stage_risk_distribution": {},
            "most_common_highest_risk_stage": None,
            "average_stage_scores": {},
        }

    distribution = (
        analysis[
            "stage_risk_level"
        ]
        .value_counts()
        .to_dict()
    )

    average_scores = {}

    for stage in STAGES:

        column = (
            f"{stage.lower().replace('&', 'and').replace(' ', '_')}_risk"
        )

        average_scores[
            stage
        ] = round(
            float(
                analysis[
                    column
                ].mean()
            ),
            4,
        )

    highest_stage_counts = (
        analysis[
            "highest_risk_stage"
        ]
        .value_counts()
    )

    if len(highest_stage_counts):

        most_common_stage = (
            str(
                highest_stage_counts.index[0]
            )
        )

    else:

        most_common_stage = None

    return {
        "total_projects": int(
            len(analysis)
        ),

        "average_stage_risk_score":
            round(
                float(
                    analysis[
                        "stage_risk_score"
                    ].mean()
                ),
                4,
            ),

        "average_stage_risk_percentage":
            round(
                float(
                    analysis[
                        "stage_risk_percentage"
                    ].mean()
                ),
                2,
            ),

        "stage_risk_distribution": {
            str(key): int(value)
            for key, value
            in distribution.items()
        },

        "most_common_highest_risk_stage":
            most_common_stage,

        "average_stage_scores":
            average_scores,
    }


# ============================================================================
# STAGE STATUS
# ============================================================================

def get_stage_status(
    score: float,
) -> str:
    """
    Return a simple operational status.
    """

    score = _clip_score(
        score
    )

    if score < 0.25:
        return "ON_TRACK"

    if score < 0.50:
        return "MONITOR"

    if score < 0.75:
        return "ACTION_REQUIRED"

    return "URGENT"


# ============================================================================
# PROJECT STAGE DASHBOARD
# ============================================================================

def get_stage_dashboard(
    data: pd.DataFrame,
) -> dict[str, Any]:
    """
    Create dashboard-ready stage information for one project.
    """

    analysis = (
        analyze_single_project_stages(
            data
        )
    )

    dashboard = []

    for stage in analysis["stages"]:

        dashboard.append(
            {
                "stage":
                    stage["stage"],

                "risk_score":
                    stage["score"],

                "risk_percentage":
                    stage["percentage"],

                "risk_level":
                    stage["risk_level"],

                "status":
                    get_stage_status(
                        stage["score"]
                    ),

                "weight":
                    stage["weight"],
            }
        )

    return {
        "overall": {
            "risk_score":
                analysis[
                    "stage_risk_score"
                ],

            "risk_percentage":
                analysis[
                    "stage_risk_percentage"
                ],

            "risk_level":
                analysis[
                    "stage_risk_level"
                ],

            "highest_risk_stage":
                analysis[
                    "highest_risk_stage"
                ],
        },

        "stages":
            dashboard,

        "recommendations":
            analysis[
                "recommendations"
            ],
    }


# ============================================================================
# TEST
# ============================================================================

if __name__ == "__main__":

    from features import (
        make_synthetic_dataset,
    )

    print()
    print("=" * 78)
    print(
        "LANDGUARD AI - STAGE RISK ENGINE TEST"
    )
    print("=" * 78)

    # ------------------------------------------------------------------------
    # Generate development data
    # ------------------------------------------------------------------------

    data = make_synthetic_dataset(
        n=100,
        seed=42,
    )

    print()
    print(
        f"Projects tested: {len(data)}"
    )

    # ------------------------------------------------------------------------
    # Stage analysis
    # ------------------------------------------------------------------------

    analysis = analyze_stage_risk(
        data
    )

    print()
    print(
        "STAGE RISK RESULTS"
    )
    print("-" * 78)

    display_columns = [
        "stage_risk_score",
        "stage_risk_percentage",
        "stage_risk_level",
        "highest_risk_stage",
    ]

    print(
        analysis[
            display_columns
        ].to_string(
            index=False
        )
    )

    # ------------------------------------------------------------------------
    # Summary
    # ------------------------------------------------------------------------

    print()
    print(
        "STAGE RISK SUMMARY"
    )
    print("-" * 78)

    summary = get_stage_risk_summary(
        data
    )

    for key, value in summary.items():

        print(
            f"{key}: {value}"
        )

    # ------------------------------------------------------------------------
    # Single project
    # ------------------------------------------------------------------------

    print()
    print(
        "SINGLE PROJECT STAGE ANALYSIS"
    )
    print("-" * 78)

    single = (
        analyze_single_project_stages(
            data.iloc[[0]]
        )
    )

    print(
        f"Overall risk: "
        f"{single['stage_risk_percentage']:.2f}%"
    )

    print(
        f"Risk level: "
        f"{single['stage_risk_level']}"
    )

    print(
        f"Highest-risk stage: "
        f"{single['highest_risk_stage']}"
    )

    print()
    print(
        "STAGE DETAILS"
    )

    for stage in single["stages"]:

        print(
            f"{stage['stage']:<20} "
            f"{stage['percentage']:>7.2f}% "
            f"{stage['risk_level']}"
        )

    # ------------------------------------------------------------------------
    # Dashboard
    # ------------------------------------------------------------------------

    print()
    print(
        "DASHBOARD OUTPUT"
    )
    print("-" * 78)

    dashboard = get_stage_dashboard(
        data.iloc[[0]]
    )

    print(
        dashboard
    )

    print()
    print(
        "stage_risk.py is running successfully."
    )
