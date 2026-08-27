from datetime import datetime, timedelta, timezone

import bcrypt
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from ..config import settings
from ..models.user import User


# =========================================================
# JWT CONFIGURATION
# =========================================================

SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES


# =========================================================
# PASSWORD FUNCTIONS
# =========================================================

def verify_password(
    plain_password: str,
    hashed_password: str
) -> bool:
    """
    Verify a plain-text password against a stored bcrypt hash.
    """

    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            hashed_password.encode("utf-8")
        )
    except (ValueError, TypeError):
        return False


def hash_password(
    password: str
) -> str:
    """
    Hash a password using bcrypt.

    bcrypt only supports passwords up to 72 bytes.
    """

    password_bytes = password.encode("utf-8")

    if len(password_bytes) > 72:
        raise ValueError(
            "Password cannot be longer than 72 bytes when using bcrypt."
        )

    hashed_password = bcrypt.hashpw(
        password_bytes,
        bcrypt.gensalt()
    )

    return hashed_password.decode("utf-8")


# =========================================================
# USER LOOKUP
# =========================================================

def get_user_by_username(
    db: Session,
    username: str
) -> User | None:
    """
    Find a user by username.
    """

    return (
        db.query(User)
        .filter(User.username == username)
        .first()
    )


def get_user_by_id(
    db: Session,
    user_id: str
) -> User | None:
    """
    Find a user by user ID.
    """

    return (
        db.query(User)
        .filter(User.user_id == user_id)
        .first()
    )


# =========================================================
# AUTHENTICATION
# =========================================================

def authenticate_user(
    db: Session,
    username: str,
    password: str
) -> User | None:
    """
    Authenticate a user using username and password.

    Returns:
        User object if authentication succeeds.
        None if authentication fails.
    """

    user = get_user_by_username(
        db,
        username
    )

    # User does not exist
    if not user:
        return None

    # Verify password
    if not verify_password(
        password,
        user.password_hash
    ):
        return None

    # Check account status
    if not user.status:
        return None

    if user.status.lower() != "active":
        return None

    return user


# =========================================================
# JWT CREATION
# =========================================================

def create_access_token(
    user: User
) -> str:
    """
    Create a JWT access token for an authenticated user.
    """

    expire = (
        datetime.now(timezone.utc)
        + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    payload = {
        "sub": user.user_id,
        "username": user.username,
        "role": user.role,
        "state": user.state,
        "district": user.district,
        "exp": expire,
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )


# =========================================================
# JWT DECODING
# =========================================================

def decode_access_token(
    token: str
) -> dict | None:
    """
    Decode and validate a JWT access token.

    Returns:
        Decoded payload if valid.
        None if invalid/expired.
    """

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload

    except JWTError:
        return None