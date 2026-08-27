"""
Authentication API Endpoints
"""

from fastapi import APIRouter, HTTPException, Depends, status
from backend.schemas import LoginRequest, TokenResponse, UserProfile
from backend.auth import authenticate_user
from backend.dependencies import get_current_user
from security.tokens import create_access_token

router = APIRouter()

@router.post("/login", response_model=TokenResponse)
def login(req: LoginRequest):
    user = authenticate_user(req.username, req.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    token = create_access_token(data={"sub": user["user_id"]})
    return {"access_token": token, "token_type": "bearer", "user": user}

@router.get("/me", response_model=UserProfile)
def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
