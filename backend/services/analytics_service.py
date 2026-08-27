from sqlalchemy import func
from sqlalchemy.orm import Session

from ..models.project import Project
from ..models.risk_history import RiskHistory
from ..models.user import User


# =========================================================
# ACCESS CONTROL
# =========================================================

def apply_user_scope(query, current_user: User):
    """
    Apply role-based project access to an SQLAlchemy query.
    """

    role = current_user.role

    # ADMIN → National access
    if role == "ADMIN":
        return query

    # STATE OFFICER → State access
    if role == "STATE_OFFICER":
        if current_user.state and current_user.state != "ALL":
            query = query.filter(
                Project.state == current_user.state
            )
        return query

    # DISTRICT OFFICER → District access
    if role == "DISTRICT_OFFICER":
        if current_user.state and current_user.state != "ALL":
            query = query.filter(
                Project.state == current_user.state
            )

        if current_user.district and current_user.district != "ALL":
            query = query.filter(
                Project.district == current_user.district
            )

        return query

    # PROJECT MANAGER → Assigned projects only
    if role == "PROJECT_MANAGER":
        return query.filter(
            Project.project_manager_id == current_user.user_id
        )

    # ANALYST → State/district scope
    if role == "ANALYST":
        if current_user.state and current_user.state != "ALL":
            query = query.filter(
                Project.state == current_user.state
            )

        if current_user.district and current_user.district != "ALL":
            query = query.filter(
                Project.district == current_user.district
            )

        return query

    # Unknown role → no access
    return query.filter(
        Project.project_id == "__NO_ACCESS__"
    )


# =========================================================
# PROJECT QUERY
# =========================================================

def get_scoped_projects(
    db: Session,
    current_user: User
):
    """
    Return a SQLAlchemy query containing only projects
    accessible to the current user.
    """

    query = db.query(Project)

    return apply_user_scope(
        query,
        current_user
    )


# =========================================================
# OVERVIEW ANALYTICS
# =========================================================

def get_overview_analytics(
    db: Session,
    current_user: User
) -> dict:
    """
    Generate dashboard-level analytics for the user's
    permitted project scope.
    """

    query = get_scoped_projects(
        db,
        current_user
    )

    # -----------------------------------------------------
    # Basic counts
    # -----------------------------------------------------

    total_projects = query.count()

    active_projects = query.filter(
        Project.project_status == "Active"
    ).count()

    completed_projects = query.filter(
        Project.project_status == "Completed"
    ).count()

    pending_projects = query.filter(
        Project.project_status == "Pending"
    ).count()

    # -----------------------------------------------------
    # Aggregate project values
    # -----------------------------------------------------

    aggregate = query.with_entities(
        func.coalesce(
            func.sum(Project.land_area_acres),
            0
        ).label("total_land_area"),

        func.coalesce(
            func.sum(Project.affected_families),
            0
        ).label("total_affected_families"),

        func.coalesce(
            func.sum(Project.total_landowners),
            0
        ).label("total_landowners"),

        func.coalesce(
            func.sum(Project.project_budget),
            0
        ).label("total_project_budget"),
    ).first()

    total_land_area = float(
        aggregate.total_land_area or 0
    )

    total_affected_families = int(
        aggregate.total_affected_families or 0
    )

    total_landowners = int(
        aggregate.total_landowners or 0
    )

    total_project_budget = float(
        aggregate.total_project_budget or 0
    )

    # -----------------------------------------------------
    # Projects by status
    # -----------------------------------------------------

    status_rows = (
        query.with_entities(
            Project.project_status,
            func.count(Project.project_id)
        )
        .group_by(Project.project_status)
        .all()
    )

    projects_by_status = {
        str(status_name): int(count)
        for status_name, count in status_rows
    }

    # -----------------------------------------------------
    # Projects by stage
    # -----------------------------------------------------

    stage_rows = (
        query.with_entities(
            Project.current_stage,
            func.count(Project.project_id)
        )
        .group_by(Project.current_stage)
        .all()
    )

    projects_by_stage = {
        str(stage_name): int(count)
        for stage_name, count in stage_rows
    }

    # -----------------------------------------------------
    # Projects by state
    # -----------------------------------------------------

    state_rows = (
        query.with_entities(
            Project.state,
            func.count(Project.project_id)
        )
        .group_by(Project.state)
        .order_by(
            func.count(Project.project_id).desc()
        )
        .all()
    )

    projects_by_state = {
        str(state_name): int(count)
        for state_name, count in state_rows
    }

    # -----------------------------------------------------
    # Risk distribution
    #
    # Use latest risk record for each project.
    # -----------------------------------------------------

    scoped_project_ids = query.with_entities(
        Project.project_id
    ).subquery()

    latest_risk_subquery = (
        db.query(
            RiskHistory.project_id,
            func.max(
                RiskHistory.prediction_date
            ).label("latest_date")
        )
        .filter(
            RiskHistory.project_id.in_(
                db.query(
                    scoped_project_ids.c.project_id
                )
            )
        )
        .group_by(
            RiskHistory.project_id
        )
        .subquery()
    )

    risk_rows = (
        db.query(
            RiskHistory.risk_category,
            func.count(RiskHistory.risk_history_id)
        )
        .join(
            latest_risk_subquery,
            (
                RiskHistory.project_id
                == latest_risk_subquery.c.project_id
            )
            & (
                RiskHistory.prediction_date
                == latest_risk_subquery.c.latest_date
            )
        )
        .group_by(
            RiskHistory.risk_category
        )
        .all()
    )

    risk_distribution = {
        str(category): int(count)
        for category, count in risk_rows
    }

    # -----------------------------------------------------
    # Return dashboard payload
    # -----------------------------------------------------

    return {
        "total_projects": total_projects,
        "active_projects": active_projects,
        "completed_projects": completed_projects,
        "pending_projects": pending_projects,

        "total_land_area_acres": round(
            total_land_area,
            2
        ),

        "total_affected_families":
            total_affected_families,

        "total_landowners":
            total_landowners,

        "total_project_budget":
            round(
                total_project_budget,
                2
            ),

        "projects_by_status":
            projects_by_status,

        "projects_by_stage":
            projects_by_stage,

        "projects_by_state":
            projects_by_state,

        "risk_distribution":
            risk_distribution,
    }