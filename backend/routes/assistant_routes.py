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

from ..services.assistant_service import (
    get_assistant_overview,
    answer_project_question,
)


router = APIRouter(
    prefix="/api/assistant",
    tags=["Assistant"],
)


# =========================================================
# REQUEST SCHEMA
# =========================================================

class AssistantQuestion(BaseModel):
    project_id: str = Field(
        min_length=1,
        max_length=50,
    )

    question: str = Field(
        min_length=1,
        max_length=2000,
    )


# =========================================================
# ASSISTANT OVERVIEW
# =========================================================

@router.get("/overview")
def assistant_overview(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(
        get_db
    ),
):
    return get_assistant_overview(
        db=db,
        current_user=current_user,
    )


# =========================================================
# ASK ASSISTANT
# =========================================================

@router.post("/ask")
def ask_assistant(
    payload: AssistantQuestion,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),
):
    result = answer_project_question(
        db=db,
        current_user=current_user,
        project_id=payload.project_id,
        question=payload.question,
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
