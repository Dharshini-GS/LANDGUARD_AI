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

from ..services.model_service import (
    get_model_overview,
    get_model_versions,
    get_model_performance,
    predict_project,
)


router = APIRouter(
    prefix="/api/models",
    tags=["Models"],
)


# =========================================================
# MODEL OVERVIEW
# =========================================================

@router.get("/overview")
def model_overview(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    ),
):
    return get_model_overview(
        db=db,
        current_user=current_user,
    )


# =========================================================
# MODEL VERSIONS
# =========================================================

@router.get("/versions")
def model_versions(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    ),
):
    return get_model_versions(
        db=db,
        current_user=current_user,
    )


# =========================================================
# MODEL PERFORMANCE
# =========================================================

@router.get("/performance")
def model_performance(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    ),
):
    return get_model_performance(
        db=db,
        current_user=current_user,
    )


# =========================================================
# PROJECT PREDICTION
# =========================================================

@router.get(
    "/predict/{project_id}"
)
def project_prediction(
    project_id: str,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    result = predict_project(
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