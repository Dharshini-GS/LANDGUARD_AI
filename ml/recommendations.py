"""
LANDGUARD AI - Recommendation Engine
-------------------------------------

Converts LANDGUARD AI risk factors into actionable recommendations.

Works with:
    - risk.py
    - stage_risk.py
    - explainability.py
    - predictor.py

The recommendation engine is rule-based and does NOT require a
separate ML model.

Input:
    Project dataframe / risk analysis / explanation

Output:
    Prioritized recommendations with:
        - category
        - priority
        - severity
        - responsible department
        - action
        - reason
        - expected impact
        - urgency
"""

from __future__ import annotations

from typing import Any, Optional

import numpy as np
import pandas as pd


# ============================================================================
# CONSTANTS
# ============================================================================

PRIORITY_ORDER = {
    "CRITICAL": 0,
    "HIGH": 1,
    "MEDIUM": 2,
    "LOW": 3,
}


# ============================================================================
# HELPERS
# ============================================================================

def _safe_float(
    value: Any,
    default: float = 0.0,
) -> float:
    """
    Safely convert a value to float.
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


def _clamp(
    value: float,
    low: float = 0.0,
    high: float = 1.0,
) -> float:

    return max(
        low,
        min(
            high,
            value,
        ),
    )


def _priority_from_score(
    score: float,
) -> str:
    """
    Convert normalized risk score to priority.
    """

    score = _clamp(
        score
    )

    if score >= 0.80:
        return "CRITICAL"

    if score >= 0.60:
        return "HIGH"

    if score >= 0.35:
        return "MEDIUM"

    return "LOW"


def _severity(
    score: float,
) -> str:

    return _priority_from_score(
        score
    )


def _recommendation(
    category: str,
    priority: str,
    department: str,
    action: str,
    reason: str,
    expected_impact: str,
    urgency: str = "Immediate",
) -> dict:

    return {
        "category": category,
        "priority": priority,
        "department": department,
        "action": action,
        "reason": reason,
        "expected_impact": expected_impact,
        "urgency": urgency,
    }


# ============================================================================
# INDIVIDUAL RISK RULES
# ============================================================================

def recommend_for_compensation(
    compensation_completed_pct: float,
    pending_compensation_cases: float = 0,
    pending_compensation_amount: float = 0,
) -> Optional[dict]:
    """
    Generate recommendation for compensation risk.
    """

    completion = _clamp(
        _safe_float(
            compensation_completed_pct
        ) / 100.0
    )

    pending_ratio = 1.0 - completion

    cases = _safe_float(
        pending_compensation_cases
    )

    risk = max(
        pending_ratio,
        _clamp(
            cases / 50.0
        ),
    )

    if risk < 0.35:
        return None

    priority = _priority_from_score(
        risk
    )

    if risk >= 0.80:

        action = (
            "Immediately clear high-priority compensation cases, "
            "verify beneficiary records, and initiate pending payments."
        )

        impact = (
            "High potential reduction in project delay caused by "
            "unresolved compensation."
        )

        urgency = "Immediate"

    elif risk >= 0.60:

        action = (
            "Review pending compensation cases and establish a "
            "time-bound payment schedule."
        )

        impact = (
            "Can reduce compensation-related bottlenecks "
            "and improve land acquisition progress."
        )

        urgency = "Within 7 days"

    else:

        action = (
            "Monitor pending compensation cases and maintain "
            "regular payment-status updates."
        )

        impact = (
            "Helps prevent moderate compensation delays "
            "from becoming critical."
        )

        urgency = "Within 14 days"

    return _recommendation(
        category="Compensation",
        priority=priority,
        department="Compensation / Finance",
        action=action,
        reason=(
            f"Compensation completion is "
            f"{completion * 100:.1f}% with "
            f"{cases:.0f} pending cases."
        ),
        expected_impact=impact,
        urgency=urgency,
    )


# ----------------------------------------------------------------------------

def recommend_for_legal(
    pending_legal_cases: float,
    legal_disputes: float = 0,
    average_legal_resolution_time: float = 0,
) -> Optional[dict]:
    """
    Generate recommendation for legal risk.
    """

    pending = _safe_float(
        pending_legal_cases
    )

    disputes = _safe_float(
        legal_disputes
    )

    resolution_time = _safe_float(
        average_legal_resolution_time
    )

    case_risk = _clamp(
        pending / 15.0
    )

    dispute_risk = _clamp(
        disputes / 15.0
    )

    time_risk = _clamp(
        resolution_time / 365.0
    )

    risk = (
        0.55 * case_risk
        + 0.25 * dispute_risk
        + 0.20 * time_risk
    )

    if risk < 0.30:
        return None

    priority = _priority_from_score(
        risk
    )

    if risk >= 0.80:

        action = (
            "Escalate unresolved legal cases to the designated "
            "legal authority and create a case-by-case resolution plan."
        )

        urgency = "Immediate"

        impact = (
            "Can substantially reduce legal bottlenecks "
            "affecting land possession and project execution."
        )

    elif risk >= 0.60:

        action = (
            "Prioritize pending legal cases and assign dedicated "
            "legal resources for faster resolution."
        )

        urgency = "Within 7 days"

        impact = (
            "Reduces the probability of prolonged legal delays."
        )

    else:

        action = (
            "Track legal cases regularly and flag cases approaching "
            "their expected resolution deadline."
        )

        urgency = "Within 14 days"

        impact = (
            "Improves early detection of legal bottlenecks."
        )

    return _recommendation(
        category="Legal",
        priority=priority,
        department="Legal Department",
        action=action,
        reason=(
            f"{pending:.0f} legal cases are pending, "
            f"with {disputes:.0f} total disputes."
        ),
        expected_impact=impact,
        urgency=urgency,
    )


# ----------------------------------------------------------------------------

def recommend_for_approval(
    approval_delay_days: float,
    pending_approvals: float = 0,
) -> Optional[dict]:
    """
    Generate recommendation for approval delays.
    """

    delay = _safe_float(
        approval_delay_days
    )

    pending = _safe_float(
        pending_approvals
    )

    delay_risk = _clamp(
        delay / 90.0
    )

    pending_risk = _clamp(
        pending / 8.0
    )

    risk = (
        0.70 * delay_risk
        + 0.30 * pending_risk
    )

    if risk < 0.30:
        return None

    priority = _priority_from_score(
        risk
    )

    if risk >= 0.80:

        action = (
            "Escalate long-pending approvals and establish a "
            "fast-track approval process for critical project decisions."
        )

        urgency = "Immediate"

        impact = (
            "Can remove a major administrative dependency "
            "blocking project execution."
        )

    elif risk >= 0.60:

        action = (
            "Review pending approvals with responsible authorities "
            "and define target completion dates."
        )

        urgency = "Within 7 days"

        impact = (
            "Reduces administrative waiting time."
        )

    else:

        action = (
            "Monitor approval timelines and send automated reminders "
            "before approval deadlines."
        )

        urgency = "Within 14 days"

        impact = (
            "Prevents approval delays from accumulating."
        )

    return _recommendation(
        category="Approvals",
        priority=priority,
        department="Administration",
        action=action,
        reason=(
            f"Approval delay is approximately "
            f"{delay:.1f} days with "
            f"{pending:.0f} pending approvals."
        ),
        expected_impact=impact,
        urgency=urgency,
    )


# ----------------------------------------------------------------------------

def recommend_for_documentation(
    documentation_completion_pct: float,
) -> Optional[dict]:
    """
    Generate recommendation for documentation.
    """

    completion = _clamp(
        _safe_float(
            documentation_completion_pct
        ) / 100.0
    )

    risk = 1.0 - completion

    if risk < 0.30:
        return None

    priority = _priority_from_score(
        risk
    )

    if risk >= 0.80:

        action = (
            "Conduct an immediate documentation audit and complete "
            "missing ownership, verification, and acquisition records."
        )

        urgency = "Immediate"

    elif risk >= 0.60:

        action = (
            "Create a documentation completion plan and assign "
            "owners to all incomplete records."
        )

        urgency = "Within 7 days"

    else:

        action = (
            "Monitor incomplete documentation and resolve remaining "
            "records during the next project review."
        )

        urgency = "Within 14 days"

    return _recommendation(
        category="Documentation",
        priority=priority,
        department="Land Records / Documentation",
        action=action,
        reason=(
            f"Documentation completion is "
            f"{completion * 100:.1f}%."
        ),
        expected_impact=(
            "Improves record readiness and reduces "
            "documentation-related project delays."
        ),
        urgency=urgency,
    )


# ----------------------------------------------------------------------------

def recommend_for_ownership(
    ownership_conflict_count: float,
    landowners: float = 1,
) -> Optional[dict]:
    """
    Generate recommendation for ownership conflicts.
    """

    conflicts = _safe_float(
        ownership_conflict_count
    )

    owners = max(
        _safe_float(
            landowners,
            1,
        ),
        1,
    )

    density = conflicts / owners

    risk = max(
        _clamp(
            conflicts / 12.0
        ),
        _clamp(
            density * 20.0
        ),
    )

    if risk < 0.30:
        return None

    priority = _priority_from_score(
        risk
    )

    return _recommendation(
        category="Ownership",
        priority=priority,
        department="Land Acquisition / Legal",
        action=(
            "Verify disputed ownership records, identify conflicting "
            "claims, and prioritize cases requiring legal clarification."
        ),
        reason=(
            f"{conflicts:.0f} ownership conflicts were detected "
            f"among approximately {owners:.0f} landowners."
        ),
        expected_impact=(
            "Reduces possession delays and prevents unresolved "
            "ownership disputes from blocking acquisition."
        ),
        urgency=(
            "Immediate"
            if risk >= 0.60
            else "Within 14 days"
        ),
    )


# ----------------------------------------------------------------------------

def recommend_for_possession(
    possession_pct: float,
) -> Optional[dict]:
    """
    Generate recommendation for low land possession.
    """

    possession = _clamp(
        _safe_float(
            possession_pct
        ) / 100.0
    )

    risk = 1.0 - possession

    if risk < 0.30:
        return None

    priority = _priority_from_score(
        risk
    )

    return _recommendation(
        category="Possession",
        priority=priority,
        department="Land Acquisition",
        action=(
            "Prioritize pending possession parcels and coordinate "
            "with landowners and field teams to complete handover."
        ),
        reason=(
            f"Current possession is only "
            f"{possession * 100:.1f}%."
        ),
        expected_impact=(
            "Improves site availability and enables downstream "
            "construction activities."
        ),
        urgency=(
            "Immediate"
            if risk >= 0.60
            else "Within 14 days"
        ),
    )


# ----------------------------------------------------------------------------

def recommend_for_rr(
    rr_completion_pct: float,
    rr_waiting_families: float = 0,
    pending_resettlement_cases: float = 0,
) -> Optional[dict]:
    """
    Generate recommendation for rehabilitation and resettlement.
    """

    completion = _clamp(
        _safe_float(
            rr_completion_pct
        ) / 100.0
    )

    waiting = _safe_float(
        rr_waiting_families
    )

    pending = _safe_float(
        pending_resettlement_cases
    )

    risk = max(
        1.0 - completion,
        _clamp(
            waiting / 150.0
        ),
        _clamp(
            pending / 50.0
        ),
    )

    if risk < 0.30:
        return None

    priority = _priority_from_score(
        risk
    )

    return _recommendation(
        category="Rehabilitation & Resettlement",
        priority=priority,
        department="R&R Department",
        action=(
            "Prioritize pending rehabilitation and resettlement cases, "
            "complete eligible assistance, and maintain a beneficiary "
            "tracking register."
        ),
        reason=(
            f"R&R completion is {completion * 100:.1f}%, "
            f"with {waiting:.0f} families waiting."
        ),
        expected_impact=(
            "Reduces social and administrative delays and supports "
            "timely land handover."
        ),
        urgency=(
            "Immediate"
            if risk >= 0.60
            else "Within 14 days"
        ),
    )


# ----------------------------------------------------------------------------

def recommend_for_stakeholders(
    avg_stakeholder_response_time: float,
    pending_requests: float = 0,
) -> Optional[dict]:
    """
    Generate recommendation for stakeholder communication.
    """

    response_time = _safe_float(
        avg_stakeholder_response_time
    )

    requests = _safe_float(
        pending_requests
    )

    response_risk = _clamp(
        response_time / 60.0
    )

    request_risk = _clamp(
        requests / 40.0
    )

    risk = (
        0.70 * response_risk
        + 0.30 * request_risk
    )

    if risk < 0.30:
        return None

    priority = _priority_from_score(
        risk
    )

    return _recommendation(
        category="Stakeholder Coordination",
        priority=priority,
        department="Stakeholder Relations",
        action=(
            "Establish a dedicated request-tracking workflow, "
            "set response deadlines, and escalate overdue requests."
        ),
        reason=(
            f"Average stakeholder response time is "
            f"{response_time:.1f} days with "
            f"{requests:.0f} pending requests."
        ),
        expected_impact=(
            "Improves communication and reduces delays caused "
            "by unresolved stakeholder requests."
        ),
        urgency=(
            "Within 7 days"
            if risk >= 0.60
            else "Within 14 days"
        ),
    )


# ----------------------------------------------------------------------------

def recommend_for_administration(
    administrative_bottleneck_count: float,
    department_coordination_score: float = 100,
) -> Optional[dict]:
    """
    Generate recommendation for administrative bottlenecks.
    """

    bottlenecks = _safe_float(
        administrative_bottleneck_count
    )

    coordination = _clamp(
        _safe_float(
            department_coordination_score,
            100,
        ) / 100.0
    )

    bottleneck_risk = _clamp(
        bottlenecks / 10.0
    )

    coordination_risk = (
        1.0 - coordination
    )

    risk = (
        0.65 * bottleneck_risk
        + 0.35 * coordination_risk
    )

    if risk < 0.30:
        return None

    priority = _priority_from_score(
        risk
    )

    return _recommendation(
        category="Administration",
        priority=priority,
        department="Project Administration",
        action=(
            "Map the current administrative workflow, identify "
            "bottlenecks, assign ownership, and introduce escalation "
            "for overdue activities."
        ),
        reason=(
            f"{bottlenecks:.0f} administrative bottlenecks "
            f"were identified."
        ),
        expected_impact=(
            "Improves cross-department coordination and "
            "reduces process waiting time."
        ),
        urgency=(
            "Immediate"
            if risk >= 0.60
            else "Within 14 days"
        ),
    )


# ============================================================================
# MAIN RECOMMENDATION ENGINE
# ============================================================================

def generate_recommendations(
    project: pd.Series | dict | pd.DataFrame,
) -> list[dict]:
    """
    Generate recommendations for a project.

    Parameters
    ----------
    project:
        Can be:

            pandas.Series
            dictionary
            one-row pandas.DataFrame

    Returns
    -------
    list[dict]
        Prioritized recommendations.
    """

    # ------------------------------------------------------------------------
    # NORMALIZE INPUT
    # ------------------------------------------------------------------------

    if isinstance(
        project,
        pd.DataFrame,
    ):

        if len(project) != 1:

            raise ValueError(
                "generate_recommendations() expects "
                "one project row."
            )

        row = project.iloc[0]

    elif isinstance(
        project,
        pd.Series,
    ):

        row = project

    elif isinstance(
        project,
        dict,
    ):

        row = pd.Series(
            project
        )

    else:

        raise TypeError(
            "project must be a pandas.Series, dict, "
            "or one-row pandas.DataFrame."
        )

    recommendations = []

    # ------------------------------------------------------------------------
    # COMPENSATION
    # ------------------------------------------------------------------------

    result = recommend_for_compensation(
        row.get(
            "compensation_completed_pct",
            0,
        ),
        row.get(
            "pending_compensation_cases",
            0,
        ),
        row.get(
            "pending_compensation_amount",
            0,
        ),
    )

    if result is not None:
        recommendations.append(
            result
        )

    # ------------------------------------------------------------------------
    # LEGAL
    # ------------------------------------------------------------------------

    result = recommend_for_legal(
        row.get(
            "pending_legal_cases",
            0,
        ),
        row.get(
            "legal_disputes",
            0,
        ),
        row.get(
            "average_legal_resolution_time",
            0,
        ),
    )

    if result is not None:
        recommendations.append(
            result
        )

    # ------------------------------------------------------------------------
    # APPROVAL
    # ------------------------------------------------------------------------

    result = recommend_for_approval(
        row.get(
            "approval_delay_days",
            0,
        ),
        row.get(
            "pending_approvals",
            0,
        ),
    )

    if result is not None:
        recommendations.append(
            result
        )

    # ------------------------------------------------------------------------
    # DOCUMENTATION
    # ------------------------------------------------------------------------

    result = recommend_for_documentation(
        row.get(
            "documentation_completion_pct",
            0,
        )
    )

    if result is not None:
        recommendations.append(
            result
        )

    # ------------------------------------------------------------------------
    # OWNERSHIP
    # ------------------------------------------------------------------------

    result = recommend_for_ownership(
        row.get(
            "ownership_conflict_count",
            0,
        ),
        row.get(
            "landowners",
            1,
        ),
    )

    if result is not None:
        recommendations.append(
            result
        )

    # ------------------------------------------------------------------------
    # POSSESSION
    # ------------------------------------------------------------------------

    result = recommend_for_possession(
        row.get(
            "possession_pct",
            0,
        )
    )

    if result is not None:
        recommendations.append(
            result
        )

    # ------------------------------------------------------------------------
    # R&R
    # ------------------------------------------------------------------------

    result = recommend_for_rr(
        row.get(
            "rr_completion_pct",
            0,
        ),
        row.get(
            "rr_waiting_families",
            0,
        ),
        row.get(
            "pending_resettlement_cases",
            0,
        ),
    )

    if result is not None:
        recommendations.append(
            result
        )

    # ------------------------------------------------------------------------
    # STAKEHOLDERS
    # ------------------------------------------------------------------------

    result = recommend_for_stakeholders(
        row.get(
            "avg_stakeholder_response_time",
            0,
        ),
        row.get(
            "pending_requests",
            0,
        ),
    )

    if result is not None:
        recommendations.append(
            result
        )

    # ------------------------------------------------------------------------
    # ADMINISTRATION
    # ------------------------------------------------------------------------

    result = recommend_for_administration(
        row.get(
            "administrative_bottleneck_count",
            0,
        ),
        row.get(
            "department_coordination_score",
            100,
        ),
    )

    if result is not None:
        recommendations.append(
            result
        )

    # ------------------------------------------------------------------------
    # SORT
    # ------------------------------------------------------------------------

    recommendations.sort(
        key=lambda item: (
            PRIORITY_ORDER.get(
                item["priority"],
                99,
            ),
            item["category"],
        )
    )

    # ------------------------------------------------------------------------
    # ADD RANK
    # ------------------------------------------------------------------------

    for index, item in enumerate(
        recommendations,
        start=1,
    ):

        item["rank"] = index

    return recommendations


# ============================================================================
# RECOMMENDATIONS FROM RISK ANALYSIS
# ============================================================================

def recommendations_from_risk_analysis(
    risk_analysis: dict,
    project: Optional[
        pd.Series | dict | pd.DataFrame
    ] = None,
) -> list[dict]:
    """
    Generate recommendations from an existing risk.py result.

    If the original project data is supplied, detailed rule-based
    recommendations are generated.

    Otherwise, the risk factors returned by risk.py are converted
    into generic recommendations.
    """

    if project is not None:

        return generate_recommendations(
            project
        )

    if not isinstance(
        risk_analysis,
        dict,
    ):

        raise TypeError(
            "risk_analysis must be a dictionary."
        )

    factors = risk_analysis.get(
        "risk_factors",
        [],
    )

    recommendations = []

    for factor in factors:

        if not isinstance(
            factor,
            dict,
        ):

            continue

        name = str(
            factor.get(
                "factor",
                "Unknown",
            )
        )

        score = _safe_float(
            factor.get(
                "score",
                0,
            )
        )

        # Support percentages such as 75.
        if score > 1:
            score = score / 100.0

        score = _clamp(
            score
        )

        priority = _priority_from_score(
            score
        )

        recommendations.append(
            _recommendation(
                category=name,
                priority=priority,
                department="Project Management",
                action=(
                    f"Review and address the {name.lower()} "
                    "risk factor."
                ),
                reason=(
                    f"{name} has a risk contribution "
                    f"of approximately {score * 100:.1f}%."
                ),
                expected_impact=(
                    "Reducing this risk factor may improve "
                    "overall project execution."
                ),
                urgency=(
                    "Immediate"
                    if score >= 0.60
                    else "Within 14 days"
                ),
            )
        )

    recommendations.sort(
        key=lambda item: PRIORITY_ORDER.get(
            item["priority"],
            99,
        )
    )

    for index, item in enumerate(
        recommendations,
        start=1,
    ):

        item["rank"] = index

    return recommendations


# ============================================================================
# COMBINED RISK + RECOMMENDATION SUMMARY
# ============================================================================

def build_action_plan(
    project: pd.Series | dict | pd.DataFrame,
    risk_analysis: Optional[dict] = None,
) -> dict:
    """
    Build a complete project action plan.
    """

    recommendations = generate_recommendations(
        project
    )

    critical = [
        item
        for item in recommendations
        if item["priority"] == "CRITICAL"
    ]

    high = [
        item
        for item in recommendations
        if item["priority"] == "HIGH"
    ]

    medium = [
        item
        for item in recommendations
        if item["priority"] == "MEDIUM"
    ]

    low = [
        item
        for item in recommendations
        if item["priority"] == "LOW"
    ]

    project_id = None

    if isinstance(
        project,
        pd.DataFrame,
    ):

        project_id = project.iloc[0].get(
            "project_id"
        )

    elif isinstance(
        project,
        pd.Series,
    ):

        project_id = project.get(
            "project_id"
        )

    elif isinstance(
        project,
        dict,
    ):

        project_id = project.get(
            "project_id"
        )

    return {
        "project_id": project_id,
        "total_recommendations": len(
            recommendations
        ),
        "critical_count": len(
            critical
        ),
        "high_count": len(
            high
        ),
        "medium_count": len(
            medium
        ),
        "low_count": len(
            low
        ),
        "recommendations": recommendations,
        "immediate_actions": (
            critical + high
        ),
        "risk_analysis": risk_analysis,
    }


# ============================================================================
# TOP ACTIONS
# ============================================================================

def get_top_recommendations(
    project: pd.Series | dict | pd.DataFrame,
    top_n: int = 5,
) -> list[dict]:
    """
    Return the highest-priority actions.
    """

    recommendations = generate_recommendations(
        project
    )

    return recommendations[
        :max(
            1,
            int(top_n),
        )
    ]


# ============================================================================
# TEXT SUMMARY
# ============================================================================

def recommendations_to_text(
    recommendations: list[dict],
) -> str:
    """
    Convert recommendations to a human-readable summary.
    """

    if not recommendations:

        return (
            "No significant risk-driven actions "
            "are currently required."
        )

    lines = [
        "LANDGUARD AI - Recommended Actions",
        "=" * 50,
    ]

    for item in recommendations:

        lines.append(
            f"\n{item['rank']}. "
            f"[{item['priority']}] "
            f"{item['category']}"
        )

        lines.append(
            f"Department: "
            f"{item['department']}"
        )

        lines.append(
            f"Action: "
            f"{item['action']}"
        )

        lines.append(
            f"Reason: "
            f"{item['reason']}"
        )

        lines.append(
            f"Expected Impact: "
            f"{item['expected_impact']}"
        )

        lines.append(
            f"Urgency: "
            f"{item['urgency']}"
        )

    return "\n".join(
        lines
    )


# ============================================================================
# DATAFRAME OUTPUT
# ============================================================================

def recommendations_to_dataframe(
    recommendations: list[dict],
) -> pd.DataFrame:
    """
    Convert recommendation list to a DataFrame.
    """

    if not recommendations:

        return pd.DataFrame(
            columns=[
                "rank",
                "category",
                "priority",
                "department",
                "action",
                "reason",
                "expected_impact",
                "urgency",
            ]
        )

    return pd.DataFrame(
        recommendations
    )[
        [
            "rank",
            "category",
            "priority",
            "department",
            "action",
            "reason",
            "expected_impact",
            "urgency",
        ]
    ]


# ============================================================================
# TEST
# ============================================================================

if __name__ == "__main__":

    print(
        "=" * 70
    )

    print(
        "LANDGUARD AI - Recommendation Engine"
    )

    print(
        "=" * 70
    )

    sample_project = {

        "project_id": "P00001",

        "compensation_completed_pct": 42,

        "pending_compensation_cases": 38,

        "pending_compensation_amount": 5000000,

        "pending_legal_cases": 11,

        "legal_disputes": 14,

        "average_legal_resolution_time": 180,

        "approval_delay_days": 65,

        "pending_approvals": 6,

        "documentation_completion_pct": 58,

        "ownership_conflict_count": 9,

        "landowners": 150,

        "possession_pct": 47,

        "rr_completion_pct": 52,

        "rr_waiting_families": 95,

        "pending_resettlement_cases": 30,

        "avg_stakeholder_response_time": 38,

        "pending_requests": 25,

        "administrative_bottleneck_count": 7,

        "department_coordination_score": 55,
    }

    recommendations = generate_recommendations(
        sample_project
    )

    print(
        "\nGenerated recommendations:",
        len(recommendations),
    )

    print(
        recommendations_to_text(
            recommendations
        )
    )

    print(
        "\nRecommendation engine is running successfully."
    )
