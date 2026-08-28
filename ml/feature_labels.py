"""
LANDGUARD AI - Feature Labels
-----------------------------

Human-readable labels, descriptions, categories, and units for
LANDGUARD AI machine-learning features.

This module does NOT perform feature engineering.

It provides:
    - Human-readable feature labels
    - Feature descriptions
    - Units
    - Feature groups
    - Risk interpretation
    - Helper functions for explainability and UI

Compatible with:
    features.py
    preprocessing.py
    risk.py
    explainability.py
    recommendations.py
    simulator.py
    priority.py
"""

from __future__ import annotations

from typing import Any, Optional

from features import (
    BASE_NUMERIC_FEATURES,
    ENGINEERED_FEATURES,
    CATEGORICAL_FEATURES,
    PREDICTION_FEATURES,
)


# ============================================================================
# HUMAN-READABLE FEATURE LABELS
# ============================================================================

FEATURE_LABELS = {

    # ------------------------------------------------------------------------
    # BASE NUMERIC FEATURES
    # ------------------------------------------------------------------------

    "land_area":
        "Land Area",

    "affected_families":
        "Affected Families",

    "landowners":
        "Landowners",

    "notification_pending_days":
        "Notification Pending Days",

    "documentation_completion_pct":
        "Documentation Completion",

    "ownership_conflict_count":
        "Ownership Conflicts",

    "possession_pct":
        "Land Possession",

    "compensation_amount":
        "Compensation Amount",

    "compensation_completed_pct":
        "Compensation Completed",

    "pending_compensation_cases":
        "Pending Compensation Cases",

    "average_processing_days":
        "Average Compensation Processing Days",

    "pending_compensation_amount":
        "Pending Compensation Amount",

    "legal_disputes":
        "Legal Disputes",

    "pending_legal_cases":
        "Pending Legal Cases",

    "average_legal_resolution_time":
        "Average Legal Resolution Time",

    "pending_approvals":
        "Pending Approvals",

    "approval_delay_days":
        "Approval Delay Days",

    "rr_completion_pct":
        "R&R Completion",

    "rr_waiting_families":
        "R&R Waiting Families",

    "pending_resettlement_cases":
        "Pending Resettlement Cases",

    "avg_stakeholder_response_time":
        "Average Stakeholder Response Time",

    "pending_requests":
        "Pending Stakeholder Requests",

    "department_coordination_score":
        "Department Coordination Score",

    "administrative_bottleneck_count":
        "Administrative Bottlenecks",


    # ------------------------------------------------------------------------
    # ENGINEERED FEATURES
    # ------------------------------------------------------------------------

    "compensation_pending_ratio":
        "Compensation Pending Ratio",

    "legal_dispute_density":
        "Legal Dispute Density",

    "approval_delay_score":
        "Approval Delay Score",

    "documentation_score":
        "Documentation Score",

    "rr_score":
        "R&R Score",

    "possession_score":
        "Possession Score",

    "ownership_conflict_score":
        "Ownership Conflict Score",

    "stakeholder_response_score":
        "Stakeholder Response Score",

    "administrative_bottleneck_score":
        "Administrative Bottleneck Score",

    "project_importance":
        "Project Importance",

    "delay_impact":
        "Delay Impact",

    "urgency":
        "Project Urgency",


    # ------------------------------------------------------------------------
    # CATEGORICAL FEATURES
    # ------------------------------------------------------------------------

    "project_type":
        "Project Type",

    "state":
        "State",

    "district":
        "District",

    "notification_status":
        "Notification Status",

    "ownership_status":
        "Ownership Status",

    "compensation_status":
        "Compensation Status",

    "legal_status":
        "Legal Status",

    "approval_status":
        "Approval Status",
}


# ============================================================================
# FEATURE DESCRIPTIONS
# ============================================================================

FEATURE_DESCRIPTIONS = {

    "land_area":
        "Total land area involved in the project.",

    "affected_families":
        "Number of families affected by land acquisition.",

    "landowners":
        "Number of landowners associated with the acquisition.",

    "notification_pending_days":
        "Number of days for which acquisition notification remains pending.",

    "documentation_completion_pct":
        "Percentage of required land acquisition documentation completed.",

    "ownership_conflict_count":
        "Number of ownership or title conflicts identified.",

    "possession_pct":
        "Percentage of required land possession completed.",

    "compensation_amount":
        "Total compensation amount associated with the project.",

    "compensation_completed_pct":
        "Percentage of compensation completed.",

    "pending_compensation_cases":
        "Number of compensation cases still pending.",

    "average_processing_days":
        "Average number of days required to process compensation cases.",

    "pending_compensation_amount":
        "Total compensation amount that remains pending.",

    "legal_disputes":
        "Total number of legal disputes related to land acquisition.",

    "pending_legal_cases":
        "Number of unresolved legal cases.",

    "average_legal_resolution_time":
        "Average time required to resolve legal cases.",

    "pending_approvals":
        "Number of project approvals that are still pending.",

    "approval_delay_days":
        "Number of days by which approvals have been delayed.",

    "rr_completion_pct":
        "Percentage of rehabilitation and resettlement work completed.",

    "rr_waiting_families":
        "Number of affected families waiting for rehabilitation and resettlement.",

    "pending_resettlement_cases":
        "Number of pending rehabilitation or resettlement cases.",

    "avg_stakeholder_response_time":
        "Average time taken by stakeholders to respond to requests.",

    "pending_requests":
        "Number of unresolved stakeholder requests.",

    "department_coordination_score":
        "Score representing coordination effectiveness between departments.",

    "administrative_bottleneck_count":
        "Number of administrative bottlenecks affecting project progress.",


    # ------------------------------------------------------------------------
    # ENGINEERED FEATURES
    # ------------------------------------------------------------------------

    "compensation_pending_ratio":
        "Proportion of compensation that remains incomplete.",

    "legal_dispute_density":
        "Number of legal disputes relative to the number of landowners.",

    "approval_delay_score":
        "Normalized score representing the severity of approval delays.",

    "documentation_score":
        "Normalized documentation completion score.",

    "rr_score":
        "Normalized rehabilitation and resettlement completion score.",

    "possession_score":
        "Normalized land possession completion score.",

    "ownership_conflict_score":
        "Normalized severity of ownership conflicts.",

    "stakeholder_response_score":
        "Normalized stakeholder response delay score.",

    "administrative_bottleneck_score":
        "Normalized severity of administrative bottlenecks.",

    "project_importance":
        "Relative importance of the project based on affected families and land area.",

    "delay_impact":
        "Estimated potential impact of project delay.",

    "urgency":
        "Composite urgency score based on compensation, approvals, notification, and legal conditions.",


    # ------------------------------------------------------------------------
    # CATEGORICAL FEATURES
    # ------------------------------------------------------------------------

    "project_type":
        "Type of infrastructure or development project.",

    "state":
        "Indian state in which the project is located.",

    "district":
        "District in which the project is located.",

    "notification_status":
        "Current status of the land acquisition notification.",

    "ownership_status":
        "Current ownership verification status.",

    "compensation_status":
        "Current compensation processing status.",

    "legal_status":
        "Current status of legal disputes and cases.",

    "approval_status":
        "Current project approval status.",
}


# ============================================================================
# FEATURE UNITS
# ============================================================================

FEATURE_UNITS = {

    "land_area":
        "acres",

    "affected_families":
        "families",

    "landowners":
        "landowners",

    "notification_pending_days":
        "days",

    "documentation_completion_pct":
        "%",

    "ownership_conflict_count":
        "cases",

    "possession_pct":
        "%",

    "compensation_amount":
        "currency",

    "compensation_completed_pct":
        "%",

    "pending_compensation_cases":
        "cases",

    "average_processing_days":
        "days",

    "pending_compensation_amount":
        "currency",

    "legal_disputes":
        "cases",

    "pending_legal_cases":
        "cases",

    "average_legal_resolution_time":
        "days",

    "pending_approvals":
        "approvals",

    "approval_delay_days":
        "days",

    "rr_completion_pct":
        "%",

    "rr_waiting_families":
        "families",

    "pending_resettlement_cases":
        "cases",

    "avg_stakeholder_response_time":
        "days",

    "pending_requests":
        "requests",

    "department_coordination_score":
        "score",

    "administrative_bottleneck_count":
        "bottlenecks",

    "compensation_pending_ratio":
        "ratio",

    "legal_dispute_density":
        "disputes / landowner",

    "approval_delay_score":
        "score",

    "documentation_score":
        "score",

    "rr_score":
        "score",

    "possession_score":
        "score",

    "ownership_conflict_score":
        "score",

    "stakeholder_response_score":
        "score",

    "administrative_bottleneck_score":
        "score",

    "project_importance":
        "score",

    "delay_impact":
        "score",

    "urgency":
        "score",

    "project_type":
        "category",

    "state":
        "category",

    "district":
        "category",

    "notification_status":
        "category",

    "ownership_status":
        "category",

    "compensation_status":
        "category",

    "legal_status":
        "category",

    "approval_status":
        "category",
}


# ============================================================================
# FEATURE GROUPS
# ============================================================================

FEATURE_GROUPS = {

    "base_numeric": list(BASE_NUMERIC_FEATURES),

    "engineered": list(ENGINEERED_FEATURES),

    "categorical": list(CATEGORICAL_FEATURES),

    "all": list(PREDICTION_FEATURES),
}


# ============================================================================
# RISK DIRECTION
# ============================================================================
#
# "higher" means higher values generally increase delay risk.
#
# "lower" means lower values generally increase delay risk.
#
# "neutral" means the feature is contextual rather than directly
# interpreted as increasing/decreasing risk.
# ============================================================================

RISK_DIRECTION = {

    # Base features

    "land_area":
        "neutral",

    "affected_families":
        "higher",

    "landowners":
        "higher",

    "notification_pending_days":
        "higher",

    "documentation_completion_pct":
        "lower",

    "ownership_conflict_count":
        "higher",

    "possession_pct":
        "lower",

    "compensation_amount":
        "neutral",

    "compensation_completed_pct":
        "lower",

    "pending_compensation_cases":
        "higher",

    "average_processing_days":
        "higher",

    "pending_compensation_amount":
        "higher",

    "legal_disputes":
        "higher",

    "pending_legal_cases":
        "higher",

    "average_legal_resolution_time":
        "higher",

    "pending_approvals":
        "higher",

    "approval_delay_days":
        "higher",

    "rr_completion_pct":
        "lower",

    "rr_waiting_families":
        "higher",

    "pending_resettlement_cases":
        "higher",

    "avg_stakeholder_response_time":
        "higher",

    "pending_requests":
        "higher",

    "department_coordination_score":
        "lower",

    "administrative_bottleneck_count":
        "higher",


    # Engineered features

    "compensation_pending_ratio":
        "higher",

    "legal_dispute_density":
        "higher",

    "approval_delay_score":
        "higher",

    "documentation_score":
        "lower",

    "rr_score":
        "lower",

    "possession_score":
        "lower",

    "ownership_conflict_score":
        "higher",

    "stakeholder_response_score":
        "higher",

    "administrative_bottleneck_score":
        "higher",

    "project_importance":
        "higher",

    "delay_impact":
        "higher",

    "urgency":
        "higher",


    # Categorical features

    "project_type":
        "neutral",

    "state":
        "neutral",

    "district":
        "neutral",

    "notification_status":
        "neutral",

    "ownership_status":
        "neutral",

    "compensation_status":
        "neutral",

    "legal_status":
        "neutral",

    "approval_status":
        "neutral",
}


# ============================================================================
# RISK IMPORTANCE
# ============================================================================
#
# Used by explainability / recommendation modules when displaying
# important features.
# ============================================================================

FEATURE_IMPORTANCE_GROUP = {

    "compensation_completed_pct":
        "Compensation",

    "compensation_pending_ratio":
        "Compensation",

    "pending_compensation_cases":
        "Compensation",

    "pending_compensation_amount":
        "Compensation",

    "average_processing_days":
        "Compensation",

    "approval_delay_days":
        "Approvals",

    "approval_delay_score":
        "Approvals",

    "pending_approvals":
        "Approvals",

    "legal_disputes":
        "Legal",

    "pending_legal_cases":
        "Legal",

    "average_legal_resolution_time":
        "Legal",

    "legal_dispute_density":
        "Legal",

    "documentation_completion_pct":
        "Documentation",

    "documentation_score":
        "Documentation",

    "rr_completion_pct":
        "Rehabilitation & Resettlement",

    "rr_score":
        "Rehabilitation & Resettlement",

    "rr_waiting_families":
        "Rehabilitation & Resettlement",

    "pending_resettlement_cases":
        "Rehabilitation & Resettlement",

    "possession_pct":
        "Possession",

    "possession_score":
        "Possession",

    "ownership_conflict_count":
        "Ownership",

    "ownership_conflict_score":
        "Ownership",

    "notification_pending_days":
        "Notification",

    "avg_stakeholder_response_time":
        "Stakeholders",

    "stakeholder_response_score":
        "Stakeholders",

    "pending_requests":
        "Stakeholders",

    "administrative_bottleneck_count":
        "Administration",

    "administrative_bottleneck_score":
        "Administration",

    "department_coordination_score":
        "Administration",

    "affected_families":
        "Project Scale",

    "landowners":
        "Project Scale",

    "land_area":
        "Project Scale",

    "project_importance":
        "Project Scale",

    "delay_impact":
        "Project Scale",

    "urgency":
        "Overall Risk",
}


# ============================================================================
# DISPLAY HELPERS
# ============================================================================

def get_feature_label(
    feature_name: str,
) -> str:
    """
    Convert a raw feature name into a human-readable label.

    Example
    -------
    get_feature_label("approval_delay_days")

    Returns
    -------
    "Approval Delay Days"
    """

    if feature_name in FEATURE_LABELS:
        return FEATURE_LABELS[feature_name]

    # Handle one-hot encoded categorical features.
    #
    # Example:
    #     project_type_Highway
    #
    # becomes:
    #     Project Type: Highway

    for category in CATEGORICAL_FEATURES:

        prefix = f"{category}_"

        if feature_name.startswith(prefix):

            value = feature_name[
                len(prefix):
            ]

            return (
                f"{FEATURE_LABELS.get(category, category)}: "
                f"{value}"
            )

    # Handle sklearn names such as:
    #
    # numeric__approval_delay_days
    #
    # categorical__project_type_Highway

    if "__" in feature_name:

        stripped = feature_name.split(
            "__",
            1,
        )[1]

        if stripped != feature_name:

            return get_feature_label(
                stripped
            )

    # Fallback conversion.

    return (
        feature_name
        .replace("_", " ")
        .replace("-", " ")
        .title()
    )


def get_feature_description(
    feature_name: str,
) -> str:
    """
    Return a human-readable description of a feature.
    """

    if feature_name in FEATURE_DESCRIPTIONS:

        return FEATURE_DESCRIPTIONS[
            feature_name
        ]

    for category in CATEGORICAL_FEATURES:

        prefix = f"{category}_"

        if feature_name.startswith(prefix):

            value = feature_name[
                len(prefix):
            ]

            return (
                f"{FEATURE_LABELS.get(category, category)} "
                f"category: {value}."
            )

    if "__" in feature_name:

        stripped = feature_name.split(
            "__",
            1,
        )[1]

        return get_feature_description(
            stripped
        )

    return (
        f"Feature representing "
        f"{get_feature_label(feature_name).lower()}."
    )


def get_feature_unit(
    feature_name: str,
) -> str:
    """
    Return the unit associated with a feature.
    """

    if feature_name in FEATURE_UNITS:

        return FEATURE_UNITS[
            feature_name
        ]

    if "__" in feature_name:

        stripped = feature_name.split(
            "__",
            1,
        )[1]

        return get_feature_unit(
            stripped
        )

    for category in CATEGORICAL_FEATURES:

        if feature_name.startswith(
            f"{category}_"
        ):

            return "category"

    return "value"


def get_risk_direction(
    feature_name: str,
) -> str:
    """
    Return the general relationship between a feature
    and delay risk.

    Returns
    -------
    str
        "higher", "lower", or "neutral"
    """

    if feature_name in RISK_DIRECTION:

        return RISK_DIRECTION[
            feature_name
        ]

    if "__" in feature_name:

        stripped = feature_name.split(
            "__",
            1,
        )[1]

        return get_risk_direction(
            stripped
        )

    for category in CATEGORICAL_FEATURES:

        if feature_name.startswith(
            f"{category}_"
        ):

            return "neutral"

    return "neutral"


def get_feature_group(
    feature_name: str,
) -> str:
    """
    Determine which feature group a feature belongs to.
    """

    if feature_name in BASE_NUMERIC_FEATURES:

        return "base_numeric"

    if feature_name in ENGINEERED_FEATURES:

        return "engineered"

    if feature_name in CATEGORICAL_FEATURES:

        return "categorical"

    for category in CATEGORICAL_FEATURES:

        if feature_name.startswith(
            f"{category}_"
        ):

            return "categorical"

    if "__" in feature_name:

        stripped = feature_name.split(
            "__",
            1,
        )[1]

        return get_feature_group(
            stripped
        )

    return "unknown"


# ============================================================================
# FEATURE METADATA
# ============================================================================

def get_feature_metadata(
    feature_name: str,
) -> dict:
    """
    Return complete metadata for a feature.

    Example output:

        {
            "name": "approval_delay_days",
            "label": "Approval Delay Days",
            "description": "...",
            "unit": "days",
            "group": "base_numeric",
            "risk_direction": "higher"
        }
    """

    return {

        "name":
            feature_name,

        "label":
            get_feature_label(
                feature_name
            ),

        "description":
            get_feature_description(
                feature_name
            ),

        "unit":
            get_feature_unit(
                feature_name
            ),

        "group":
            get_feature_group(
                feature_name
            ),

        "risk_direction":
            get_risk_direction(
                feature_name
            ),

        "importance_group":
            FEATURE_IMPORTANCE_GROUP.get(
                feature_name,
                "Other",
            ),
    }


# ============================================================================
# ALL FEATURE METADATA
# ============================================================================

def get_all_feature_metadata() -> list[dict]:
    """
    Return metadata for every logical prediction feature.
    """

    return [
        get_feature_metadata(
            feature
        )
        for feature in PREDICTION_FEATURES
    ]


# ============================================================================
# FEATURE LIST HELPERS
# ============================================================================

def get_numeric_feature_labels() -> dict:
    """
    Return labels for numeric features.
    """

    features = (
        list(BASE_NUMERIC_FEATURES)
        + list(ENGINEERED_FEATURES)
    )

    return {
        feature:
            get_feature_label(feature)
        for feature in features
    }


def get_categorical_feature_labels() -> dict:
    """
    Return labels for categorical features.
    """

    return {
        feature:
            get_feature_label(feature)
        for feature in CATEGORICAL_FEATURES
    }


def get_engineered_feature_labels() -> dict:
    """
    Return labels for engineered features.
    """

    return {
        feature:
            get_feature_label(feature)
        for feature in ENGINEERED_FEATURES
    }


# ============================================================================
# EXPLAINABILITY HELPERS
# ============================================================================

def format_feature_contribution(
    feature_name: str,
    contribution: float,
    value: Optional[Any] = None,
) -> dict:
    """
    Format a model feature contribution for explainability output.

    Parameters
    ----------
    feature_name:
        Original or transformed feature name.

    contribution:
        Model contribution / importance.

    value:
        Optional observed feature value.
    """

    contribution = float(
        contribution
    )

    if contribution > 0:

        effect = "increases_delay_risk"

    elif contribution < 0:

        effect = "decreases_delay_risk"

    else:

        effect = "neutral"

    return {

        "feature":
            feature_name,

        "label":
            get_feature_label(
                feature_name
            ),

        "description":
            get_feature_description(
                feature_name
            ),

        "value":
            value,

        "unit":
            get_feature_unit(
                feature_name
            ),

        "contribution":
            contribution,

        "effect":
            effect,

        "risk_direction":
            get_risk_direction(
                feature_name
            ),

        "group":
            get_feature_group(
                feature_name
            ),
    }


# ============================================================================
# TOP FEATURE FORMATTING
# ============================================================================

def format_feature_importances(
    feature_names,
    importances,
    top_n: int = 10,
) -> list[dict]:
    """
    Convert model feature importances into readable records.

    Parameters
    ----------
    feature_names:
        Feature names returned by preprocessing.

    importances:
        Model importance values.

    top_n:
        Number of features to return.
    """

    if len(feature_names) != len(importances):

        raise ValueError(
            "feature_names and importances "
            "must have the same length."
        )

    records = []

    for name, importance in zip(
        feature_names,
        importances,
    ):

        records.append(
            {
                "feature": str(name),

                "label":
                    get_feature_label(
                        str(name)
                    ),

                "importance":
                    float(importance),

                "description":
                    get_feature_description(
                        str(name)
                    ),

                "unit":
                    get_feature_unit(
                        str(name)
                    ),

                "group":
                    get_feature_group(
                        str(name)
                    ),
            }
        )

    records.sort(
        key=lambda item:
            abs(item["importance"]),
        reverse=True,
    )

    return records[:max(1, int(top_n))]


# ============================================================================
# VALIDATION
# ============================================================================

def validate_feature_labels() -> dict:
    """
    Validate that all logical prediction features have metadata.
    """

    missing_labels = [
        feature
        for feature in PREDICTION_FEATURES
        if feature not in FEATURE_LABELS
    ]

    missing_descriptions = [
        feature
        for feature in PREDICTION_FEATURES
        if feature not in FEATURE_DESCRIPTIONS
    ]

    missing_units = [
        feature
        for feature in PREDICTION_FEATURES
        if feature not in FEATURE_UNITS
    ]

    missing_direction = [
        feature
        for feature in PREDICTION_FEATURES
        if feature not in RISK_DIRECTION
    ]

    return {

        "valid":
            not any(
                [
                    missing_labels,
                    missing_descriptions,
                    missing_units,
                    missing_direction,
                ]
            ),

        "feature_count":
            len(PREDICTION_FEATURES),

        "missing_labels":
            missing_labels,

        "missing_descriptions":
            missing_descriptions,

        "missing_units":
            missing_units,

        "missing_risk_direction":
            missing_direction,
    }


# ============================================================================
# SUMMARY
# ============================================================================

def get_feature_summary() -> dict:
    """
    Return a compact summary of the feature system.
    """

    return {

        "total_features":
            len(PREDICTION_FEATURES),

        "base_numeric_features":
            len(BASE_NUMERIC_FEATURES),

        "engineered_features":
            len(ENGINEERED_FEATURES),

        "categorical_features":
            len(CATEGORICAL_FEATURES),

        "feature_groups":
            {
                key: len(value)
                for key, value
                in FEATURE_GROUPS.items()
            },

        "metadata_complete":
            validate_feature_labels()["valid"],
    }


# ============================================================================
# TEST
# ============================================================================

if __name__ == "__main__":

    print("=" * 70)
    print("LANDGUARD AI - Feature Labels")
    print("=" * 70)

    summary = get_feature_summary()

    print(
        "\nTotal prediction features:",
        summary["total_features"],
    )

    print(
        "Base numeric features:",
        summary["base_numeric_features"],
    )

    print(
        "Engineered features:",
        summary["engineered_features"],
    )

    print(
        "Categorical features:",
        summary["categorical_features"],
    )

    print(
        "Metadata complete:",
        summary["metadata_complete"],
    )

    print("\nExample feature metadata:")

    examples = [
        "approval_delay_days",
        "compensation_pending_ratio",
        "legal_dispute_density",
        "urgency",
        "project_type",
    ]

    for feature in examples:

        metadata = get_feature_metadata(
            feature
        )

        print(
            f"\n{metadata['label']}"
        )

        print(
            "  Name:",
            metadata["name"],
        )

        print(
            "  Description:",
            metadata["description"],
        )

        print(
            "  Unit:",
            metadata["unit"],
        )

        print(
            "  Group:",
            metadata["group"],
        )

        print(
            "  Risk direction:",
            metadata["risk_direction"],
        )

    validation = validate_feature_labels()

    print("\nValidation:")
    print(
        "  Valid:",
        validation["valid"],
    )

    if not validation["valid"]:

        print(
            "  Missing labels:",
            validation["missing_labels"],
        )

        print(
            "  Missing descriptions:",
            validation["missing_descriptions"],
        )

        print(
            "  Missing units:",
            validation["missing_units"],
        )

        print(
            "  Missing risk direction:",
            validation[
                "missing_risk_direction"
            ],
        )

    print("\nfeature_labels.py is running successfully.")
