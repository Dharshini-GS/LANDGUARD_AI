"""
Feature Engineering Engine for LANDGUARD AI
Extracts derived, leakage-free risk features from relational SQLite tables.
"""

import pandas as pd
import numpy as np
from backend.database import get_db_connection

FEATURE_COLUMNS = [
    "village_count", "land_area_acres", "affected_families", "total_landowners", "project_budget",
    "parcel_count", "ownership_conflict_ratio", "verified_ownership_pct", "parcel_possession_pct",
    "doc_submission_pct", "doc_verification_pct", "doc_issue_pct",
    "comp_approved_ratio", "comp_disbursed_ratio", "comp_beneficiary_paid_pct", "comp_dispute_count",
    "legal_total_cases", "legal_pending_cases", "legal_pending_ratio", "legal_avg_pending_days", "legal_critical_cases",
    "approval_total_count", "approval_pending_count", "approval_avg_delay_days",
    "rr_family_rehab_pct", "rr_house_completion_pct",
    "stakeholder_response_avg_days", "stakeholder_pending_requests",
    "admin_avg_processing_days", "admin_approval_backlog", "admin_historical_delay_rate", "admin_coordination_score",
    "completed_stage_count", "avg_stage_delay_days"
]

def extract_project_features(project_id: str = None) -> pd.DataFrame:
    """
    Queries relational tables and calculates derived risk features.
    If project_id is None, extracts features for ALL projects.
    """
    conn = get_db_connection()
    try:
        where_p = "WHERE project_id = ?" if project_id else ""
        params_p = (project_id,) if project_id else ()

        # 1. Projects
        df_p = pd.read_sql_query(f"SELECT * FROM projects {where_p}", conn, params=params_p)

        if df_p.empty:
            return pd.DataFrame()

        target_pids = df_p['project_id'].tolist()
        in_pids = ",".join(["?"] * len(target_pids))

        # 2. Land Parcels
        df_parcels = pd.read_sql_query(f"SELECT * FROM land_parcels WHERE project_id IN ({in_pids})", conn, params=target_pids)

        # 3. Lifecycle Timeline
        df_tl = pd.read_sql_query(f"SELECT * FROM lifecycle_timeline WHERE project_id IN ({in_pids})", conn, params=target_pids)

        # 4. Compensation
        df_comp = pd.read_sql_query(f"SELECT * FROM compensation WHERE project_id IN ({in_pids})", conn, params=target_pids)

        # 5. Legal Disputes
        df_leg = pd.read_sql_query(f"SELECT * FROM legal_disputes WHERE project_id IN ({in_pids})", conn, params=target_pids)

        # 6. Approvals
        df_app = pd.read_sql_query(f"SELECT * FROM approvals WHERE project_id IN ({in_pids})", conn, params=target_pids)

        # 7. Documentation
        df_doc = pd.read_sql_query(f"SELECT * FROM documentation WHERE project_id IN ({in_pids})", conn, params=target_pids)

        # 8. R&R
        df_rr = pd.read_sql_query(f"SELECT * FROM rehabilitation_rr WHERE project_id IN ({in_pids})", conn, params=target_pids)

        # 9. Stakeholders
        df_stk = pd.read_sql_query(f"SELECT * FROM stakeholders WHERE project_id IN ({in_pids})", conn, params=target_pids)

        # 10. Administrative Performance
        df_adm = pd.read_sql_query(f"SELECT * FROM administrative_performance WHERE project_id IN ({in_pids})", conn, params=target_pids)

        # Process per project
        rows = []
        for _, p in df_p.iterrows():
            pid = p['project_id']

            # Parcels
            p_parcels = df_parcels[df_parcels['project_id'] == pid]
            n_parcels = len(p_parcels)
            if n_parcels > 0:
                conflict_ratio = p_parcels['ownership_conflict'].mean()
                verified_pct = p_parcels['ownership_verified'].mean() * 100.0
                poss_pct = (p_parcels['possession_status'] == 'Taken').mean() * 100.0
            else:
                conflict_ratio, verified_pct, poss_pct = 0.0, 100.0, 0.0

            # Docs
            p_docs = df_doc[df_doc['project_id'] == pid]
            n_docs = len(p_docs)
            if n_docs > 0:
                doc_sub_pct = p_docs['submitted_flag'].mean() * 100.0
                doc_ver_pct = p_docs['verified_flag'].mean() * 100.0
                doc_iss_pct = p_docs['issue_flag'].mean() * 100.0
            else:
                doc_sub_pct, doc_ver_pct, doc_iss_pct = 100.0, 100.0, 0.0

            # Comp
            p_c = df_comp[df_comp['project_id'] == pid]
            if not p_c.empty:
                c_row = p_c.iloc[0]
                c_app_ratio = c_row['total_approved_amount'] / max(1.0, c_row['total_estimated_amount'])
                c_disb_ratio = c_row['total_disbursed_amount'] / max(1.0, c_row['total_approved_amount'])
                c_ben_pct = (c_row['beneficiaries_paid'] / max(1, c_row['beneficiaries_total'])) * 100.0
                c_disputes = c_row['compensation_dispute_count']
            else:
                c_app_ratio, c_disb_ratio, c_ben_pct, c_disputes = 1.0, 1.0, 100.0, 0

            # Legal
            p_l = df_leg[df_leg['project_id'] == pid]
            l_cases = len(p_l)
            if l_cases > 0:
                l_pend = (p_l['case_status'] != 'Resolved').sum()
                l_pend_ratio = l_pend / l_cases
                l_avg_days = p_l['pending_days'].mean()
                l_crit = (p_l['case_severity'] == 'Critical').sum()
            else:
                l_pend, l_pend_ratio, l_avg_days, l_crit = 0, 0.0, 0.0, 0

            # Approvals
            p_a = df_app[df_app['project_id'] == pid]
            n_app = len(p_a)
            if n_app > 0:
                a_pend = (p_a['approval_status'] != 'Approved').sum()
                a_avg_delay = p_a['delay_days'].mean()
            else:
                a_pend, a_avg_delay = 0, 0.0

            # R&R
            p_rr = df_rr[df_rr['project_id'] == pid]
            if not p_rr.empty:
                rr_row = p_rr.iloc[0]
                rr_rehab_pct = rr_row['rr_completion_percentage']
                rr_house_pct = (rr_row['houses_completed'] / max(1, rr_row['houses_required'])) * 100.0
            else:
                rr_rehab_pct, rr_house_pct = 100.0, 100.0

            # Stakeholders
            p_s = df_stk[df_stk['project_id'] == pid]
            if not p_s.empty:
                stk_resp_days = p_s['response_time_days'].mean()
                stk_pend_req = p_s['pending_requests'].sum()
            else:
                stk_resp_days, stk_pend_req = 10.0, 0

            # Admin
            p_adm = df_adm[df_adm['project_id'] == pid]
            if not p_adm.empty:
                adm_proc_days = p_adm['average_processing_days'].mean()
                adm_backlog = p_adm['approval_backlog'].sum()
                adm_delay_rate = p_adm['historical_delay_rate'].mean()
                adm_coord_score = p_adm['coordination_score'].mean()
            else:
                adm_proc_days, adm_backlog, adm_delay_rate, adm_coordination_score = 30.0, 0, 0.1, 8.0

            # Timeline
            p_t = df_tl[df_tl['project_id'] == pid]
            if not p_t.empty:
                comp_stages = (p_t['stage_status'] == 'Completed').sum()
                avg_stage_delay = p_t[p_t['stage_status'] == 'Completed']['stage_delay_days'].mean()
                if np.isnan(avg_stage_delay): avg_stage_delay = 0.0
            else:
                comp_stages, avg_stage_delay = 0, 0.0

            feat = {
                "project_id": pid,
                "village_count": p['village_count'],
                "land_area_acres": p['land_area_acres'],
                "affected_families": p['affected_families'],
                "total_landowners": p['total_landowners'],
                "project_budget": p['project_budget'],
                "parcel_count": n_parcels,
                "ownership_conflict_ratio": round(conflict_ratio, 4),
                "verified_ownership_pct": round(verified_pct, 2),
                "parcel_possession_pct": round(poss_pct, 2),
                "doc_submission_pct": round(doc_sub_pct, 2),
                "doc_verification_pct": round(doc_ver_pct, 2),
                "doc_issue_pct": round(doc_iss_pct, 2),
                "comp_approved_ratio": round(c_app_ratio, 4),
                "comp_disbursed_ratio": round(c_disb_ratio, 4),
                "comp_beneficiary_paid_pct": round(c_ben_pct, 2),
                "comp_dispute_count": c_disputes,
                "legal_total_cases": l_cases,
                "legal_pending_cases": l_pend,
                "legal_pending_ratio": round(l_pend_ratio, 4),
                "legal_avg_pending_days": round(l_avg_days, 1),
                "legal_critical_cases": l_crit,
                "approval_total_count": n_app,
                "approval_pending_count": a_pend,
                "approval_avg_delay_days": round(a_avg_delay, 1),
                "rr_family_rehab_pct": round(rr_rehab_pct, 2),
                "rr_house_completion_pct": round(rr_house_pct, 2),
                "stakeholder_response_avg_days": round(stk_resp_days, 1),
                "stakeholder_pending_requests": stk_pend_req,
                "admin_avg_processing_days": round(adm_proc_days, 1),
                "admin_approval_backlog": adm_backlog,
                "admin_historical_delay_rate": round(adm_delay_rate, 4),
                "admin_coordination_score": round(adm_coord_score, 2),
                "completed_stage_count": comp_stages,
                "avg_stage_delay_days": round(avg_stage_delay, 1)
            }
            rows.append(feat)

        return pd.DataFrame(rows)
    finally:
        conn.close()
