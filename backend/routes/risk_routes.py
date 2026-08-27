"""
Risk Prediction & Analysis Endpoints
"""

from fastapi import APIRouter, Depends, HTTPException
from backend.dependencies import get_current_user
from backend.database import execute_query
from ml.explainability import get_project_shap_values

router = APIRouter()

@router.get("/{project_id}")
def get_project_risk(project_id: str, current_user: dict = Depends(get_current_user)):
    risk_rec = execute_query(
        "SELECT * FROM risk_history WHERE project_id = ? ORDER BY prediction_date DESC LIMIT 1",
        (project_id,),
        fetch_one=True
    )
    if not risk_rec:
        raise HTTPException(status_code=404, detail="Risk prediction history not found")

    shap_info = get_project_shap_values(project_id)
    return {
        "prediction": risk_rec,
        "shap_explanation": shap_info
    }

@router.get("/summary/overview")
def get_risk_summary(current_user: dict = Depends(get_current_user)):
    from backend.permissions import apply_rbac_scope
    where_sql, params = apply_rbac_scope(current_user, query_prefix="p")

    query = f"""
    SELECT r.risk_category, COUNT(r.risk_history_id) as count
    FROM (
        SELECT project_id, risk_category,
               ROW_NUMBER() OVER (PARTITION BY project_id ORDER BY prediction_date DESC) as rn
        FROM risk_history
    ) r
    JOIN projects p ON r.project_id = p.project_id
    WHERE r.rn = 1 AND {where_sql}
    GROUP BY r.risk_category
    """
    rows = execute_query(query, tuple(params))
    return {r["risk_category"]: r["count"] for r in rows}
