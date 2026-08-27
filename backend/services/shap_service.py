from sqlalchemy.orm import Session

from ..models.project import Project
from ..models.risk_history import RiskHistory
from ..models.user import User


# =========================================================
# ACCESS CONTROL
# =========================================================

def apply_project_scope(
    query,
    current_user: User,
):
    if str(current_user.role).upper() == "ADMIN":
        return query

    state = getattr(
        current_user,
        "state",
        None,
    )

    district = getattr(
        current_user,
        "district",
        None,
    )

    if state and str(state).upper() != "ALL":
        query = query.filter(
            Project.state == state
        )

    if district and str(district).upper() != "ALL":
        query = query.filter(
            Project.district == district
        )

    return query


# =========================================================
# SHAP-LIKE FEATURE EXPLANATION
# =========================================================

def calculate_feature_contributions(
    project: Project,
    risk: RiskHistory | None,
):
    """
    Generate deterministic feature contributions for the
    project's current risk.

    These values are an explanation layer based on the
    available project/risk fields. They are NOT claimed to
    be native SHAP values from a trained tree model.
    """

    risk_score = float(
        risk.risk_score
        if risk
        else 0
    )

    delay_probability = float(
        risk.delay_probability
        if risk
        else 0
    )

    expected_delay = float(
        risk.expected_delay_days
        if risk
        else 0
    )

    families = float(
        project.affected_families
        or 0
    )

    landowners = float(
        project.total_landowners
        or 0
    )

    land_area = float(
        project.land_area_acres
        or 0
    )

    # -----------------------------------------------------
    # Normalized feature scores
    # -----------------------------------------------------

    delay_contribution = min(
        expected_delay / 500.0,
        1.0,
    )

    probability_contribution = min(
        delay_probability,
        1.0,
    )

    family_contribution = min(
        families / 5000.0,
        1.0,
    )

    landowner_contribution = min(
        landowners / 10000.0,
        1.0,
    )

    land_area_contribution = min(
        land_area / 10000.0,
        1.0,
    )

    # Stage-related risk receives a moderate contribution.
    stage = str(
        project.current_stage
        or ""
    ).lower()

    high_risk_stages = {
        "legal resolution",
        "possession",
        "documentation",
        "r&r",
        "objection/hearing",
    }

    stage_contribution = (
        1.0
        if stage in high_risk_stages
        else 0.35
    )

    features = [
        {
            "feature": "Delay Probability",
            "value": round(
                delay_probability,
                4,
            ),
            "contribution": round(
                probability_contribution,
                4,
            ),
            "direction": (
                "INCREASES_RISK"
                if probability_contribution > 0.5
                else "LOW_IMPACT"
            ),
        },
        {
            "feature": "Expected Delay Days",
            "value": int(
                expected_delay
            ),
            "contribution": round(
                delay_contribution,
                4,
            ),
            "direction": (
                "INCREASES_RISK"
                if delay_contribution > 0.5
                else "LOW_IMPACT"
            ),
        },
        {
            "feature": "Affected Families",
            "value": int(
                families
            ),
            "contribution": round(
                family_contribution,
                4,
            ),
            "direction": (
                "INCREASES_RISK"
                if family_contribution > 0.5
                else "LOW_IMPACT"
            ),
        },
        {
            "feature": "Total Landowners",
            "value": int(
                landowners
            ),
            "contribution": round(
                landowner_contribution,
                4,
            ),
            "direction": (
                "INCREASES_RISK"
                if landowner_contribution > 0.5
                else "LOW_IMPACT"
            ),
        },
        {
            "feature": "Land Area",
            "value": round(
                land_area,
                2,
            ),
            "contribution": round(
                land_area_contribution,
                4,
            ),
            "direction": (
                "INCREASES_RISK"
                if land_area_contribution > 0.5
                else "LOW_IMPACT"
            ),
        },
        {
            "feature": "Current Stage",
            "value": project.current_stage,
            "contribution": round(
                stage_contribution,
                4,
            ),
            "direction": (
                "INCREASES_RISK"
                if stage_contribution > 0.5
                else "LOW_IMPACT"
            ),
        },
    ]

    # -----------------------------------------------------
    # Sort by contribution
    # -----------------------------------------------------

    features.sort(
        key=lambda item: float(
            item["contribution"]
        ),
        reverse=True,
    )

    return features


# =========================================================
# PROJECT SHAP EXPLANATION
# =========================================================

def get_project_shap(
    db: Session,
    current_user: User,
    project_id: str,
):
    query = (
        db.query(Project)
        .filter(
            Project.project_id
            == project_id
        )
    )

    query = apply_project_scope(
        query,
        current_user,
    )

    project = query.first()

    if not project:
        return None

    risk = (
        db.query(RiskHistory)
        .filter(
            RiskHistory.project_id
            == project_id
        )
        .order_by(
            RiskHistory.prediction_date.desc()
        )
        .first()
    )

    features = calculate_feature_contributions(
        project=project,
        risk=risk,
    )

    return {
        "project": {
            "project_id":
                project.project_id,

            "project_name":
                project.project_name,

            "state":
                project.state,

            "district":
                project.district,

            "current_stage":
                project.current_stage,

            "project_status":
                project.project_status,
        },

        "model": {
            "name":
                "LandGuard Risk Prediction Model",

            "version":
                risk.model_version
                if risk
                else None,

            "explanation_type":
                "Feature Contribution Analysis",
        },

        "prediction": {
            "risk_score":
                risk.risk_score
                if risk
                else 0,

            "risk_category":
                risk.risk_category
                if risk
                else "LOW",

            "delay_probability":
                risk.delay_probability
                if risk
                else 0,

            "expected_delay_days":
                risk.expected_delay_days
                if risk
                else 0,
        },

        "features": features,

        "top_risk_factors":
            features[:3],
    }


# =========================================================
# SHAP OVERVIEW
# =========================================================

def get_shap_overview(
    db: Session,
    current_user: User,
):
    query = db.query(Project)

    query = apply_project_scope(
        query,
        current_user,
    )

    projects = query.all()

    feature_totals = {}

    for project in projects:

        risk = (
            db.query(RiskHistory)
            .filter(
                RiskHistory.project_id
                == project.project_id
            )
            .order_by(
                RiskHistory.prediction_date.desc()
            )
            .first()
        )

        features = calculate_feature_contributions(
            project=project,
            risk=risk,
        )

        for feature in features:

            name = feature[
                "feature"
            ]

            contribution = float(
                feature[
                    "contribution"
                ]
            )

            feature_totals[name] = (
                feature_totals.get(
                    name,
                    0.0,
                )
                + contribution
            )

    items = []

    for feature, total in feature_totals.items():

        average = (
            total / len(projects)
            if projects
            else 0
        )

        items.append(
            {
                "feature": feature,
                "average_contribution":
                    round(
                        average,
                        4,
                    ),
            }
        )

    items.sort(
        key=lambda item:
            item[
                "average_contribution"
            ],
        reverse=True,
    )

    return {
        "total_projects":
            len(projects),

        "features":
            items,
    }