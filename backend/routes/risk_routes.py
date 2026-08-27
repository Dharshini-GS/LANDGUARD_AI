from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..middleware.auth_middleware import get_current_user
from ..models.user import User
from ..services.risk_service import (
    get_project_latest_risk,
    get_project_risk_history,
    get_risk_overview,
    get_risk_projects,
)


router = APIRouter(
    prefix="/api/risk",
    tags=["Risk"]
)


# =========================================================
# RISK OVERVIEW
# =========================================================

@router.get(
    "/overview"
)
def risk_overview(
    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    """
    Return overall risk statistics for the user's
    permitted project scope.
    """

    return get_risk_overview(
        db=db,
        current_user=current_user,
    )


# =========================================================
# RISK PROJECTS
# =========================================================

@router.get(
    "/projects"
)
def risk_projects(
    risk_category: str | None = Query(
        None,
        description="CRITICAL, HIGH, MEDIUM or LOW"
    ),

    min_risk_score: int | None = Query(
        None,
        ge=0,
        le=100
    ),

    page: int = Query(
        1,
        ge=1
    ),

    page_size: int = Query(
        20,
        ge=1,
        le=100
    ),

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    """
    Return latest risk prediction for every accessible
    project, ordered from highest to lowest risk.
    """

    return get_risk_projects(
        db=db,
        current_user=current_user,
        risk_category=risk_category,
        min_risk_score=min_risk_score,
        page=page,
        page_size=page_size,
    )


# =========================================================
# SINGLE PROJECT LATEST RISK
# =========================================================

@router.get(
    "/projects/{project_id}"
)
def project_latest_risk(
    project_id: str,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    """
    Return the latest risk prediction for a project.
    """

    result = get_project_latest_risk(
        db=db,
        current_user=current_user,
        project_id=project_id,
    )

    if result is None:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found or access denied"
        )

    return result


# =========================================================
# PROJECT RISK HISTORY
# =========================================================

@router.get(
    "/projects/{project_id}/history"
)
def project_risk_history(
    project_id: str,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    """
    Return complete historical risk predictions for
    a project.
    """

    result = get_project_risk_history(
        db=db,
        current_user=current_user,
        project_id=project_id,
    )

    if result is None:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found or access denied"
        )

    return result