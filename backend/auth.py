"""
Authentication service for login and token verification
"""

from backend.database import execute_query
from security.password import verify_password
from security.tokens import create_access_token, decode_access_token

def authenticate_user(username: str, password: str) -> dict:
    """Authenticates username and password against users table."""
    user = execute_query(
        "SELECT * FROM users WHERE username = ? AND status = 'Active'",
        params=(username,),
        fetch_one=True
    )
    if not user:
        return None
    if verify_password(password, user["password_hash"]):
        # Return user dict without password_hash
        user_dict = dict(user)
        user_dict.pop("password_hash", None)
        return user_dict
    return None

def get_user_by_id(user_id: str) -> dict:
    """Gets active user profile by ID."""
    user = execute_query(
        "SELECT user_id, username, full_name, role, state, district, status, created_at FROM users WHERE user_id = ?",
        params=(user_id,),
        fetch_one=True
    )
    return dict(user) if user else None
