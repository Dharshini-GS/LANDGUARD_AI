"""
Stage-Wise Risk and Bottleneck Analyzer
"""

from backend.database import execute_query

def analyze_stage_bottlenecks(user: dict = None) -> dict:
    """
    Analyzes historical delay bottlenecks across all 11 lifecycle stages.
    """
    from backend.permissions import apply_rbac_scope
    where_clause, params = apply_rbac_scope(user, query_prefix="p") if user else ("1=1", [])

    query = f"""
    SELECT t.stage_name,
           COUNT(t.timeline_id) as total_stage_records,
           SUM(CASE WHEN t.stage_status = 'Delayed' THEN 1 ELSE 0 END) as delayed_count,
           SUM(CASE WHEN t.stage_status = 'Completed' THEN 1 ELSE 0 END) as completed_count,
           AVG(t.stage_delay_days) as avg_delay_days,
           MAX(t.stage_delay_days) as max_delay_days
    FROM lifecycle_timeline t
    JOIN projects p ON t.project_id = p.project_id
    WHERE {where_clause}
    GROUP BY t.stage_name
    ORDER BY avg_delay_days DESC
    """
    rows = execute_query(query, tuple(params))

    stages_data = []
    for r in rows:
        r_dict = dict(r)
        tot = r_dict.get("total_stage_records") or 1
        d_cnt = r_dict.get("delayed_count") or 0
        r_dict["delay_frequency_pct"] = round((d_cnt / tot) * 100.0, 1)
        r_dict["avg_delay_days"] = round(r_dict.get("avg_delay_days") or 0.0, 1)
        stages_data.append(r_dict)

    return {
        "stage_bottlenecks": stages_data,
        "primary_bottleneck_stage": stages_data[0]["stage_name"] if stages_data else "Compensation"
    }
