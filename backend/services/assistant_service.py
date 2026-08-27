from sqlalchemy import func
from sqlalchemy.orm import Session

from ..models.project import Project
from ..models.risk_history import RiskHistory
from ..models.alert import Alert
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
# PROJECT CONTEXT
# =========================================================

def get_project_context(
    db: Session,
    current_user: User,
    project_id: str,
):
    query = (
        db.query(Project)
        .filter(
            Project.project_id == project_id
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

    alerts = (
        db.query(Alert)
        .filter(
            Alert.project_id
            == project_id
        )
        .order_by(
            Alert.created_at.desc()
        )
        .limit(10)
        .all()
    )

    return {
        "project": {
            "project_id":
                project.project_id,

            "project_name":
                project.project_name,

            "project_type":
                project.project_type,

            "state":
                project.state,

            "district":
                project.district,

            "village_count":
                project.village_count,

            "land_area_acres":
                project.land_area_acres,

            "affected_families":
                project.affected_families,

            "total_landowners":
                project.total_landowners,

            "project_budget":
                project.project_budget,

            "current_stage":
                project.current_stage,

            "project_status":
                project.project_status,

            "planned_start_date":
                project.planned_start_date,

            "planned_completion_date":
                project.planned_completion_date,
        },

        "risk": (
            {
                "risk_score":
                    risk.risk_score,

                "risk_category":
                    risk.risk_category,

                "delay_probability":
                    risk.delay_probability,

                "expected_delay_days":
                    risk.expected_delay_days,

                "highest_risk_stage":
                    risk.highest_risk_stage,

                "prediction_date":
                    risk.prediction_date,

                "model_version":
                    risk.model_version,
            }
            if risk
            else None
        ),

        "alerts": [
            {
                "alert_id":
                    alert.alert_id,

                "alert_type":
                    alert.alert_type,

                "severity":
                    alert.severity,

                "message":
                    alert.message,

                "status":
                    alert.status,

                "created_at":
                    alert.created_at,
            }
            for alert in alerts
        ],
    }


# =========================================================
# ANSWER PROJECT QUESTION
# =========================================================

def answer_project_question(
    db: Session,
    current_user: User,
    project_id: str,
    question: str,
):
    context = get_project_context(
        db=db,
        current_user=current_user,
        project_id=project_id,
    )

    if not context:
        return None

    project = context["project"]
    risk = context["risk"]
    alerts = context["alerts"]

    question_lower = (
        question.lower()
    )

    # -----------------------------------------------------
    # Risk questions
    # -----------------------------------------------------

    risk_keywords = [
        "risk",
        "danger",
        "delay",
        "critical",
        "high risk",
    ]

    if any(
        keyword in question_lower
        for keyword in risk_keywords
    ):

        if risk:

            probability = round(
                float(
                    risk[
                        "delay_probability"
                    ]
                ) * 100,
                2,
            )

            answer = (
                f"The current risk score for "
                f"{project['project_name']} is "
                f"{risk['risk_score']}/100, "
                f"categorized as "
                f"{risk['risk_category']}. "
                f"The estimated delay probability "
                f"is {probability}%, with an expected "
                f"delay of "
                f"{risk['expected_delay_days']} days. "
                f"The highest-risk stage is "
                f"{risk['highest_risk_stage']}."
            )

        else:

            answer = (
                "No risk prediction is currently "
                "available for this project."
            )

        return {
            "project_id":
                project_id,

            "question":
                question,

            "answer":
                answer,

            "context":
                context,
        }

    # -----------------------------------------------------
    # Alert questions
    # -----------------------------------------------------

    if any(
        keyword in question_lower
        for keyword in [
            "alert",
            "warning",
            "notification",
        ]
    ):

        if alerts:

            answer = (
                f"There are {len(alerts)} recent "
                f"alerts associated with this project."
            )

        else:

            answer = (
                "There are currently no alerts "
                "associated with this project."
            )

        return {
            "project_id":
                project_id,

            "question":
                question,

            "answer":
                answer,

            "context":
                context,
        }

    # -----------------------------------------------------
    # Project status questions
    # -----------------------------------------------------

    if any(
        keyword in question_lower
        for keyword in [
            "status",
            "stage",
            "progress",
            "where",
        ]
    ):

        answer = (
            f"The project is currently in the "
            f"{project['current_stage']} stage "
            f"and its status is "
            f"{project['project_status']}."
        )

        return {
            "project_id":
                project_id,

            "question":
                question,

            "answer":
                answer,

            "context":
                context,
        }

    # -----------------------------------------------------
    # General project response
    # -----------------------------------------------------

    answer = (
        f"{project['project_name']} is a "
        f"{project['project_type']} project in "
        f"{project['district']}, "
        f"{project['state']}. "
        f"It is currently in the "
        f"{project['current_stage']} stage "
        f"with status "
        f"{project['project_status']}."
    )

    return {
        "project_id":
            project_id,

        "question":
            question,

        "answer":
            answer,

        "context":
            context,
    }


# =========================================================
# ASSISTANT OVERVIEW
# =========================================================

def get_assistant_overview(
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

    critical_count = risk_query.filter(
        RiskHistory.risk_category
        == "CRITICAL"
    ).count()

    high_count = risk_query.filter(
        RiskHistory.risk_category
        == "HIGH"
    ).count()

    alert_query = db.query(Alert)

    alert_query = alert_query.join(
        Project,
        Alert.project_id
        == Project.project_id,
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
            alert_query = alert_query.filter(
                Project.state == state
            )

        if district and str(district).upper() != "ALL":
            alert_query = alert_query.filter(
                Project.district == district
            )

    unread_alerts = alert_query.filter(
        Alert.status == "UNREAD"
    ).count()

    return {
        "total_projects":
            total_projects,

        "critical_risk_records":
            critical_count,

        "high_risk_records":
            high_count,

        "unread_alerts":
            unread_alerts,

        "assistant_status":
            "ACTIVE",
    }