from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from ..database import get_db
from ..models.user import User
from ..services.auth_service import decode_access_token


security = HTTPBearer()


# ---------------------------------------------------------
# Get current authenticated user
# ---------------------------------------------------------

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> User:

    token = credentials.credentials

    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired authentication token",
            headers={
                "WWW-Authenticate": "Bearer"
            }
        )

    user_id = payload.get("sub")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication token",
            headers={
                "WWW-Authenticate": "Bearer"
            }
        )

    user = (
        db.query(User)
        .filter(User.user_id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
            headers={
                "WWW-Authenticate": "Bearer"
            }
        )

    if user.status.lower() != "active":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )

    return user


# ---------------------------------------------------------
# Role authorization
# ---------------------------------------------------------

def require_roles(
    *allowed_roles: str
):

    def role_checker(
        current_user: User = Depends(get_current_user)
    ) -> User:

        if current_user.role not in allowed_roles:

            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=(
                    "Insufficient permissions. "
                    f"Required roles: {', '.join(allowed_roles)}"
                )
            )

        return current_user

    return role_checker


# ---------------------------------------------------------
# Individual role dependencies
# ---------------------------------------------------------

require_admin = require_roles(
    "ADMIN"
)

require_state_officer = require_roles(
    "STATE_OFFICER"
)

require_district_officer = require_roles(
    "DISTRICT_OFFICER"
)

require_project_manager = require_roles(
    "PROJECT_MANAGER"
)

require_analyst = require_roles(
    "ANALYST"
)