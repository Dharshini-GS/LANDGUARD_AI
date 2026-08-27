"""
Role-Based Access Control (RBAC) & Scope Authorization Engine
"""

def apply_rbac_scope(user: dict, query_prefix: str = "") -> tuple[str, list]:
    """
    Builds SQL WHERE clause conditions based on user's role and geographic scope.
    
    Roles:
    - ADMIN: National scope (no restrictions)
    - STATE_OFFICER: project.state = user.state
    - DISTRICT_OFFICER: project.state = user.state AND project.district = user.district
    - PROJECT_MANAGER: project.project_manager_id = user.user_id
    - ANALYST: National scope if state=='ALL', else project.state = user.state
    """
    role = user.get("role")
    state = user.get("state")
    district = user.get("district")
    user_id = user.get("user_id")

    prefix = f"{query_prefix}." if query_prefix else ""
    conditions = []
    params = []

    if role == "ADMIN":
        pass  # Unrestricted
    elif role == "STATE_OFFICER":
        if state and state != "ALL":
            conditions.append(f"{prefix}state = ?")
            params.append(state)
    elif role == "DISTRICT_OFFICER":
        if state and state != "ALL":
            conditions.append(f"{prefix}state = ?")
            params.append(state)
        if district and district != "ALL":
            conditions.append(f"{prefix}district = ?")
            params.append(district)
    elif role == "PROJECT_MANAGER":
        conditions.append(f"{prefix}project_manager_id = ?")
        params.append(user_id)
    elif role == "ANALYST":
        if state and state != "ALL":
            conditions.append(f"{prefix}state = ?")
            params.append(state)

    where_clause = " AND ".join(conditions) if conditions else "1=1"
    return where_clause, params

def is_project_accessible(user: dict, project: dict) -> bool:
    """Checks if a specific project is accessible under user's RBAC scope."""
    role = user.get("role")
    if role == "ADMIN":
        return True
    elif role == "STATE_OFFICER":
        return project.get("state") == user.get("state")
    elif role == "DISTRICT_OFFICER":
        return project.get("state") == user.get("state") and project.get("district") == user.get("district")
    elif role == "PROJECT_MANAGER":
        return project.get("project_manager_id") == user.get("user_id")
    elif role == "ANALYST":
        return user.get("state") == "ALL" or project.get("state") == user.get("state")
    return False
