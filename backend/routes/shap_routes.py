from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from ..database import get_db
from ..middleware.auth_middleware import get_current_user
from ..models.user import User

from ..services.shap_service import (
    get_project_shap,
    get_shap_overview,
)


router = APIRouter(
    prefix="/api/shap",
    tags=["SHAP"],
)


# =========================================================
# SHAP OVERVIEW
# =========================================================

@router.get("/overview")
def shap_overview(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    ),
):
    return get_shap_overview(
        db=db,
        current_user=current_user,
    )


# =========================================================
# PROJECT EXPLANATION
# =========================================================

@router.get(
    "/projects/{project_id}"
)
def project_shap(
    project_id: str,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    result = get_project_shap(
        db=db,
        current_user=current_user,
        project_id=project_id,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail=(
                "Project not found "
                "or access denied"
            ),
        )

    return result