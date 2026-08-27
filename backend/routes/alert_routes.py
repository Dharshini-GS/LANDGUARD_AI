from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
    status,
)
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from ..database import get_db
from ..middleware.auth_middleware import get_current_user
from ..models.user import User
from ..services.alert_service import (
    acknowledge_alert,
    create_alert,
    generate_risk_alerts,
    get_alert_by_id,
    get_alert_overview,
    get_alerts,
)


router = APIRouter(
    prefix="/api/alerts",
    tags=["Alerts"]
)


# =========================================================
# REQUEST SCHEMAS
# =========================================================

class CreateAlertRequest(BaseModel):
    project_id: str

    alert_type: str = Field(
        min_length=1,
        max_length=100
    )

    severity: str = Field(
        min_length=1,
        max_length=20
    )

    message: str = Field(
        min_length=1,
        max_length=2000
    )


# =========================================================
# ALERT OVERVIEW
# =========================================================

@router.get("/overview")
def alert_overview(
    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    """
    Return alert statistics for the user's
    permitted project scope.
    """

    return get_alert_overview(
        db=db,
        current_user=current_user,
    )


# =========================================================
# LIST ALERTS
# =========================================================

@router.get("")
def list_alerts(
    severity: str | None = Query(
        None,
        description="CRITICAL, HIGH, MEDIUM or LOW"
    ),

    alert_status: str | None = Query(
        None,
        description="UNREAD, ACKNOWLEDGED or RESOLVED"
    ),

    alert_type: str | None = Query(
        None
    ),

    project_id: str | None = Query(
        None
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
    Return alerts accessible to the authenticated user.
    """

    return get_alerts(
        db=db,
        current_user=current_user,
        severity=severity,
        alert_status=alert_status,
        alert_type=alert_type,
        project_id=project_id,
        page=page,
        page_size=page_size,
    )


# =========================================================
# CREATE MANUAL ALERT
# =========================================================

@router.post(
    "",
    status_code=status.HTTP_201_CREATED
)
def create_new_alert(
    payload: CreateAlertRequest,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    """
    Create a manual alert.

    Only users permitted by the alert service
    can create alerts.
    """

    alert = create_alert(
        db=db,
        current_user=current_user,
        project_id=payload.project_id,
        alert_type=payload.alert_type,
        severity=payload.severity,
        message=payload.message,
    )

    if not alert:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=(
                "You do not have permission to "
                "create alerts for this project"
            ),
        )

    return {
        "alert_id": alert.alert_id,
        "project_id": alert.project_id,
        "alert_type": alert.alert_type,
        "severity": alert.severity,
        "message": alert.message,
        "status": alert.status,
        "created_at": alert.created_at,
    }


# =========================================================
# AUTOMATIC RISK ALERT GENERATION
# =========================================================

@router.post(
    "/generate-risk-alerts"
)
def generate_risk_based_alerts(
    include_medium: bool = Query(
        False,
        description=(
            "Generate alerts for MEDIUM-risk projects "
            "in addition to CRITICAL and HIGH"
        )
    ),

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    """
    Automatically generate alerts from the latest
    risk prediction of every accessible project.

    Default:
        CRITICAL -> alert
        HIGH     -> alert
        MEDIUM   -> ignored
        LOW      -> ignored

    Only ADMIN and STATE_OFFICER users can trigger
    automatic alert generation.
    """

    # -----------------------------------------------------
    # Permission check
    # -----------------------------------------------------

    if current_user.role not in (
        "ADMIN",
        "STATE_OFFICER",
    ):

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=(
                "Only ADMIN and STATE_OFFICER users "
                "can generate risk alerts"
            ),
        )

    # -----------------------------------------------------
    # Generate alerts
    # -----------------------------------------------------

    return generate_risk_alerts(
        db=db,
        current_user=current_user,
        include_medium=include_medium,
    )


# =========================================================
# GET SINGLE ALERT
# =========================================================

@router.get("/{alert_id}")
def get_single_alert(
    alert_id: str,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    """
    Return a single alert.
    """

    alert = get_alert_by_id(
        db=db,
        current_user=current_user,
        alert_id=alert_id,
    )

    if not alert:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found or access denied",
        )

    return alert


# =========================================================
# ACKNOWLEDGE ALERT
# =========================================================

@router.post("/{alert_id}/acknowledge")
def acknowledge_existing_alert(
    alert_id: str,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    """
    Acknowledge an alert.
    """

    result = acknowledge_alert(
        db=db,
        current_user=current_user,
        alert_id=alert_id,
    )

    if not result:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Alert not found or access denied",
        )

    return result