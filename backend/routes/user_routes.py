from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from ..database import get_db
from ..middleware.auth_middleware import get_current_user
from ..models.user import User
from ..services.user_service import (
    get_users,
    get_user,
    create_user,
    update_user,
    user_overview,
)


router = APIRouter(
    prefix="/api/users",
    tags=["Users"],
)


class CreateUserRequest(BaseModel):
    user_id: str = Field(min_length=1, max_length=50)
    username: str = Field(min_length=1, max_length=100)
    password: str = Field(min_length=8, max_length=200)
    full_name: str = Field(min_length=1, max_length=255)
    role: str = Field(min_length=1, max_length=50)
    state: str = Field(min_length=1, max_length=100)
    district: str = Field(min_length=1, max_length=100)
    status: str = Field(default="Active", max_length=50)


class UpdateUserRequest(BaseModel):
    full_name: str | None = Field(default=None, max_length=255)
    password: str | None = Field(default=None, min_length=8, max_length=200)
    role: str | None = Field(default=None, max_length=50)
    state: str | None = Field(default=None, max_length=100)
    district: str | None = Field(default=None, max_length=100)
    status: str | None = Field(default=None, max_length=50)


@router.get("/overview")
def get_users_overview(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return user_overview(
        db=db,
        current_user=current_user,
    )


@router.get("/me")
def get_current_user_profile(
    current_user: User = Depends(get_current_user),
):
    return {
        "user_id": current_user.user_id,
        "username": current_user.username,
        "full_name": current_user.full_name,
        "role": current_user.role,
        "state": current_user.state,
        "district": current_user.district,
        "status": current_user.status,
        "created_at": current_user.created_at,
    }


@router.get("")
def list_users(
    role: str | None = Query(None),
    state: str | None = Query(None),
    district: str | None = Query(None),
    user_status: str | None = Query(None, alias="status"),
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return get_users(
        db=db,
        current_user=current_user,
        page=page,
        page_size=page_size,
        role=role,
        state=state,
        district=district,
        user_status=user_status,
    )


@router.get("/{user_id}")
def get_single_user(
    user_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    result = get_user(
        db=db,
        current_user=current_user,
        user_id=user_id,
    )

    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found or access denied",
        )

    return result


@router.post("", status_code=status.HTTP_201_CREATED)
def create_new_user(
    payload: CreateUserRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    try:
        result = create_user(
            db=db,
            current_user=current_user,
            data=payload.model_dump(),
        )

    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(exc),
        )

    if not result:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )

    return result


@router.patch("/{user_id}")
def update_existing_user(
    user_id: str,
    payload: UpdateUserRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    result = update_user(
        db=db,
        current_user=current_user,
        user_id=user_id,
        data=payload.model_dump(exclude_unset=True),
    )

    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found or access denied",
        )

    return result
