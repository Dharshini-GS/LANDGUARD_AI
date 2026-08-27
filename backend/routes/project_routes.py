from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database import get_db
from ..middleware.auth_middleware import get_current_user
from ..models.project import Project
from ..models.user import User
from ..services.project_service import (
    get_project_by_id,
    get_project_detail,
    get_projects,
)


router = APIRouter(
    prefix="/api/projects",
    tags=["Projects"]
)


# =========================================================
# RESPONSE SCHEMAS
# =========================================================

class RelatedRecords(BaseModel):
    land_parcels: int
    lifecycle_timeline: int
    legal_disputes: int
    approvals: int
    documentation: int
    rehabilitation: int
    stakeholders: int
    administrative_performance: int
    risk_history: int
    geospatial: bool
    outcome: bool


class ProjectSummaryResponse(BaseModel):
    project_id: str
    project_name: str
    project_type: str

    state: str
    district: str

    project_manager_id: str | None

    village_count: int
    land_area_acres: float
    affected_families: int
    total_landowners: int
    project_budget: float

    planned_start_date: str
    planned_completion_date: str

    current_stage: str
    project_status: str

    created_at: str
    updated_at: str

    related_records: RelatedRecords


class ProjectListResponse(BaseModel):
    items: list[ProjectSummaryResponse]

    page: int
    page_size: int
    total: int
    total_pages: int


# =========================================================
# PROJECT SUMMARY HELPER
# =========================================================

def project_to_summary(
    project: Project
) -> dict:
    """
    Convert SQLAlchemy Project object into API response.
    """

    return {
        "project_id": project.project_id,
        "project_name": project.project_name,
        "project_type": project.project_type,

        "state": project.state,
        "district": project.district,

        "project_manager_id": project.project_manager_id,

        "village_count": project.village_count,
        "land_area_acres": project.land_area_acres,
        "affected_families": project.affected_families,
        "total_landowners": project.total_landowners,
        "project_budget": project.project_budget,

        "planned_start_date": project.planned_start_date,
        "planned_completion_date": project.planned_completion_date,

        "current_stage": project.current_stage,
        "project_status": project.project_status,

        "created_at": project.created_at,
        "updated_at": project.updated_at,

        "related_records": {
            "land_parcels": len(project.land_parcels),
            "lifecycle_timeline": len(
                project.lifecycle_timeline
            ),
            "legal_disputes": len(
                project.legal_disputes
            ),
            "approvals": len(
                project.approvals
            ),
            "documentation": len(
                project.documentation
            ),
            "rehabilitation": len(
                project.rehabilitation
            ),
            "stakeholders": len(
                project.stakeholders
            ),
            "administrative_performance": len(
                project.administrative_performance
            ),
            "risk_history": len(
                project.risk_history
            ),
            "geospatial": (
                project.geospatial is not None
            ),
            "outcome": (
                project.outcome is not None
            ),
        },
    }


# =========================================================
# LIST PROJECTS
# =========================================================

@router.get(
    "",
    response_model=ProjectListResponse
)
def list_projects(
    page: int = Query(
        1,
        ge=1
    ),

    page_size: int = Query(
        20,
        ge=1,
        le=100
    ),

    state: str | None = Query(
        None
    ),

    district: str | None = Query(
        None
    ),

    project_status: str | None = Query(
        None
    ),

    current_stage: str | None = Query(
        None
    ),

    project_manager_id: str | None = Query(
        None
    ),

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):

    result = get_projects(
        db=db,
        current_user=current_user,
        page=page,
        page_size=page_size,
        state=state,
        district=district,
        project_status=project_status,
        current_stage=current_stage,
        project_manager_id=project_manager_id,
    )

    items = [
        project_to_summary(project)
        for project in result["items"]
    ]

    return {
        "items": items,
        "page": result["page"],
        "page_size": result["page_size"],
        "total": result["total"],
        "total_pages": result["total_pages"],
    }


# =========================================================
# COMPLETE PROJECT DETAIL
#
# IMPORTANT:
# This route MUST come before /{project_id}
# =========================================================

@router.get(
    "/{project_id}/detail"
)
def get_complete_project_detail(
    project_id: str,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    """
    Return complete project information including
    all related LandGuard records.
    """

    result = get_project_detail(
        db=db,
        current_user=current_user,
        project_id=project_id,
    )

    if not result:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found or access denied"
        )

    return result


# =========================================================
# GET SINGLE PROJECT SUMMARY
# =========================================================

@router.get(
    "/{project_id}",
    response_model=ProjectSummaryResponse
)
def get_project(
    project_id: str,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):

    project = get_project_by_id(
        db=db,
        current_user=current_user,
        project_id=project_id,
    )

    if not project:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found or access denied"
        )

    return project_to_summary(project)