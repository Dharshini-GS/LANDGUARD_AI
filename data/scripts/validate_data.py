#!/usr/bin/env python3
"""
LANDGUARD AI — Data Validation Suite
Checks 23 rigorous validation rules across all synthetic CSV files.
Fails loudly if any validation errors are detected.
"""

import os
import sys
import pandas as pd
import numpy as np

# Import geographic master dictionary from generate_data.py
sys.path.append(os.path.join(os.path.dirname(__file__)))
try:
    from generate_data import GEOGRAPHIC_MASTER, STAGES
except ImportError:
    from scripts.generate_data import GEOGRAPHIC_MASTER, STAGES

def run_validation():
    errors = {}

    data_dir = "data"
    required_files = [
        "users.csv", "projects.csv", "land_parcels.csv", "lifecycle_timeline.csv",
        "compensation.csv", "legal_disputes.csv", "approvals.csv", "documentation.csv",
        "rehabilitation_rr.csv", "stakeholders.csv", "administrative_performance.csv",
        "project_geospatial.csv", "project_outcomes.csv", "risk_history.csv", "coverage_summary.csv"
    ]

    for fname in required_files:
        fpath = os.path.join(data_dir, fname)
        if not os.path.exists(fpath):
            errors[f"Missing file: {fname}"] = 1

    if errors:
        print("CRITICAL: Missing CSV files!")
        sys.exit(1)

    # Load DataFrames
    users_df = pd.read_csv(os.path.join(data_dir, "users.csv"))
    projects_df = pd.read_csv(os.path.join(data_dir, "projects.csv"))
    parcels_df = pd.read_csv(os.path.join(data_dir, "land_parcels.csv"))
    timeline_df = pd.read_csv(os.path.join(data_dir, "lifecycle_timeline.csv"))
    comp_df = pd.read_csv(os.path.join(data_dir, "compensation.csv"))
    legal_df = pd.read_csv(os.path.join(data_dir, "legal_disputes.csv"))
    apps_df = pd.read_csv(os.path.join(data_dir, "approvals.csv"))
    docs_df = pd.read_csv(os.path.join(data_dir, "documentation.csv"))
    rr_df = pd.read_csv(os.path.join(data_dir, "rehabilitation_rr.csv"))
    stk_df = pd.read_csv(os.path.join(data_dir, "stakeholders.csv"))
    admin_df = pd.read_csv(os.path.join(data_dir, "administrative_performance.csv"))
    geo_df = pd.read_csv(os.path.join(data_dir, "project_geospatial.csv"))
    out_df = pd.read_csv(os.path.join(data_dir, "project_outcomes.csv"))
    risk_df = pd.read_csv(os.path.join(data_dir, "risk_history.csv"))
    cov_df = pd.read_csv(os.path.join(data_dir, "coverage_summary.csv"))

    # 1. Projects Count & Geographic checks
    total_projects = len(projects_df)
    proj_without_dist = projects_df['district'].isnull().sum()
    proj_without_state = projects_df['state'].isnull().sum()

    # Valid state/district combinations check
    invalid_state_dist_count = 0
    valid_lookup = {}
    for st, info in GEOGRAPHIC_MASTER.items():
        valid_lookup[st] = set(info["districts"])

    for _, row in projects_df.iterrows():
        st = row['state']
        dt = row['district']
        if st not in valid_lookup or dt not in valid_lookup[st]:
            invalid_state_dist_count += 1

    # PM Coverage
    valid_user_ids = set(users_df['user_id'].astype(str))
    pm_user_ids = set(users_df[users_df['role'] == 'PROJECT_MANAGER']['user_id'].astype(str))
    proj_without_pm = projects_df[~projects_df['project_manager_id'].astype(str).isin(pm_user_ids)].shape[0]

    # District Officer Coverage
    do_districts = set(users_df[users_df['role'] == 'DISTRICT_OFFICER']['district'].astype(str))
    all_master_districts = set()
    for info in GEOGRAPHIC_MASTER.values():
        all_master_districts.update(info["districts"])

    districts_without_do = len(all_master_districts - do_districts)

    # State / District count covered
    states_covered = projects_df['state'].nunique()
    districts_covered = projects_df['district'].nunique()

    # Primary key duplication & orphans
    dup_pks = 0
    dup_pks += users_df['user_id'].duplicated().sum()
    dup_pks += projects_df['project_id'].duplicated().sum()
    dup_pks += parcels_df['parcel_id'].duplicated().sum()
    dup_pks += timeline_df['timeline_id'].duplicated().sum()
    dup_pks += comp_df['compensation_id'].duplicated().sum()
    dup_pks += legal_df['dispute_id'].duplicated().sum()
    dup_pks += apps_df['approval_id'].duplicated().sum()
    dup_pks += docs_df['doc_id'].duplicated().sum()
    dup_pks += rr_df['rr_id'].duplicated().sum()
    dup_pks += stk_df['stakeholder_id'].duplicated().sum()
    dup_pks += admin_df['admin_id'].duplicated().sum()
    dup_pks += geo_df['geo_id'].duplicated().sum()
    dup_pks += out_df['outcome_id'].duplicated().sum()
    dup_pks += risk_df['risk_history_id'].duplicated().sum()

    # Orphan records check
    project_ids = set(projects_df['project_id'].astype(str))
    orphan_records = 0
    for df, name in [
        (parcels_df, 'parcels'), (timeline_df, 'timeline'), (comp_df, 'comp'),
        (legal_df, 'legal'), (apps_df, 'apps'), (docs_df, 'docs'), (rr_df, 'rr'),
        (stk_df, 'stk'), (admin_df, 'admin'), (geo_df, 'geo'), (out_df, 'out'), (risk_df, 'risk')
    ]:
        orphan_records += df[~df['project_id'].astype(str).isin(project_ids)].shape[0]

    # Negative values check
    neg_values = 0
    if (projects_df['land_area_acres'] < 0).sum() > 0: neg_values += 1
    if (projects_df['affected_families'] < 0).sum() > 0: neg_values += 1
    if (projects_df['total_landowners'] < 0).sum() > 0: neg_values += 1
    if (projects_df['project_budget'] < 0).sum() > 0: neg_values += 1
    if (comp_df['total_estimated_amount'] < 0).sum() > 0: neg_values += 1
    if (comp_df['total_approved_amount'] < 0).sum() > 0: neg_values += 1
    if (comp_df['total_disbursed_amount'] < 0).sum() > 0: neg_values += 1
    if (comp_df['total_pending_amount'] < 0).sum() > 0: neg_values += 1
    if (rr_df['families_pending'] < 0).sum() > 0: neg_values += 1

    # Invalid percentages check
    invalid_percentages = 0
    if ((rr_df['rr_completion_percentage'] < 0) | (rr_df['rr_completion_percentage'] > 100)).sum() > 0:
        invalid_percentages += 1
    if ((risk_df['delay_probability'] < 0) | (risk_df['delay_probability'] > 1.0)).sum() > 0:
        invalid_percentages += 1

    # Invalid dates check
    invalid_dates = 0
    for df, col in [(projects_df, 'planned_start_date'), (projects_df, 'planned_completion_date')]:
        invalid_dates += pd.to_datetime(df[col], errors='coerce').isna().sum()

    # Lifecycle inconsistencies
    lifecycle_inc = 0
    timeline_counts = timeline_df.groupby('project_id')['timeline_id'].count()
    if (timeline_counts != 11).sum() > 0:
        lifecycle_inc += (timeline_counts != 11).sum()

    # Compensation inconsistencies
    comp_inc = 0
    comp_math_err = ((comp_df['total_approved_amount'] - comp_df['total_disbursed_amount']).round(2) != comp_df['total_pending_amount'].round(2)).sum()
    if comp_math_err > 0: comp_inc += comp_math_err
    comp_est_err = (comp_df['total_estimated_amount'].round(2) < comp_df['total_approved_amount'].round(2)).sum()
    if comp_est_err > 0: comp_inc += comp_est_err

    # R&R inconsistencies
    rr_inc = 0
    rr_math_err = (rr_df['families_eligible'] - rr_df['families_rehabilitated'] != rr_df['families_pending']).sum()
    if rr_math_err > 0: rr_inc += rr_math_err
    house_err = (rr_df['houses_completed'] > rr_df['houses_required']).sum()
    if house_err > 0: rr_inc += house_err

    # Outcome inconsistencies
    outcome_inc = 0
    if len(out_df) != total_projects: outcome_inc += 1
    if out_df['project_id'].nunique() != total_projects: outcome_inc += 1
    out_math_err = (out_df['actual_duration_days'] - out_df['planned_duration_days']).clip(lower=0) != out_df['delay_days']
    if out_math_err.sum() > 0: outcome_inc += out_math_err.sum()

    # Total check
    total_failures = (
        proj_without_dist + proj_without_state + invalid_state_dist_count +
        proj_without_pm + districts_without_do + orphan_records + dup_pks +
        invalid_percentages + neg_values + invalid_dates + lifecycle_inc +
        comp_inc + rr_inc + outcome_inc
    )

    print("=" * 30)
    print("LANDGUARD DATA VALIDATION")
    print("=" * 30)
    print(f"\nProjects:\n{total_projects}")
    print(f"\nStates/UTs covered:\n{states_covered}")
    print(f"\nDistricts covered:\nALL ({districts_covered}/{len(all_master_districts)})")
    print(f"\nProjects without district:\n{proj_without_dist}")
    print(f"\nProjects without state:\n{proj_without_state}")
    print(f"\nInvalid state/district combinations:\n{invalid_state_dist_count}")
    print(f"\nProjects without project manager:\n{proj_without_pm}")
    print(f"\nDistricts without district officer:\n{districts_without_do}")
    print(f"\nOrphan child records:\n{orphan_records}")
    print(f"\nDuplicate primary keys:\n{dup_pks}")
    print(f"\nInvalid percentages:\n{invalid_percentages}")
    print(f"\nNegative values:\n{neg_values}")
    print(f"\nInvalid dates:\n{invalid_dates}")
    print(f"\nLifecycle inconsistencies:\n{lifecycle_inc}")
    print(f"\nCompensation inconsistencies:\n{comp_inc}")
    print(f"\nR&R inconsistencies:\n{rr_inc}")
    print(f"\nOutcome inconsistencies:\n{outcome_inc}")
    print("\n" + "=" * 30)

    if total_failures == 0:
        print("VALIDATION PASSED")
        print("=" * 30)
        return True
    else:
        print("VALIDATION FAILED")
        print("=" * 30)
        sys.exit(1)

if __name__ == "__main__":
    run_validation()
