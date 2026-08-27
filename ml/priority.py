"""
Priority Scoring Engine for Executive Intervention Ranking
Calculates Priority Score = RiskScore * Budget * AffectedFamilies
"""

import pandas as pd
import numpy as np
from backend.database import get_db_connection, execute_query
from ml.features import extract_project_features
from ml.explainability import get_project_shap_values

def get_priority_ranked_projects(user: dict = None, limit: int = 50) -> list:
    """
    Returns priority ranked projects filtered by user's RBAC scope.
    """
    from backend.permissions import apply_rbac_scope
    where_clause, params = apply_rbac_scope(user, query_prefix="p") if user else ("1=1", [])

    query = f"""
    SELECT p.project_id, p.project_name, p.project_type, p.state, p.district,
           p.project_budget, p.affected_families, p.current_stage, p.project_status,
           r.risk_score, r.risk_category, r.delay_probability, r.expected_delay_days
    FROM projects p
    LEFT JOIN (
        SELECT project_id, risk_score, risk_category, delay_probability, expected_delay_days,
               ROW_NUMBER() OVER (PARTITION BY project_id ORDER BY prediction_date DESC) as rn
        FROM risk_history
    ) r ON p.project_id = r.project_id AND r.rn = 1
    WHERE {where_clause}
    ORDER BY r.risk_score DESC, p.project_budget DESC
    LIMIT ?
    """
    params.append(limit)
    rows = execute_query(query, params=tuple(params))

    results = []
    for r in rows:
        r_dict = dict(r)
        risk = r_dict.get("risk_score") or 50
        budget_m = (r_dict.get("project_budget") or 1000000) / 1_000_000.0
        families = r_dict.get("affected_families") or 10

        # Weighted Priority Formula
        priority_score = round(float(risk * (np.log1p(budget_m)) * (np.log1p(families))), 2)
        r_dict["priority_score"] = priority_score

        if priority_score > 300:
            r_dict["priority_level"] = "URGENT INTERVENTION"
        elif priority_score > 150:
            r_dict["priority_level"] = "HIGH PRIORITY"
        else:
            r_dict["priority_level"] = "STANDARD MONITORED"

        results.append(r_dict)

    # Sort by priority score descending
    results = sorted(results, key=lambda x: x["priority_score"], reverse=True)
    return results
