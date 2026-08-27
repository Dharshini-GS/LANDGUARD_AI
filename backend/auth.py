"""
Backward-compatible authentication helpers.

The actual authentication implementation lives in
services/auth_service.py. This module re-exports the
public authentication functions so older modules can
continue importing from backend.auth.
"""

from .services.auth_service import (
    authenticate_user,
    create_access_token,
    decode_access_token,
    get_user_by_id,
    get_user_by_username,
    hash_password,
    verify_password,
)

__all__ = [
    "authenticate_user",
    "create_access_token",
    "decode_access_token",
    "get_user_by_id",
    "get_user_by_username",
    "hash_password",
    "verify_password",
]