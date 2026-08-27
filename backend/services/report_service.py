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
    """
    Restrict report access according to the
    authenticated user's state and district.
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
# PROJECT REPORT
# =========================================================

def build_project_report(
    db: Session,
    project: Project,
) -> dict:

    risk = get_latest_risk(
        db=db,
        project_id=project.project_id,
    )

    report = {
        "project": {
            "project_id": project.project_id,
            "project_name": project.project_name,
            "project_type": project.project_type,
            "state": project.state,
            "district": project.district,
            "project_manager_id":
                project.project_manager_id,
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
            "planned_start_date":
                project.planned_start_date,
            "planned_completion_date":
                project.planned_completion_date,
            "current_stage":
                project.current_stage,
            "project_status":
                project.project_status,
            "created_at":
                project.created_at,
            "updated_at":
                project.updated_at,
        },
        "risk": None,
        "related_records": {
            "land_parcels":
                len(project.land_parcels),
            "lifecycle_timeline":
                len(project.lifecycle_timeline),
            "legal_disputes":
                len(project.legal_disputes),
            "approvals":
                len(project.approvals),
            "documentation":
                len(project.documentation),
            "rehabilitation":
                len(project.rehabilitation),
            "stakeholders":
                len(project.stakeholders),
            "administrative_performance":
                len(
                    project.administrative_performance
                ),
            "risk_history":
                len(project.risk_history),
            "geospatial":
                project.geospatial is not None,
            "outcome":
                project.outcome is not None,
        },
    }

    if risk:
        report["risk"] = {
            "risk_history_id":
                risk.risk_history_id,
            "prediction_date":
                risk.prediction_date,
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
            "model_version":
                risk.model_version,
        }

    return report


# =========================================================
# GET REPORT OVERVIEW
# =========================================================

def get_report_overview(
    db: Session,
    current_user: User,
):
    query = db.query(Project)

    query = apply_project_scope(
        query,
        current_user,
    )

    projects = query.all()

    total_projects = len(projects)

    active_projects = sum(
        1
        for project in projects
        if str(
            project.project_status
        ).upper() == "ACTIVE"
    )

    completed_projects = sum(
        1
        for project in projects
        if str(
            project.project_status
        ).upper() == "COMPLETED"
    )

    cancelled_projects = sum(
        1
        for project in projects
        if str(
            project.project_status
        ).upper() == "CANCELLED"
    )

    on_hold_projects = sum(
        1
        for project in projects
        if str(
            project.project_status
        ).upper() == "ON HOLD"
    )

    total_budget = sum(
        float(
            project.project_budget or 0
        )
        for project in projects
    )

    total_land_area = sum(
        float(
            project.land_area_acres or 0
        )
        for project in projects
    )

    total_affected_families = sum(
        int(
            project.affected_families or 0
        )
        for project in projects
    )

    total_landowners = sum(
        int(
            project.total_landowners or 0
        )
        for project in projects
    )

    return {
        "total_projects":
            total_projects,

        "active_projects":
            active_projects,

        "completed_projects":
            completed_projects,

        "cancelled_projects":
            cancelled_projects,

        "on_hold_projects":
            on_hold_projects,

        "total_project_budget":
            total_budget,

        "total_land_area_acres":
            total_land_area,

        "total_affected_families":
            total_affected_families,

        "total_landowners":
            total_landowners,
    }


# =========================================================
# LIST REPORTS
# =========================================================

def get_reports(
    db: Session,
    current_user: User,
    project_id: str | None = None,
    report_type: str | None = None,
    page: int = 1,
    page_size: int = 20,
):
    query = db.query(Project)

    query = apply_project_scope(
        query,
        current_user,
    )

    if project_id:
        query = query.filter(
            Project.project_id == project_id
        )

    total = query.count()

    offset = (
        page - 1
    ) * page_size

    projects = (
        query
        .order_by(Project.project_id)
        .offset(offset)
        .limit(page_size)
        .all()
    )

    items = []

    for project in projects:

        report = build_project_report(
            db=db,
            project=project,
        )

        if report_type:
            report["report_type"] = (
                report_type
            )
        else:
            report["report_type"] = (
                "PROJECT_SUMMARY"
            )

        items.append(report)

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
# SINGLE PROJECT REPORT
# =========================================================

def get_project_report(
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

    return build_project_report(
        db=db,
        project=project,
    )