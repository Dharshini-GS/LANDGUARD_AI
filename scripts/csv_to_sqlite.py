#!/usr/bin/env python3
"""
LANDGUARD AI — CSV to SQLite Importer
Creates database/landguard.db from validated CSV files with full DDL, constraints, foreign keys, and indexes.
"""

import os
import sys
import sqlite3
import pandas as pd

def build_database():
    db_dir = "database"
    data_dir = "data"
    db_path = os.path.join(db_dir, "landguard.db")

    os.makedirs(db_dir, exist_ok=True)

    if os.path.exists(db_path):
        os.remove(db_path)

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute("PRAGMA foreign_keys = ON;")

    print("Creating tables in SQLite database...")

    # 1. users table
    cursor.execute("""
    CREATE TABLE users (
        user_id TEXT PRIMARY KEY NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('ADMIN', 'STATE_OFFICER', 'DISTRICT_OFFICER', 'PROJECT_MANAGER', 'ANALYST')),
        state TEXT NOT NULL,
        district TEXT NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('Active', 'Inactive')),
        created_at TEXT NOT NULL
    );
    """)

    # 2. projects table
    cursor.execute("""
    CREATE TABLE projects (
        project_id TEXT PRIMARY KEY NOT NULL,
        project_name TEXT NOT NULL,
        project_type TEXT NOT NULL,
        state TEXT NOT NULL,
        district TEXT NOT NULL,
        project_manager_id TEXT NOT NULL,
        village_count INTEGER NOT NULL CHECK(village_count >= 1),
        land_area_acres REAL NOT NULL CHECK(land_area_acres > 0),
        affected_families INTEGER NOT NULL CHECK(affected_families >= 0),
        total_landowners INTEGER NOT NULL CHECK(total_landowners >= 0),
        project_budget REAL NOT NULL CHECK(project_budget > 0),
        planned_start_date TEXT NOT NULL,
        planned_completion_date TEXT NOT NULL,
        current_stage TEXT NOT NULL,
        project_status TEXT NOT NULL CHECK(project_status IN ('Active', 'Completed', 'On Hold', 'Cancelled')),
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY (project_manager_id) REFERENCES users(user_id) ON DELETE RESTRICT
    );
    """)

    # 3. land_parcels table
    cursor.execute("""
    CREATE TABLE land_parcels (
        parcel_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT NOT NULL,
        survey_number TEXT NOT NULL,
        village TEXT NOT NULL,
        land_area_acres REAL NOT NULL CHECK(land_area_acres >= 0),
        land_use_type TEXT NOT NULL,
        ownership_type TEXT NOT NULL,
        owner_count INTEGER NOT NULL CHECK(owner_count >= 1),
        ownership_verified INTEGER NOT NULL CHECK(ownership_verified IN (0, 1)),
        ownership_conflict INTEGER NOT NULL CHECK(ownership_conflict IN (0, 1)),
        document_status TEXT NOT NULL,
        acquisition_status TEXT NOT NULL,
        possession_status TEXT NOT NULL,
        compensation_status TEXT NOT NULL,
        legal_dispute_flag INTEGER NOT NULL CHECK(legal_dispute_flag IN (0, 1)),
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
    );
    """)

    # 4. lifecycle_timeline table
    cursor.execute("""
    CREATE TABLE lifecycle_timeline (
        timeline_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT NOT NULL,
        stage_name TEXT NOT NULL,
        planned_start_date TEXT NOT NULL,
        planned_end_date TEXT NOT NULL,
        actual_start_date TEXT,
        actual_end_date TEXT,
        stage_status TEXT NOT NULL,
        responsible_department TEXT NOT NULL,
        planned_duration_days INTEGER NOT NULL CHECK(planned_duration_days >= 0),
        actual_duration_days INTEGER NOT NULL CHECK(actual_duration_days >= 0),
        stage_delay_days INTEGER NOT NULL CHECK(stage_delay_days >= 0),
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
    );
    """)

    # 5. compensation table
    cursor.execute("""
    CREATE TABLE compensation (
        compensation_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT NOT NULL,
        total_estimated_amount REAL NOT NULL CHECK(total_estimated_amount >= 0),
        total_approved_amount REAL NOT NULL CHECK(total_approved_amount >= 0),
        total_disbursed_amount REAL NOT NULL CHECK(total_disbursed_amount >= 0),
        total_pending_amount REAL NOT NULL CHECK(total_pending_amount >= 0),
        beneficiaries_total INTEGER NOT NULL CHECK(beneficiaries_total >= 0),
        beneficiaries_paid INTEGER NOT NULL CHECK(beneficiaries_paid >= 0),
        beneficiaries_pending INTEGER NOT NULL CHECK(beneficiaries_pending >= 0),
        average_processing_days INTEGER NOT NULL CHECK(average_processing_days >= 0),
        payment_status TEXT NOT NULL,
        compensation_dispute_count INTEGER NOT NULL CHECK(compensation_dispute_count >= 0),
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
    );
    """)

    # 6. legal_disputes table
    cursor.execute("""
    CREATE TABLE legal_disputes (
        dispute_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT NOT NULL,
        case_type TEXT NOT NULL,
        filing_date TEXT NOT NULL,
        resolution_date TEXT,
        case_status TEXT NOT NULL,
        pending_days INTEGER NOT NULL CHECK(pending_days >= 0),
        court_level TEXT NOT NULL,
        case_severity TEXT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
    );
    """)

    # 7. approvals table
    cursor.execute("""
    CREATE TABLE approvals (
        approval_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT NOT NULL,
        approval_type TEXT NOT NULL,
        submission_date TEXT NOT NULL,
        approval_date TEXT,
        approval_status TEXT NOT NULL,
        responsible_authority TEXT NOT NULL,
        delay_days INTEGER NOT NULL CHECK(delay_days >= 0),
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
    );
    """)

    # 8. documentation table
    cursor.execute("""
    CREATE TABLE documentation (
        doc_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT NOT NULL,
        document_type TEXT NOT NULL,
        submitted_flag INTEGER NOT NULL CHECK(submitted_flag IN (0, 1)),
        verified_flag INTEGER NOT NULL CHECK(verified_flag IN (0, 1)),
        issue_flag INTEGER NOT NULL CHECK(issue_flag IN (0, 1)),
        submission_date TEXT,
        verification_date TEXT,
        doc_status TEXT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
    );
    """)

    # 9. rehabilitation_rr table
    cursor.execute("""
    CREATE TABLE rehabilitation_rr (
        rr_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT NOT NULL,
        affected_families INTEGER NOT NULL CHECK(affected_families >= 0),
        families_eligible INTEGER NOT NULL CHECK(families_eligible >= 0),
        families_rehabilitated INTEGER NOT NULL CHECK(families_rehabilitated >= 0),
        families_pending INTEGER NOT NULL CHECK(families_pending >= 0),
        houses_required INTEGER NOT NULL CHECK(houses_required >= 0),
        houses_completed INTEGER NOT NULL CHECK(houses_completed >= 0),
        rr_budget REAL NOT NULL CHECK(rr_budget >= 0),
        rr_spent REAL NOT NULL CHECK(rr_spent >= 0),
        rr_completion_percentage REAL NOT NULL CHECK(rr_completion_percentage >= 0 AND rr_completion_percentage <= 100),
        rr_status TEXT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
    );
    """)

    # 10. stakeholders table
    cursor.execute("""
    CREATE TABLE stakeholders (
        stakeholder_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT NOT NULL,
        stakeholder_type TEXT NOT NULL,
        stakeholder_name TEXT NOT NULL,
        engagement_level TEXT NOT NULL,
        sentiment TEXT NOT NULL,
        requests_received INTEGER NOT NULL CHECK(requests_received >= 0),
        requests_resolved INTEGER NOT NULL CHECK(requests_resolved >= 0),
        pending_requests INTEGER NOT NULL CHECK(pending_requests >= 0),
        response_time_days INTEGER NOT NULL CHECK(response_time_days >= 0),
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
    );
    """)

    # 11. administrative_performance table
    cursor.execute("""
    CREATE TABLE administrative_performance (
        admin_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT NOT NULL,
        department TEXT NOT NULL,
        officer_workload TEXT NOT NULL,
        active_case_count INTEGER NOT NULL CHECK(active_case_count >= 0),
        pending_case_count INTEGER NOT NULL CHECK(pending_case_count >= 0),
        staff_available INTEGER NOT NULL CHECK(staff_available >= 0),
        average_processing_days INTEGER NOT NULL CHECK(average_processing_days >= 0),
        approval_backlog INTEGER NOT NULL CHECK(approval_backlog >= 0),
        historical_delay_rate REAL NOT NULL CHECK(historical_delay_rate >= 0 AND historical_delay_rate <= 1),
        coordination_score REAL NOT NULL CHECK(coordination_score >= 0 AND coordination_score <= 10),
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
    );
    """)

    # 12. project_geospatial table
    cursor.execute("""
    CREATE TABLE project_geospatial (
        geo_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT UNIQUE NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL,
        state TEXT NOT NULL,
        district TEXT NOT NULL,
        village TEXT NOT NULL,
        location_name TEXT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
    );
    """)

    # 13. project_outcomes table
    cursor.execute("""
    CREATE TABLE project_outcomes (
        outcome_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT UNIQUE NOT NULL,
        planned_duration_days INTEGER NOT NULL CHECK(planned_duration_days >= 0),
        actual_duration_days INTEGER NOT NULL CHECK(actual_duration_days >= 0),
        delay_days INTEGER NOT NULL CHECK(delay_days >= 0),
        delay_flag INTEGER NOT NULL CHECK(delay_flag IN (0, 1)),
        final_status TEXT NOT NULL,
        delay_stage TEXT NOT NULL,
        completion_date TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
    );
    """)

    # 14. risk_history table
    cursor.execute("""
    CREATE TABLE risk_history (
        risk_history_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT NOT NULL,
        prediction_date TEXT NOT NULL,
        delay_probability REAL NOT NULL CHECK(delay_probability >= 0 AND delay_probability <= 1.0),
        risk_score INTEGER NOT NULL CHECK(risk_score >= 0 AND risk_score <= 100),
        risk_category TEXT NOT NULL CHECK(risk_category IN ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')),
        expected_delay_days INTEGER NOT NULL CHECK(expected_delay_days >= 0),
        highest_risk_stage TEXT NOT NULL,
        model_version TEXT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE
    );
    """)

    # Operational Empty Tables
    cursor.execute("""
    CREATE TABLE alerts (
        alert_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT NOT NULL,
        alert_type TEXT NOT NULL,
        severity TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TEXT NOT NULL,
        acknowledged_by TEXT,
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
        FOREIGN KEY (acknowledged_by) REFERENCES users(user_id) ON DELETE SET NULL
    );
    """)

    cursor.execute("""
    CREATE TABLE simulations (
        simulation_id TEXT PRIMARY KEY NOT NULL,
        project_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        scenario_name TEXT NOT NULL,
        parameters_json TEXT NOT NULL,
        predicted_delay_reduction INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );
    """)

    cursor.execute("""
    CREATE TABLE audit_logs (
        log_id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL,
        project_id TEXT,
        action TEXT NOT NULL,
        details TEXT NOT NULL,
        timestamp TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE SET NULL
    );
    """)

    cursor.execute("""
    CREATE TABLE login_history (
        history_id TEXT PRIMARY KEY NOT NULL,
        user_id TEXT NOT NULL,
        login_time TEXT NOT NULL,
        ip_address TEXT NOT NULL,
        status TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );
    """)

    # Populate Parent and Child Tables in strict order
    import_tables = [
        ("users", "users.csv"),
        ("projects", "projects.csv"),
        ("land_parcels", "land_parcels.csv"),
        ("lifecycle_timeline", "lifecycle_timeline.csv"),
        ("compensation", "compensation.csv"),
        ("legal_disputes", "legal_disputes.csv"),
        ("approvals", "approvals.csv"),
        ("documentation", "documentation.csv"),
        ("rehabilitation_rr", "rehabilitation_rr.csv"),
        ("stakeholders", "stakeholders.csv"),
        ("administrative_performance", "administrative_performance.csv"),
        ("project_geospatial", "project_geospatial.csv"),
        ("project_outcomes", "project_outcomes.csv"),
        ("risk_history", "risk_history.csv")
    ]

    print("\nImporting CSV datasets into SQLite database...")
    table_counts = {}
    for table_name, csv_name in import_tables:
        csv_path = os.path.join(data_dir, csv_name)
        df = pd.read_csv(csv_path, keep_default_na=False)
        df.to_sql(table_name, conn, if_exists="append", index=False)
        table_counts[table_name] = len(df)
        print(f"  - Imported {len(df):>7d} rows into '{table_name}'")

    # Create Indexes
    print("\nCreating Database Indexes...")
    cursor.execute("CREATE INDEX idx_projects_state_dist ON projects(state, district);")
    cursor.execute("CREATE INDEX idx_projects_stage_status ON projects(current_stage, project_status);")
    cursor.execute("CREATE INDEX idx_projects_pm ON projects(project_manager_id);")
    cursor.execute("CREATE INDEX idx_parcels_project ON land_parcels(project_id);")
    cursor.execute("CREATE INDEX idx_parcels_survey ON land_parcels(survey_number);")
    cursor.execute("CREATE INDEX idx_timeline_project_stage ON lifecycle_timeline(project_id, stage_name);")
    cursor.execute("CREATE INDEX idx_legal_project_status ON legal_disputes(project_id, case_status);")
    cursor.execute("CREATE INDEX idx_approvals_project_status ON approvals(project_id, approval_status);")
    cursor.execute("CREATE INDEX idx_documentation_project_status ON documentation(project_id, doc_status);")
    cursor.execute("CREATE INDEX idx_risk_project_date ON risk_history(project_id, prediction_date);")
    cursor.execute("CREATE INDEX idx_users_role_state_dist ON users(role, state, district);")

    conn.commit()

    # Foreign Key Verification Check
    print("\nRunning PRAGMA foreign_key_check...")
    cursor.execute("PRAGMA foreign_key_check;")
    fk_errors = cursor.fetchall()

    if fk_errors:
        print(f"CRITICAL: Foreign Key Violations Found: {len(fk_errors)}")
        for err in fk_errors:
            print(f"  Violation: {err}")
        conn.close()
        sys.exit(1)
    else:
        print("Foreign Key Verification: 0 Violations (PASSED)")

    conn.close()
    print("\nSQLite Database successfully built at: database/landguard.db")

if __name__ == "__main__":
    build_database()
