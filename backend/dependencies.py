"""
Reusable FastAPI dependencies.
"""

from .database import get_db
from .middleware.auth_middleware import (
    get_current_user,
    require_admin,
    require_state_officer,
    require_district_officer,
    require_project_manager,
    require_analyst,
)

__all__ = [
    "get_db",
    "get_current_user",
    "require_admin",
    "require_state_officer",
    "require_district_officer",
    "require_project_manager",
    "require_analyst",
]