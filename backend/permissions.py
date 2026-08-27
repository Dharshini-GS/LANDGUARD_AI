"""
Permission and role utilities for LandGuard AI.
"""

from fastapi import HTTPException, status

ADMIN = "ADMIN"
STATE_OFFICER = "STATE_OFFICER"
DISTRICT_OFFICER = "DISTRICT_OFFICER"
PROJECT_MANAGER = "PROJECT_MANAGER"
ANALYST = "ANALYST"


def normalize_role(role) -> str:
    if role is None:
        return ""

    return str(role).strip().upper()


def has_role(user, *allowed_roles: str) -> bool:
    if not user:
        return False

    current_role = normalize_role(
        getattr(user, "role", None)
    )

    allowed = {
        normalize_role(role)
        for role in allowed_roles
    }

    return current_role in allowed


def is_admin(user) -> bool:
    return has_role(user, ADMIN)


def is_state_officer(user) -> bool:
    return has_role(user, STATE_OFFICER)


def is_district_officer(user) -> bool:
    return has_role(user, DISTRICT_OFFICER)


def is_project_manager(user) -> bool:
    return has_role(user, PROJECT_MANAGER)


def is_analyst(user) -> bool:
    return has_role(user, ANALYST)


def require_role(user, *allowed_roles: str):
    if not has_role(user, *allowed_roles):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=(
                "Insufficient permissions. "
                f"Required roles: {', '.join(allowed_roles)}"
            ),
        )

    return user


def require_admin_user(user):
    return require_role(user, ADMIN)


def can_access_scope(
    user,
    state: str | None = None,
    district: str | None = None,
) -> bool:
    """
    Check whether a user can access a state/district scope.

    ADMIN users have unrestricted access.
    Other users are restricted by their assigned scope.
    """

    if not user:
        return False

    if is_admin(user):
        return True

    user_state = getattr(user, "state", None)
    user_district = getattr(user, "district", None)

    if (
        state
        and user_state
        and str(user_state).upper() != "ALL"
        and str(state).lower() != str(user_state).lower()
    ):
        return False

    if (
        district
        and user_district
        and str(user_district).upper() != "ALL"
        and str(district).lower() != str(user_district).lower()
    ):
        return False

    return True