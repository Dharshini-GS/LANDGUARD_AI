from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import get_db
from ..middleware.auth_middleware import get_current_user
from ..models.user import User
from ..services.analytics_service import (
    get_overview_analytics,
)


router = APIRouter(
    prefix="/api/analytics",
    tags=["Analytics"]
)


# =========================================================
# DASHBOARD OVERVIEW
# =========================================================

@router.get(
    "/overview"
)
def analytics_overview(
    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    """
    Return dashboard analytics based on the
    authenticated user's access scope.
    """

    return get_overview_analytics(
        db=db,
        current_user=current_user,
    )