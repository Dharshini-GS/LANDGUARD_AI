from sqlalchemy.orm import Session

from ..models.project import Project
from ..models.risk_history import RiskHistory
from ..models.user import User


# =========================================================
# USER / PROJECT ACCESS SCOPE
# =========================================================

def apply_project_scope(
    query,
    current_user: User,
):
    """
    Apply state/district access restrictions.

    ADMIN users with ALL scope can access all projects.
    Other users are restricted to their assigned
    state and district.
    """

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
# LATEST RISK
# =========================================================

def get_latest_risk(
    db: Session,
    project_id: str,
):
    return (
        db.query(RiskHistory)
        .filter(
            RiskHistory.project_id == project_id
        )
        .order_by(
            RiskHistory.prediction_date.desc()
        )
        .first()
    )


# =========================================================
# CALCULATE PRIORITY
# =========================================================

def calculate_priority(
    project: Project,
    risk: RiskHistory | None,
) -> dict:
    """
    Calculate a transparent project priority score.

    Risk score contributes 70%.
    Expected delay contributes up to 30 points.
    Active / On Hold projects receive a small urgency
    adjustment.
    """

    if risk:
        risk_score = float(
            risk.risk_score or 0
        )

        delay_days = int(
            risk.expected_delay_days or 0
        )

        risk_category = (
            risk.risk_category
            or "UNKNOWN"
        )

    else:
        risk_score = 0.0
        delay_days = 0
        risk_category = "UNKNOWN"

    # Risk contribution: 0–70
    risk_component = (
        risk_score * 0.70
    )

    # Delay contribution: 0–30
    delay_component = min(
        delay_days / 5.0,
        30.0,
    )

    priority_score = (
        risk_component
        + delay_component
    )

    # Operational urgency
    project_status = str(
        project.project_status or ""
    ).upper()

    if project_status in {
        "ACTIVE",
        "ON HOLD",
    }:
        priority_score += 5

    priority_score = min(
        100,
        round(priority_score),
    )

    if priority_score >= 80:
        priority = "CRITICAL"

    elif priority_score >= 60:
        priority = "HIGH"

    elif priority_score >= 40:
        priority = "MEDIUM"

    else:
        priority = "LOW"

    return {
        "risk_score": int(
            risk_score
        ),
        "risk_category": risk_category,
        "expected_delay_days": delay_days,
        "priority_score": priority_score,
        "priority": priority,
    }


# =========================================================
# BUILD PROJECT PRIORITY RECORD
# =========================================================

def project_to_priority(
    db: Session,
    project: Project,
) -> dict:

    risk = get_latest_risk(
        db=db,
        project_id=project.project_id,
    )

    priority = calculate_priority(
        project=project,
        risk=risk,
    )

    result = {
        "project_id": project.project_id,
        "project_name": project.project_name,
        "project_type": project.project_type,
        "state": project.state,
        "district": project.district,
        "current_stage": project.current_stage,
        "project_status": project.project_status,
        "project_manager_id": project.project_manager_id,

        **priority,
    }

    if risk:
        result.update({
            "risk_history_id":
                risk.risk_history_id,

            "prediction_date":
                risk.prediction_date,

            "delay_probability":
                risk.delay_probability,

            "highest_risk_stage":
                risk.highest_risk_stage,

            "model_version":
                risk.model_version,
        })

    else:
        result.update({
            "risk_history_id": None,
            "prediction_date": None,
            "delay_probability": 0.0,
            "highest_risk_stage": None,
            "model_version": None,
        })

    return result


# =========================================================
# GET ALL PRIORITY PROJECTS
# =========================================================

def get_all_priority_projects(
    db: Session,
    current_user: User,
):
    query = db.query(Project)

    query = apply_project_scope(
        query,
        current_user,
    )

    projects = (
        query
        .order_by(Project.project_id)
        .all()
    )

    return [
        project_to_priority(
            db=db,
            project=project,
        )
        for project in projects
    ]


# =========================================================
# PRIORITY OVERVIEW
# =========================================================

def get_priority_overview(
    db: Session,
    current_user: User,
):
    projects = get_all_priority_projects(
        db=db,
        current_user=current_user,
    )

    by_priority = {
        "CRITICAL": 0,
        "HIGH": 0,
        "MEDIUM": 0,
        "LOW": 0,
    }

    for project in projects:

        priority = project[
            "priority"
        ]

        if priority in by_priority:
            by_priority[
                priority
            ] += 1

    total = len(projects)

    average_score = (
        sum(
            p["priority_score"]
            for p in projects
        ) / total
        if total
        else 0
    )

    top_projects = sorted(
        projects,
        key=lambda x: (
            -x["priority_score"],
            x["project_id"],
        ),
    )[:10]

    return {
        "total_projects": total,

        "average_priority_score": round(
            average_score,
            2,
        ),

        "by_priority": by_priority,

        "top_projects": top_projects,
    }


# =========================================================
# LIST PRIORITY PROJECTS
# =========================================================

def get_priority_projects(
    db: Session,
    current_user: User,
    page: int = 1,
    page_size: int = 20,
    priority: str | None = None,
):
    projects = get_all_priority_projects(
        db=db,
        current_user=current_user,
    )

    if priority:

        priority_upper = (
            priority.upper()
        )

        projects = [
            project
            for project in projects
            if project["priority"]
            == priority_upper
        ]

    # Highest priority first
    projects.sort(
        key=lambda x: (
            -x["priority_score"],
            x["project_id"],
        )
    )

    total = len(projects)

    offset = (
        page - 1
    ) * page_size

    items = projects[
        offset:
        offset + page_size
    ]

    total_pages = (
        (
            total
            + page_size
            - 1
        )
        // page_size
        if total
        else 0
    )

    return {
        "items": items,
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": total_pages,
    }


# =========================================================
# SINGLE PRIORITY PROJECT
# =========================================================

def get_priority_project(
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

    return project_to_priority(
        db=db,
        project=project,
    )