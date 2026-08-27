from sqlalchemy.orm import (
    Session,
    joinedload,
    selectinload,
)

from ..models.project import Project
from ..models.user import User


# =========================================================
# PROJECT ACCESS / SCOPE
# =========================================================

def apply_user_scope(
    query,
    current_user: User
):
    """
    Apply LandGuard project access rules.

    ADMIN
        National access

    STATE_OFFICER
        Own state

    DISTRICT_OFFICER
        Own state + district

    PROJECT_MANAGER
        Assigned projects only

    ANALYST
        State/district scope

    Unknown role
        No access
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

        if (
            current_user.state
            and current_user.state != "ALL"
        ):
            query = query.filter(
                Project.state == current_user.state
            )

        return query

    # -----------------------------------------------------
    # DISTRICT OFFICER
    # -----------------------------------------------------

    if role == "DISTRICT_OFFICER":

        if (
            current_user.state
            and current_user.state != "ALL"
        ):
            query = query.filter(
                Project.state == current_user.state
            )

        if (
            current_user.district
            and current_user.district != "ALL"
        ):
            query = query.filter(
                Project.district
                == current_user.district
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

        if (
            current_user.state
            and current_user.state != "ALL"
        ):
            query = query.filter(
                Project.state == current_user.state
            )

        if (
            current_user.district
            and current_user.district != "ALL"
        ):
            query = query.filter(
                Project.district
                == current_user.district
            )

        return query

    # -----------------------------------------------------
    # UNKNOWN ROLE
    # -----------------------------------------------------

    return query.filter(
        Project.project_id == "__NO_ACCESS__"
    )


# =========================================================
# LIST PROJECTS
# =========================================================

def get_projects(
    db: Session,
    current_user: User,
    page: int = 1,
    page_size: int = 20,
    state: str | None = None,
    district: str | None = None,
    project_status: str | None = None,
    current_stage: str | None = None,
    project_manager_id: str | None = None,
):
    """
    Return paginated projects accessible to the user.
    """

    page = max(page, 1)

    page_size = min(
        max(page_size, 1),
        100
    )

    # -----------------------------------------------------
    # Base query
    # -----------------------------------------------------

    query = db.query(Project)

    # -----------------------------------------------------
    # Authorization scope
    # -----------------------------------------------------

    query = apply_user_scope(
        query,
        current_user
    )

    # -----------------------------------------------------
    # Filters
    # -----------------------------------------------------

    if state:

        query = query.filter(
            Project.state == state
        )

    if district:

        query = query.filter(
            Project.district == district
        )

    if project_status:

        query = query.filter(
            Project.project_status
            == project_status
        )

    if current_stage:

        query = query.filter(
            Project.current_stage
            == current_stage
        )

    if project_manager_id:

        query = query.filter(
            Project.project_manager_id
            == project_manager_id
        )

    # -----------------------------------------------------
    # Total
    # -----------------------------------------------------

    total = query.count()

    # -----------------------------------------------------
    # Pagination
    # -----------------------------------------------------

    offset = (
        (page - 1)
        * page_size
    )

    projects = (
        query
        .order_by(
            Project.project_id
        )
        .offset(offset)
        .limit(page_size)
        .all()
    )

    # -----------------------------------------------------
    # Total pages
    # -----------------------------------------------------

    total_pages = (
        (
            total
            + page_size
            - 1
        )
        // page_size
        if total > 0
        else 0
    )

    return {
        "items": projects,
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": total_pages,
    }


# =========================================================
# GET SINGLE PROJECT
# =========================================================

def get_project_by_id(
    db: Session,
    current_user: User,
    project_id: str
) -> Project | None:
    """
    Get a single project only if the user has access.
    """

    query = (
        db.query(Project)
        .filter(
            Project.project_id
            == project_id
        )
    )

    query = apply_user_scope(
        query,
        current_user
    )

    return query.first()


# =========================================================
# SERIALIZATION HELPER
# =========================================================

def model_to_dict(
    obj,
    exclude: set[str] | None = None
) -> dict:
    """
    Convert a SQLAlchemy model instance
    into a dictionary.

    Only actual table columns are included.
    Relationships are excluded automatically.
    """

    if obj is None:
        return {}

    exclude = exclude or set()

    return {
        column.name: getattr(
            obj,
            column.name
        )
        for column in obj.__table__.columns
        if column.name not in exclude
    }


# =========================================================
# COMPLETE PROJECT DETAIL
# =========================================================

def get_project_detail(
    db: Session,
    current_user: User,
    project_id: str
) -> dict | None:
    """
    Return complete project information including
    all related LandGuard records.

    Relationships are eager-loaded to avoid excessive
    database round trips.
    """

    # -----------------------------------------------------
    # Build scoped query
    # -----------------------------------------------------

    query = (
        db.query(Project)
        .filter(
            Project.project_id
            == project_id
        )
    )

    query = apply_user_scope(
        query,
        current_user
    )

    # -----------------------------------------------------
    # Eager-load related records
    # -----------------------------------------------------

    query = query.options(

        # Project manager
        joinedload(
            Project.project_manager
        ),

        # One-to-many relationships
        selectinload(
            Project.land_parcels
        ),

        selectinload(
            Project.lifecycle_timeline
        ),

        selectinload(
            Project.compensation
        ),

        selectinload(
            Project.legal_disputes
        ),

        selectinload(
            Project.approvals
        ),

        selectinload(
            Project.documentation
        ),

        selectinload(
            Project.rehabilitation
        ),

        selectinload(
            Project.stakeholders
        ),

        selectinload(
            Project.administrative_performance
        ),

        selectinload(
            Project.risk_history
        ),

        # One-to-one relationships
        joinedload(
            Project.geospatial
        ),

        joinedload(
            Project.outcome
        ),
    )

    project = query.first()

    if not project:
        return None

    # -----------------------------------------------------
    # Return complete detail
    # -----------------------------------------------------

    return {
        "project": model_to_dict(
            project
        ),

        "land_parcels": [
            model_to_dict(item)
            for item in project.land_parcels
        ],

        "lifecycle_timeline": [
            model_to_dict(item)
            for item in project.lifecycle_timeline
        ],

        "compensation": [
            model_to_dict(item)
            for item in project.compensation
        ],

        "legal_disputes": [
            model_to_dict(item)
            for item in project.legal_disputes
        ],

        "approvals": [
            model_to_dict(item)
            for item in project.approvals
        ],

        "documentation": [
            model_to_dict(item)
            for item in project.documentation
        ],

        "rehabilitation": [
            model_to_dict(item)
            for item in project.rehabilitation
        ],

        "stakeholders": [
            model_to_dict(item)
            for item in project.stakeholders
        ],

        "administrative_performance": [
            model_to_dict(item)
            for item in project.administrative_performance
        ],

        "geospatial": (
            model_to_dict(
                project.geospatial
            )
            if project.geospatial
            else None
        ),

        "outcome": (
            model_to_dict(
                project.outcome
            )
            if project.outcome
            else None
        ),

        "risk_history": [
            model_to_dict(item)
            for item in project.risk_history
        ],
    }