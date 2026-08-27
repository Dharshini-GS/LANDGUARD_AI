from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from ..database import get_db
from ..middleware.auth_middleware import get_current_user
from ..models.user import User

from ..services.simulation_service import (
    run_simulation,
    get_simulation_history,
    get_simulation_by_id,
)


router = APIRouter(
    prefix="/api/simulation",
    tags=["Simulation"],
)


# =========================================================
# REQUEST SCHEMA
# =========================================================

class SimulationRequest(BaseModel):
    project_id: str

    delay_days: int = Field(
        default=0,
        ge=0,
        le=3650,
    )

    compensation_change_percent: float = Field(
        default=0.0,
        ge=-100.0,
        le=1000.0,
    )

    affected_families_change_percent: float = Field(
        default=0.0,
        ge=-100.0,
        le=1000.0,
    )

    legal_dispute_change: int = Field(
        default=0,
        ge=-1000,
        le=1000,
    )


# =========================================================
# RUN SIMULATION
# =========================================================

@router.post("")
def simulate_project(
    payload: SimulationRequest,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    result = run_simulation(
        db=db,
        current_user=current_user,
        project_id=payload.project_id,
        delay_days=payload.delay_days,
        compensation_change_percent=(
            payload.compensation_change_percent
        ),
        affected_families_change_percent=(
            payload.affected_families_change_percent
        ),
        legal_dispute_change=(
            payload.legal_dispute_change
        ),
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Project not found or access denied",
        )

    return result


# =========================================================
# SIMULATION HISTORY
# =========================================================

@router.get("/history")
def simulation_history(
    project_id: str | None = None,

    page: int = 1,

    page_size: int = 20,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    return get_simulation_history(
        db=db,
        current_user=current_user,
        project_id=project_id,
        page=page,
        page_size=page_size,
    )


# =========================================================
# SINGLE SIMULATION
# =========================================================

@router.get("/{simulation_id}")
def simulation(
    simulation_id: str,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    result = get_simulation_by_id(
        db=db,
        current_user=current_user,
        simulation_id=simulation_id,
    )

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Simulation not found or access denied",
        )

    return result