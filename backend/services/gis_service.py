from sqlalchemy.orm import Session

from ..models.project import Project
from ..models.geospatial import ProjectGeospatial
from ..models.user import User


# =========================================================
# ACCESS CONTROL
# =========================================================

def apply_project_scope(
    query,
    current_user: User,
):
    """
    Restrict GIS information according to the
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
# SERIALIZE GIS DATA
# =========================================================

def geospatial_to_dict(
    project: Project,
    geospatial: ProjectGeospatial | None,
) -> dict:

    result = {
        "project_id": project.project_id,
        "project_name": project.project_name,
        "project_type": project.project_type,
        "state": project.state,
        "district": project.district,
        "current_stage": project.current_stage,
        "project_status": project.project_status,
        "geospatial_available": (
            geospatial is not None
        ),
    }

    if geospatial is None:
        result["geospatial"] = None
        return result

    data = {}

    # Dynamically expose model columns.
    # This keeps the service compatible with the
    # existing database model without assuming
    # a particular GIS schema.
    for column in ProjectGeospatial.__table__.columns:

        name = column.name

        if name == "project_id":
            continue

        data[name] = getattr(
            geospatial,
            name,
            None,
        )

    result["geospatial"] = data

    return result


# =========================================================
# GET GIS OVERVIEW
# =========================================================

def get_gis_overview(
    db: Session,
    current_user: User,
):

    query = db.query(
        Project,
        ProjectGeospatial,
    ).outerjoin(
        ProjectGeospatial,
        Project.project_id
        == ProjectGeospatial.project_id,
    )

    query = apply_project_scope(
        query,
        current_user,
    )

    rows = query.all()

    total_projects = len(rows)

    projects_with_gis = sum(
        1
        for project, geospatial in rows
        if geospatial is not None
    )

    projects_without_gis = (
        total_projects
        - projects_with_gis
    )

    by_state = {}

    for project, geospatial in rows:

        state = project.state

        if state not in by_state:
            by_state[state] = {
                "total_projects": 0,
                "with_geospatial": 0,
            }

        by_state[state][
            "total_projects"
        ] += 1

        if geospatial is not None:
            by_state[state][
                "with_geospatial"
            ] += 1

    return {
        "total_projects": total_projects,
        "projects_with_gis": projects_with_gis,
        "projects_without_gis": projects_without_gis,
        "coverage_percentage": round(
            (
                projects_with_gis
                / total_projects
                * 100
            )
            if total_projects
            else 0,
            2,
        ),
        "by_state": by_state,
    }


# =========================================================
# LIST GIS PROJECTS
# =========================================================

def get_gis_projects(
    db: Session,
    current_user: User,
    state: str | None = None,
    district: str | None = None,
    page: int = 1,
    page_size: int = 20,
):

    query = db.query(
        Project,
        ProjectGeospatial,
    ).outerjoin(
        ProjectGeospatial,
        Project.project_id
        == ProjectGeospatial.project_id,
    )

    query = apply_project_scope(
        query,
        current_user,
    )

    if state:
        query = query.filter(
            Project.state == state
        )

    if district:
        query = query.filter(
            Project.district == district
        )

    total = query.count()

    offset = (
        page - 1
    ) * page_size

    rows = (
        query
        .order_by(Project.project_id)
        .offset(offset)
        .limit(page_size)
        .all()
    )

    items = [
        geospatial_to_dict(
            project,
            geospatial,
        )
        for project, geospatial in rows
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
# SINGLE PROJECT GIS
# =========================================================

def get_project_gis(
    db: Session,
    current_user: User,
    project_id: str,
):

    query = db.query(
        Project,
        ProjectGeospatial,
    ).outerjoin(
        ProjectGeospatial,
        Project.project_id
        == ProjectGeospatial.project_id,
    ).filter(
        Project.project_id == project_id
    )

    query = apply_project_scope(
        query,
        current_user,
    )

    row = query.first()

    if not row:
        return None

    project, geospatial = row

    return geospatial_to_dict(
        project,
        geospatial,
    )