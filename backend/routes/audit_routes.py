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

from ..services.audit_service import (
    get_audit_overview,
    get_audit_logs,
    get_audit_log_by_id,
)


router = APIRouter(
    prefix="/api/audit",
    tags=["Audit"],
)


# =========================================================
# AUDIT OVERVIEW
# =========================================================

@router.get("/overview")
def audit_overview(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    ),
):
    return get_audit_overview(
        db=db,
        current_user=current_user,
    )


# =========================================================
# AUDIT LOGS
# =========================================================

@router.get("/logs")
def audit_logs(
    user_id: str | None = Query(None),
    action: str | None = Query(None),
    entity_type: str | None = Query(None),
    entity_id: str | None = Query(None),
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
    return get_audit_logs(
        db=db,
        current_user=current_user,
        user_id=user_id,
        action=action,
        entity_type=entity_type,
        entity_id=entity_id,
        page=page,
        page_size=page_size,
    )


# =========================================================
# SINGLE AUDIT LOG
# =========================================================

@router.get("/logs/{audit_id}")
def audit_log(
    audit_id: str,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    ),
):
    result = get_audit_log_by_id(
        db=db,
        current_user=current_user,
        audit_id=audit_id,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Audit log not found or access denied",
        )

    return result