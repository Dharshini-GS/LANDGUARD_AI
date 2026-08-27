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

from ..services.priority_service import (
    get_priority_overview,
    get_priority_projects,
    get_priority_project,
)


# =========================================================
# ROUTER
# =========================================================

router = APIRouter(
    prefix="/api/priority",
    tags=["Priority"],
)


# =========================================================
# PRIORITY OVERVIEW
# =========================================================

@router.get("/overview")
def priority_overview(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    ),
):
    return get_priority_overview(
        db=db,
        current_user=current_user,
    )


# =========================================================
# PRIORITY PROJECT LIST
# =========================================================

@router.get("/projects")
def priority_projects(
    priority: str | None = Query(
        None
    ),

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
    return get_priority_projects(
        db=db,
        current_user=current_user,
        page=page,
        page_size=page_size,
        priority=priority,
    )


# =========================================================
# SINGLE PROJECT PRIORITY
# =========================================================

@router.get("/projects/{project_id}")
def priority_project(
    project_id: str,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    result = get_priority_project(
        db=db,
        current_user=current_user,
        project_id=project_id,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Project not found or access denied",
        )

    return result