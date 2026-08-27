from sqlalchemy import func
from sqlalchemy.orm import Session

from ..models.project import Project
from ..models.risk_history import RiskHistory
from ..models.user import User


# =========================================================
# LIFECYCLE STAGES
# =========================================================

LIFECYCLE_STAGES = [
    "Land Identification",
    "Survey",
    "Notification",
    "Objection/Hearing",
    "Approval",
    "Compensation",
    "Legal Resolution",
    "Possession",
    "R&R",
    "Documentation",
    "Final Handover",
]


# =========================================================
# ACCESS CONTROL
# =========================================================

def apply_user_scope(query, current_user: User):
    """
    Restrict projects according to the authenticated
    user's role and geographic/project scope.
    """

    role = current_user.role

    # -----------------------------------------------------
    # ADMIN
    # -----------------------------------------------------

    if role == "ADMIN":
        return query

    # -----------------------------------------------------
    # STATE OFFICER
    # -----------------------------------------------------

    if role == "STATE_OFFICER":

        if current_user.state != "ALL":
            query = query.filter(
                Project.state == current_user.state
            )

        return query

    # -----------------------------------------------------
    # DISTRICT OFFICER
    # -----------------------------------------------------

    if role == "DISTRICT_OFFICER":

        if current_user.state != "ALL":
            query = query.filter(
                Project.state == current_user.state
            )

        if current_user.district != "ALL":
            query = query.filter(
                Project.district == current_user.district
            )

        return query

    # -----------------------------------------------------
    # PROJECT MANAGER
    # -----------------------------------------------------

    if role == "PROJECT_MANAGER":

        return query.filter(
            Project.project_manager_id
            == current_user.user_id
        )

    # -----------------------------------------------------
    # ANALYST
    # -----------------------------------------------------

    if role == "ANALYST":

        if current_user.state != "ALL":
            query = query.filter(
                Project.state == current_user.state
            )

        if current_user.district != "ALL":
            query = query.filter(
                Project.district == current_user.district
            )

        return query

    # -----------------------------------------------------
    # UNKNOWN ROLE
    # -----------------------------------------------------

    return query.filter(
        Project.project_id == "__NO_ACCESS__"
    )


# =========================================================
# LATEST RISK PER PROJECT
# =========================================================

def get_latest_risk_query(
    db: Session,
    current_user: User
):
    """
    Get the latest risk-history record for every project
    accessible to the current user.
    """

    # -----------------------------------------------------
    # Determine accessible projects
    # -----------------------------------------------------

    project_query = db.query(Project)

    project_query = apply_user_scope(
        project_query,
        current_user
    )

    scoped_projects = (
        project_query
        .with_entities(Project.project_id)
        .subquery()
    )

    # -----------------------------------------------------
    # Latest risk date per project
    # -----------------------------------------------------

    latest_dates = (
        db.query(
            RiskHistory.project_id,
            func.max(
                RiskHistory.prediction_date
            ).label("latest_date")
        )
        .filter(
            RiskHistory.project_id.in_(
                db.query(
                    scoped_projects.c.project_id
                )
            )
        )
        .group_by(
            RiskHistory.project_id
        )
        .subquery()
    )

    # -----------------------------------------------------
    # Join latest risk with project
    # -----------------------------------------------------

    return (
        db.query(
            RiskHistory,
            Project
        )
        .join(
            Project,
            Project.project_id
            == RiskHistory.project_id
        )
        .join(
            latest_dates,
            (
                RiskHistory.project_id
                == latest_dates.c.project_id
            )
            &
            (
                RiskHistory.prediction_date
                == latest_dates.c.latest_date
            )
        )
    )


# =========================================================
# STAGE OVERVIEW
# =========================================================

def get_stage_risk_overview(
    db: Session,
    current_user: User
):
    """
    Aggregate latest project risk by lifecycle stage.
    """

    records = get_latest_risk_query(
        db,
        current_user
    ).all()

    stage_data = {}

    # -----------------------------------------------------
    # Initialize every lifecycle stage
    # -----------------------------------------------------

    for stage in LIFECYCLE_STAGES:

        stage_data[stage] = {
            "stage": stage,
            "project_count": 0,
            "average_risk_score": 0,
            "high_risk_projects": 0,
            "critical_risk_projects": 0,
            "average_delay_probability": 0,
            "average_expected_delay_days": 0,
        }

    # -----------------------------------------------------
    # Aggregate records
    # -----------------------------------------------------

    for risk, project in records:

        stage = risk.highest_risk_stage

        if stage not in stage_data:

            stage_data[stage] = {
                "stage": stage,
                "project_count": 0,
                "average_risk_score": 0,
                "high_risk_projects": 0,
                "critical_risk_projects": 0,
                "average_delay_probability": 0,
                "average_expected_delay_days": 0,
            }

        item = stage_data[stage]

        item["project_count"] += 1

        item["_risk_score_total"] = (
            item.get("_risk_score_total", 0)
            + (risk.risk_score or 0)
        )

        item["_delay_probability_total"] = (
            item.get("_delay_probability_total", 0)
            + (risk.delay_probability or 0)
        )

        item["_delay_days_total"] = (
            item.get("_delay_days_total", 0)
            + (risk.expected_delay_days or 0)
        )

        category = (
            risk.risk_category or ""
        ).upper()

        if category == "CRITICAL":
            item["critical_risk_projects"] += 1

        if category in ("HIGH", "CRITICAL"):
            item["high_risk_projects"] += 1

    # -----------------------------------------------------
    # Calculate averages
    # -----------------------------------------------------

    result = []

    for stage, item in stage_data.items():

        count = item["project_count"]

        if count > 0:

            item["average_risk_score"] = round(
                item["_risk_score_total"]
                / count,
                2
            )

            item["average_delay_probability"] = round(
                item["_delay_probability_total"]
                / count,
                4
            )

            item["average_expected_delay_days"] = round(
                item["_delay_days_total"]
                / count,
                2
            )

        # Remove internal calculation fields

        item.pop(
            "_risk_score_total",
            None
        )

        item.pop(
            "_delay_probability_total",
            None
        )

        item.pop(
            "_delay_days_total",
            None
        )

        result.append(item)

    # -----------------------------------------------------
    # Sort by average risk
    # -----------------------------------------------------

    result.sort(
        key=lambda x: (
            x["average_risk_score"],
            x["critical_risk_projects"]
        ),
        reverse=True
    )

    return {
        "stages": result,
        "total_stages": len(result),
    }


# =========================================================
# STAGE PROJECTS
# =========================================================

def get_stage_projects(
    db: Session,
    current_user: User,
    stage: str,
    page: int = 1,
    page_size: int = 20,
):
    """
    Return projects whose latest risk prediction identifies
    the specified stage as the highest-risk stage.
    """

    page = max(
        page,
        1
    )

    page_size = min(
        max(page_size, 1),
        100
    )

    query = get_latest_risk_query(
        db,
        current_user
    ).filter(
        RiskHistory.highest_risk_stage
        == stage
    )

    total = query.count()

    offset = (
        page - 1
    ) * page_size

    records = (
        query
        .order_by(
            RiskHistory.risk_score.desc(),
            RiskHistory.prediction_date.desc()
        )
        .offset(offset)
        .limit(page_size)
        .all()
    )

    items = []

    for risk, project in records:

        items.append({
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
        })

    total_pages = (
        (total + page_size - 1)
        // page_size
        if total > 0
        else 0
    )

    return {
        "stage": stage,
        "items": items,
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": total_pages,
    }


# =========================================================
# SINGLE STAGE SUMMARY
# =========================================================

def get_stage_risk(
    db: Session,
    current_user: User,
    stage: str
):
    """
    Return aggregated risk statistics for one lifecycle
    stage.
    """

    records = (
        get_latest_risk_query(
            db,
            current_user
        )
        .filter(
            RiskHistory.highest_risk_stage
            == stage
        )
        .all()
    )

    if not records:
        return {
            "stage": stage,
            "project_count": 0,
            "average_risk_score": 0,
            "high_risk_projects": 0,
            "critical_risk_projects": 0,
            "average_delay_probability": 0,
            "average_expected_delay_days": 0,
        }

    total_score = 0
    total_probability = 0
    total_delay_days = 0

    high_count = 0
    critical_count = 0

    for risk, project in records:

        total_score += (
            risk.risk_score or 0
        )

        total_probability += (
            risk.delay_probability or 0
        )

        total_delay_days += (
            risk.expected_delay_days or 0
        )

        category = (
            risk.risk_category or ""
        ).upper()

        if category == "CRITICAL":
            critical_count += 1

        if category in (
            "HIGH",
            "CRITICAL"
        ):
            high_count += 1

    count = len(records)

    return {
        "stage": stage,
        "project_count": count,

        "average_risk_score": round(
            total_score / count,
            2
        ),

        "high_risk_projects":
            high_count,

        "critical_risk_projects":
            critical_count,

        "average_delay_probability": round(
            total_probability / count,
            4
        ),

        "average_expected_delay_days": round(
            total_delay_days / count,
            2
        ),
    }