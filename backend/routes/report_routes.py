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

from ..services.report_service import (
    get_report_overview,
    get_project_report,
    get_reports,
)


router = APIRouter(
    prefix="/api/reports",
    tags=["Reports"],
)


# =========================================================
# REPORT OVERVIEW
# =========================================================

@router.get("/overview")
def report_overview(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    ),
):
    return get_report_overview(
        db=db,
        current_user=current_user,
    )


# =========================================================
# REPORT LIST
# =========================================================

@router.get("")
def list_reports(
    project_id: str | None = Query(
        None
    ),

    report_type: str | None = Query(
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
    return get_reports(
        db=db,
        current_user=current_user,
        project_id=project_id,
        report_type=report_type,
        page=page,
        page_size=page_size,
    )


# =========================================================
# SINGLE PROJECT REPORT
# =========================================================

@router.get("/projects/{project_id}")
def project_report(
    project_id: str,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    result = get_project_report(
        db=db,
        current_user=current_user,
        project_id=project_id,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Project report not found or access denied",
        )

    return result