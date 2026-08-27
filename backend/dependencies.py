"""
FastAPI Dependency Injections for Authentication & Authorization
"""

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from security.tokens import decode_access_token
from backend.auth import get_user_by_id

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    """Dependency to validate JWT bearer token and inject current user profile."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    payload = decode_access_token(token)
    if payload is None:
        raise credentials_exception
    user_id: str = payload.get("sub")
    if user_id is None:
        raise credentials_exception
    user = get_user_by_id(user_id)
    if user is None:
        raise credentials_exception
    return user
