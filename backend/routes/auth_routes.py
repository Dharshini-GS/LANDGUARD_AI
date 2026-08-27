from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy.orm import Session

from ..database import get_db
from ..middleware.auth_middleware import get_current_user
from ..models.user import User
from ..services.auth_service import (
    authenticate_user,
    create_access_token,
)


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)


# ---------------------------------------------------------
# Response schemas
# ---------------------------------------------------------

class TokenResponse(BaseModel):
    access_token: str
    token_type: str
    user_id: str
    username: str
    full_name: str
    role: str
    state: str
    district: str


class CurrentUserResponse(BaseModel):
    user_id: str
    username: str
    full_name: str
    role: str
    state: str
    district: str
    status: str


# ---------------------------------------------------------
# Login
# ---------------------------------------------------------

@router.post(
    "/login",
    response_model=TokenResponse
)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    user = authenticate_user(
        db,
        form_data.username,
        form_data.password
    )

    if not user:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={
                "WWW-Authenticate": "Bearer"
            }
        )

    access_token = create_access_token(user)

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        user_id=user.user_id,
        username=user.username,
        full_name=user.full_name,
        role=user.role,
        state=user.state,
        district=user.district,
    )


# ---------------------------------------------------------
# Current user
# ---------------------------------------------------------

@router.get(
    "/me",
    response_model=CurrentUserResponse
)
def get_me(
    current_user: User = Depends(get_current_user)
):

    return CurrentUserResponse(
        user_id=current_user.user_id,
        username=current_user.username,
        full_name=current_user.full_name,
        role=current_user.role,
        state=current_user.state,
        district=current_user.district,
        status=current_user.status,
    )