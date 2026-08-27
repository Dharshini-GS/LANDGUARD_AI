from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from ..database import get_db
from ..middleware.auth_middleware import get_current_user
from ..models.user import User
from ..services.stage_risk_service import (
    get_stage_projects,
    get_stage_risk,
    get_stage_risk_overview,
)


router = APIRouter(
    prefix="/api/stage-risk",
    tags=["Stage Risk"]
)


# =========================================================
# STAGE RISK OVERVIEW
# =========================================================

@router.get("/overview")
def stage_risk_overview(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    ),
):
    """
    Risk aggregation across all lifecycle stages.
    """

    return get_stage_risk_overview(
        db=db,
        current_user=current_user,
    )


# =========================================================
# STAGE PROJECTS
# =========================================================

@router.get("/projects")
def stage_projects(
    stage: str = Query(
        ...,
        description="Lifecycle stage"
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
    Return projects associated with a particular
    highest-risk lifecycle stage.
    """

    return get_stage_projects(
        db=db,
        current_user=current_user,
        stage=stage,
        page=page,
        page_size=page_size,
    )


# =========================================================
# SINGLE STAGE
# =========================================================

@router.get("/{stage}")
def single_stage_risk(
    stage: str,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    """
    Return aggregated risk information for one stage.
    """

    return get_stage_risk(
        db=db,
        current_user=current_user,
        stage=stage,
    )