from datetime import datetime, timezone

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
# MODEL INFORMATION
# =========================================================

def get_model_overview(
    db: Session,
    current_user: User,
):
    query = db.query(Project)

    query = apply_project_scope(
        query,
        current_user,
    )

    total_projects = query.count()

    risk_query = (
        db.query(RiskHistory)
        .join(
            Project,
            RiskHistory.project_id
            == Project.project_id,
        )
    )

    if str(current_user.role).upper() != "ADMIN":

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
            risk_query = risk_query.filter(
                Project.state == state
            )

        if district and str(district).upper() != "ALL":
            risk_query = risk_query.filter(
                Project.district == district
            )

    total_predictions = risk_query.count()

    latest = (
        risk_query
        .order_by(
            RiskHistory.prediction_date.desc()
        )
        .first()
    )

    model_version = (
        latest.model_version
        if latest
        else None
    )

    latest_prediction_date = (
        latest.prediction_date
        if latest
        else None
    )

    return {
        "model_name": "LandGuard Risk Prediction Model",
        "model_type": "Risk and Delay Prediction",
        "model_version": model_version,
        "total_projects": total_projects,
        "total_predictions": total_predictions,
        "latest_prediction_date":
            latest_prediction_date,
        "status": "ACTIVE",
    }


# =========================================================
# MODEL VERSIONS
# =========================================================

def get_model_versions(
    db: Session,
    current_user: User,
):
    query = (
        db.query(
            RiskHistory.model_version
        )
        .join(
            Project,
            RiskHistory.project_id
            == Project.project_id,
        )
    )

    if str(current_user.role).upper() != "ADMIN":

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

    versions = (
        query
        .distinct()
        .order_by(
            RiskHistory.model_version
        )
        .all()
    )

    return {
        "items": [
            {
                "model_version": version[0],
                "model_type":
                    "Risk and Delay Prediction",
                "status": "ACTIVE",
            }
            for version in versions
        ],
        "total": len(versions),
    }


# =========================================================
# MODEL PERFORMANCE
# =========================================================

def get_model_performance(
    db: Session,
    current_user: User,
):
    query = (
        db.query(RiskHistory)
        .join(
            Project,
            RiskHistory.project_id
            == Project.project_id,
        )
    )

    if str(current_user.role).upper() != "ADMIN":

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

    records = query.all()

    if not records:
        return {
            "total_predictions": 0,
            "average_risk_score": 0,
            "average_delay_probability": 0,
            "average_expected_delay_days": 0,
        }

    average_risk_score = (
        sum(
            float(
                record.risk_score or 0
            )
            for record in records
        )
        / len(records)
    )

    average_probability = (
        sum(
            float(
                record.delay_probability or 0
            )
            for record in records
        )
        / len(records)
    )

    average_delay = (
        sum(
            int(
                record.expected_delay_days
                or 0
            )
            for record in records
        )
        / len(records)
    )

    return {
        "total_predictions":
            len(records),

        "average_risk_score":
            round(
                average_risk_score,
                2,
            ),

        "average_delay_probability":
            round(
                average_probability,
                4,
            ),

        "average_expected_delay_days":
            round(
                average_delay,
                2,
            ),
    }


# =========================================================
# PREDICT PROJECT RISK
# =========================================================

def predict_project(
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

    latest = (
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

    if latest:

        return {
            "project_id":
                project.project_id,

            "project_name":
                project.project_name,

            "prediction": {
                "risk_score":
                    latest.risk_score,

                "risk_category":
                    latest.risk_category,

                "delay_probability":
                    latest.delay_probability,

                "expected_delay_days":
                    latest.expected_delay_days,

                "highest_risk_stage":
                    latest.highest_risk_stage,

                "model_version":
                    latest.model_version,

                "prediction_date":
                    latest.prediction_date,
            },
        }

    return {
        "project_id":
            project.project_id,

        "project_name":
            project.project_name,

        "prediction": {
            "risk_score": 0,
            "risk_category": "LOW",
            "delay_probability": 0,
            "expected_delay_days": 0,
            "highest_risk_stage":
                project.current_stage,
            "model_version": None,
            "prediction_date": None,
        },
    }