"""
Projects API Endpoints with RBAC filtering
"""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from backend.dependencies import get_current_user
from backend.permissions import apply_rbac_scope, is_project_accessible
from backend.database import execute_query
from typing import List, Optional

router = APIRouter()

@router.get("/")
def get_projects(
    state: Optional[str] = None,
    district: Optional[str] = None,
    project_type: Optional[str] = None,
    stage: Optional[str] = None,
    search: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    where_rbac, params = apply_rbac_scope(current_user, query_prefix="p")

    conditions = [where_rbac]
    if state and state != "ALL":
        conditions.append("p.state = ?")
        params.append(state)
    if district and district != "ALL":
        conditions.append("p.district = ?")
        params.append(district)
    if project_type:
        conditions.append("p.project_type = ?")
        params.append(project_type)
    if stage:
        conditions.append("p.current_stage = ?")
        params.append(stage)
    if search:
        conditions.append("(p.project_name LIKE ? OR p.project_id LIKE ?)")
        params.extend([f"%{search}%", f"%{search}%"])

    where_sql = " AND ".join(conditions)
    query = f"SELECT * FROM projects p WHERE {where_sql} ORDER BY p.created_at DESC"

    projects = execute_query(query, params=tuple(params))
    return projects

@router.get("/{project_id}")
def get_project_detail(project_id: str, current_user: dict = Depends(get_current_user)):
    project = execute_query("SELECT * FROM projects WHERE project_id = ?", (project_id,), fetch_one=True)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if not is_project_accessible(current_user, project):
        raise HTTPException(status_code=403, detail="Access denied under your RBAC scope")

    # Fetch Relational Details
    parcels = execute_query("SELECT * FROM land_parcels WHERE project_id = ?", (project_id,))
    timeline = execute_query("SELECT * FROM lifecycle_timeline WHERE project_id = ? ORDER BY planned_start_date ASC", (project_id,))
    compensation = execute_query("SELECT * FROM compensation WHERE project_id = ?", (project_id,), fetch_one=True)
    legal = execute_query("SELECT * FROM legal_disputes WHERE project_id = ?", (project_id,))
    approvals = execute_query("SELECT * FROM approvals WHERE project_id = ?", (project_id,))
    documentation = execute_query("SELECT * FROM documentation WHERE project_id = ?", (project_id,))
    rr = execute_query("SELECT * FROM rehabilitation_rr WHERE project_id = ?", (project_id,), fetch_one=True)
    stakeholders = execute_query("SELECT * FROM stakeholders WHERE project_id = ?", (project_id,))
    admin = execute_query("SELECT * FROM administrative_performance WHERE project_id = ?", (project_id,))
    geo = execute_query("SELECT * FROM project_geospatial WHERE project_id = ?", (project_id,), fetch_one=True)
    risk_history = execute_query("SELECT * FROM risk_history WHERE project_id = ? ORDER BY prediction_date ASC", (project_id,))

    return {
        "project": project,
        "parcels": parcels,
        "timeline": timeline,
        "compensation": compensation,
        "legal_disputes": legal,
        "approvals": approvals,
        "documentation": documentation,
        "rehabilitation_rr": rr,
        "stakeholders": stakeholders,
        "administrative_performance": admin,
        "geospatial": geo,
        "risk_history": risk_history
    }
