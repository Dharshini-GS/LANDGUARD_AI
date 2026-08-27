from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
)
from sqlalchemy.orm import Session

from ..database import get_db
from ..middleware.auth_middleware import get_current_user
from ..models.user import User

from ..services.gis_service import (
    get_gis_overview,
    get_project_gis,
    get_gis_projects,
)


router = APIRouter(
    prefix="/api/gis",
    tags=["GIS"],
)


# =========================================================
# GIS OVERVIEW
# =========================================================

@router.get("/overview")
def gis_overview(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    ),
):
    return get_gis_overview(
        db=db,
        current_user=current_user,
    )


# =========================================================
# GIS PROJECTS
# =========================================================

@router.get("/projects")
def gis_projects(
    state: str | None = Query(None),
    district: str | None = Query(None),

    page: int = Query(
        1,
        ge=1,
    ),

    page_size: int = Query(
        20,
        ge=1,
        le=100,
    ),

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    return get_gis_projects(
        db=db,
        current_user=current_user,
        state=state,
        district=district,
        page=page,
        page_size=page_size,
    )


# =========================================================
# SINGLE PROJECT GIS
# =========================================================

@router.get("/projects/{project_id}")
def project_gis(
    project_id: str,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    result = get_project_gis(
        db=db,
        current_user=current_user,
        project_id=project_id,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Project GIS data not found or access denied",
        )

    return result