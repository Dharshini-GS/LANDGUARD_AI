# LANDGUARD AI — Synthetic Dataset Data Dictionary

> [!IMPORTANT]
> **DATA_TYPE = SYNTHETIC**
> "Prototype trained and demonstrated using synthetic/historical-like data. The system is designed to be retrained and validated using authorized government data when available."

This document describes the schema, data types, key constraints, and descriptions for all 15 synthetic CSV datasets and SQLite database tables generated for **LANDGUARD AI — Predictive Land Acquisition Delay Intelligence**.

---

## Relational Architecture Diagram

```
                     ┌───────────────────┐
                     │       users       │
                     └─────────┬─────────┘
                               │ 1:N (Project Manager)
                               ▼
                     ┌───────────────────┐
                     │     projects      │
                     └─────────┬─────────┘
                               │
       ┌───────────────────────┼───────────────────────┐
       │ 1:N                   │ 1:N                   │ 1:1
       ▼                       ▼                       ▼
┌──────────────┐     ┌───────────────────┐   ┌───────────────────┐
│ land_parcels │     │lifecycle_timeline │   │project_geospatial │
└──────────────┘     └───────────────────┘   └───────────────────┘
       │ 1:N                   │ 1:N                   │ 1:1
       ▼                       ▼                       ▼
┌──────────────┐     ┌───────────────────┐   ┌───────────────────┐
│ compensation │     │   legal_disputes  │   │ project_outcomes  │
└──────────────┘     └───────────────────┘   └───────────────────┘
       │ 1:N                   │ 1:N                   │ 1:N
       ▼                       ▼                       ▼
┌──────────────┐     ┌───────────────────┐   ┌───────────────────┐
│  approvals   │     │   documentation   │   │   risk_history    │
└──────────────┘     └───────────────────┘   └───────────────────┘
       │ 1:N                   │ 1:N
       ▼                       ▼
┌──────────────┐     ┌───────────────────┐
│rehab_rr      │     │   stakeholders    │
└──────────────┘     └───────────────────┘
       │ 1:N
       ▼
┌───────────────────────────┐
│administrative_performance │
└───────────────────────────┘
```

---

## 1. `users.csv` / `users` table
Stores system user profiles and role-based access attributes.

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `user_id` | TEXT | PRIMARY KEY | Unique user identifier (`USR-00001`...) |
| `username` | TEXT | UNIQUE, NOT NULL | Unique login handle |
| `password_hash` | TEXT | NOT NULL | Bcrypt hashed password |
| `full_name` | TEXT | NOT NULL | User's full display name |
| `role` | TEXT | NOT NULL | One of: `ADMIN`, `STATE_OFFICER`, `DISTRICT_OFFICER`, `PROJECT_MANAGER`, `ANALYST` |
| `state` | TEXT | NOT NULL | State scope (`ALL` for national, or specific state name) |
| `district` | TEXT | NOT NULL | District scope (`ALL` for state/national, or specific district name) |
| `status` | TEXT | NOT NULL | Account status: `Active`, `Inactive` |
| `created_at` | TEXT | NOT NULL | ISO timestamp of user creation |

---

## 2. `projects.csv` / `projects` table
Master table storing overall project attributes, progress stage, and assigned project manager.

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `project_id` | TEXT | PRIMARY KEY | Unique project identifier (`LG-000001`...) |
| `project_name` | TEXT | NOT NULL | Descriptive synthetic project title |
| `project_type` | TEXT | NOT NULL | Type: `Highway`, `Railway`, `Airport`, `Dam`, `Canal`, `Industrial Corridor`, `Metro`, `Power Project`, `Water Supply`, `Urban Development` |
| `state` | TEXT | NOT NULL | Valid Indian State or Union Territory |
| `district` | TEXT | NOT NULL | Valid district belonging to `state` |
| `project_manager_id` | TEXT | FK (`users.user_id`) | Assigned project manager |
| `village_count` | INTEGER | CHECK (>= 1) | Number of villages impacted |
| `land_area_acres` | REAL | CHECK (> 0) | Total land required in acres (20 - 10,000) |
| `affected_families` | INTEGER | CHECK (>= 0) | Total displaced/affected families |
| `total_landowners` | INTEGER | CHECK (>= 0) | Total registered landowners |
| `project_budget` | REAL | CHECK (> 0) | Total budget in INR (10M to 100B) |
| `planned_start_date` | TEXT | NOT NULL | Planned start date (`YYYY-MM-DD`) |
| `planned_completion_date` | TEXT | NOT NULL | Planned completion date (`YYYY-MM-DD`) |
| `current_stage` | TEXT | NOT NULL | Current stage in acquisition lifecycle |
| `project_status` | TEXT | NOT NULL | Status: `Active`, `Completed`, `On Hold`, `Cancelled` |
| `created_at` | TEXT | NOT NULL | Record creation timestamp |
| `updated_at` | TEXT | NOT NULL | Last update timestamp |

---

## 3. `land_parcels.csv` / `land_parcels` table
Individual survey land parcel records (5 - 15 per project).

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `parcel_id` | TEXT | PRIMARY KEY | Unique parcel identifier (`PARCEL-0000001`...) |
| `project_id` | TEXT | FK (`projects.project_id`) | Parent project ID |
| `survey_number` | TEXT | NOT NULL | Synthetic survey number |
| `village` | TEXT | NOT NULL | Village name |
| `land_area_acres` | REAL | CHECK (>= 0) | Parcel land area in acres |
| `land_use_type` | TEXT | NOT NULL | Land use: `Agricultural`, `Commercial`, `Residential`, `Barren` |
| `ownership_type` | TEXT | NOT NULL | Ownership: `Private`, `Government`, `Community` |
| `owner_count` | INTEGER | CHECK (>= 1) | Number of co-owners |
| `ownership_verified` | INTEGER | CHECK (0, 1) | Verification flag (1=Verified, 0=Unverified) |
| `ownership_conflict` | INTEGER | CHECK (0, 1) | Conflict flag (1=Disputed title, 0=Clear) |
| `document_status` | TEXT | NOT NULL | Status: `Verified`, `Pending`, `Missing`, `Rejected` |
| `acquisition_status` | TEXT | NOT NULL | Acquisition status: `Identified`, `Surveyed`, `Notified`, `Acquired`, `Transferred` |
| `possession_status` | TEXT | NOT NULL | Possession status: `Pending`, `In Progress`, `Taken` |
| `compensation_status` | TEXT | NOT NULL | Payment status: `Pending`, `Approved`, `Disbursed`, `Disputed` |
| `legal_dispute_flag` | INTEGER | CHECK (0, 1) | Legal dispute active flag |

---

## 4. `lifecycle_timeline.csv` / `lifecycle_timeline` table
Tracks progression across all 11 mandatory stages per project.

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `timeline_id` | TEXT | PRIMARY KEY | Unique timeline record ID (`TL-0000001`...) |
| `project_id` | TEXT | FK (`projects.project_id`) | Parent project ID |
| `stage_name` | TEXT | NOT NULL | One of 11 lifecycle stages |
| `planned_start_date` | TEXT | NOT NULL | Planned stage start date |
| `planned_end_date` | TEXT | NOT NULL | Planned stage end date |
| `actual_start_date` | TEXT | NULLABLE | Actual stage start date |
| `actual_end_date` | TEXT | NULLABLE | Actual stage end date (`NULL` if in progress/pending) |
| `stage_status` | TEXT | NOT NULL | Status: `Not Started`, `In Progress`, `Completed`, `Delayed` |
| `responsible_department` | TEXT | NOT NULL | Department in charge |
| `planned_duration_days` | INTEGER | CHECK (>= 0) | Target stage duration |
| `actual_duration_days` | INTEGER | CHECK (>= 0) | Actual stage duration |
| `stage_delay_days` | INTEGER | CHECK (>= 0) | Delay in days |

---

## 5. `compensation.csv` / `compensation` table
Financial compensation summary per project.

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `compensation_id` | TEXT | PRIMARY KEY | Unique compensation record ID (`COMP-000001`...) |
| `project_id` | TEXT | FK (`projects.project_id`) | Parent project ID |
| `total_estimated_amount` | REAL | CHECK (>= 0) | Estimated compensation total |
| `total_approved_amount` | REAL | CHECK (>= 0) | Approved compensation total |
| `total_disbursed_amount` | REAL | CHECK (>= 0) | Amount disbursed |
| `total_pending_amount` | REAL | CHECK (>= 0) | Amount pending (`approved - disbursed`) |
| `beneficiaries_total` | INTEGER | CHECK (>= 0) | Total beneficiary count |
| `beneficiaries_paid` | INTEGER | CHECK (>= 0) | Paid beneficiaries |
| `beneficiaries_pending` | INTEGER | CHECK (>= 0) | Pending beneficiaries |
| `average_processing_days` | INTEGER | CHECK (>= 0) | Avg days to disburse |
| `payment_status` | TEXT | NOT NULL | Status: `In Progress`, `Partially Completed`, `Fully Disbursed` |
| `compensation_dispute_count` | INTEGER | CHECK (>= 0) | Active compensation litigation cases |

---

## 6. `legal_disputes.csv` / `legal_disputes` table
Court litigation cases (0 - 10 per project).

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `dispute_id` | TEXT | PRIMARY KEY | Unique dispute ID (`LEG-0000001`...) |
| `project_id` | TEXT | FK (`projects.project_id`) | Parent project ID |
| `case_type` | TEXT | NOT NULL | Case category: `Title Dispute`, `Compensation Amount Dispute`, `Encroachment`, `Environmental Challenge`, `R&R Dispute` |
| `filing_date` | TEXT | NOT NULL | Case filing date |
| `resolution_date` | TEXT | NULLABLE | Case resolution date (`NULL` if active) |
| `case_status` | TEXT | NOT NULL | Case status: `Pending`, `Under Hearing`, `Stay Order Issued`, `Resolved` |
| `pending_days` | INTEGER | CHECK (>= 0) | Days case has been pending |
| `court_level` | TEXT | NOT NULL | Court level: `District Court`, `High Court`, `Revenue Tribunal` |
| `case_severity` | TEXT | NOT NULL | Severity: `Low`, `Medium`, `High`, `Critical` |

---

## 7. `approvals.csv` / `approvals` table
Government and regulatory clearances (3 - 8 per project).

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `approval_id` | TEXT | PRIMARY KEY | Unique approval ID (`APP-0000001`...) |
| `project_id` | TEXT | FK (`projects.project_id`) | Parent project ID |
| `approval_type` | TEXT | NOT NULL | Approval type: `Administrative Approval`, `Environmental Clearance`, `Land Acquisition Approval`, `Financial Approval`, `Government Notification` |
| `submission_date` | TEXT | NOT NULL | Submission date |
| `approval_date` | TEXT | NULLABLE | Clearance date (`NULL` if pending) |
| `approval_status` | TEXT | NOT NULL | Status: `Submitted`, `In Review`, `Approved`, `Conditionally Approved` |
| `responsible_authority` | TEXT | NOT NULL | Issuing authority (e.g. `MoEFCC`, `State Cabinet`) |
| `delay_days` | INTEGER | CHECK (>= 0) | Delay in issuance |

---

## 8. `documentation.csv` / `documentation` table
Required document submissions and verification tracking (5 - 15 per project).

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `doc_id` | TEXT | PRIMARY KEY | Unique document ID (`DOC-0000001`...) |
| `project_id` | TEXT | FK (`projects.project_id`) | Parent project ID |
| `document_type` | TEXT | NOT NULL | Document category |
| `submitted_flag` | INTEGER | CHECK (0, 1) | Submission flag (1=Submitted, 0=Not submitted) |
| `verified_flag` | INTEGER | CHECK (0, 1) | Verification flag (1=Verified, 0=Unverified) |
| `issue_flag` | INTEGER | CHECK (0, 1) | Defect/Issue flag |
| `submission_date` | TEXT | NULLABLE | Date submitted |
| `verification_date` | TEXT | NULLABLE | Date verified |
| `doc_status` | TEXT | NOT NULL | Status: `Pending`, `Submitted`, `Verified`, `Rejected` |

---

## 9. `rehabilitation_rr.csv` / `rehabilitation_rr` table
Rehabilitation & Resettlement (R&R) project execution metrics.

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `rr_id` | TEXT | PRIMARY KEY | Unique R&R record ID (`RR-000001`...) |
| `project_id` | TEXT | FK (`projects.project_id`) | Parent project ID |
| `affected_families` | INTEGER | CHECK (>= 0) | Total affected families |
| `families_eligible` | INTEGER | CHECK (>= 0) | Families eligible for R&R |
| `families_rehabilitated` | INTEGER | CHECK (>= 0) | Families successfully resettled |
| `families_pending` | INTEGER | CHECK (>= 0) | Families pending resettlement (`eligible - rehabilitated`) |
| `houses_required` | INTEGER | CHECK (>= 0) | Replacement housing units needed |
| `houses_completed` | INTEGER | CHECK (>= 0) | Housing units constructed |
| `rr_budget` | REAL | CHECK (>= 0) | Allocated R&R budget in INR |
| `rr_spent` | REAL | CHECK (>= 0) | Spent R&R budget in INR |
| `rr_completion_percentage` | REAL | CHECK (0.0 to 100.0) | R&R percentage (`rehabilitated / eligible * 100`) |
| `rr_status` | TEXT | NOT NULL | Status: `In Progress`, `Completed`, `Delayed` |

---

## 10. `stakeholders.csv` / `stakeholders` table
Community and institutional stakeholder sentiment and request tracking.

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `stakeholder_id` | TEXT | PRIMARY KEY | Unique stakeholder ID (`STK-0000001`...) |
| `project_id` | TEXT | FK (`projects.project_id`) | Parent project ID |
| `stakeholder_type` | TEXT | NOT NULL | Stakeholder group: `Landowner`, `Village Administration`, `District Administration`, `Contractor` |
| `stakeholder_name` | TEXT | NOT NULL | Group name |
| `engagement_level` | TEXT | NOT NULL | Engagement: `Low`, `Medium`, `High` |
| `sentiment` | TEXT | NOT NULL | Sentiment: `Positive`, `Neutral`, `Negative` |
| `requests_received` | INTEGER | CHECK (>= 0) | Grievances/Requests submitted |
| `requests_resolved` | INTEGER | CHECK (>= 0) | Requests resolved |
| `pending_requests` | INTEGER | CHECK (>= 0) | Pending requests (`received - resolved`) |
| `response_time_days` | INTEGER | CHECK (>= 0) | Avg response turnaround days |

---

## 11. `administrative_performance.csv` / `administrative_performance` table
Departmental administrative efficiency metrics.

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `admin_id` | TEXT | PRIMARY KEY | Unique admin performance ID (`ADM-0000001`...) |
| `project_id` | TEXT | FK (`projects.project_id`) | Parent project ID |
| `department` | TEXT | NOT NULL | Department name |
| `officer_workload` | TEXT | NOT NULL | Workload level: `Low`, `Medium`, `High` |
| `active_case_count` | INTEGER | CHECK (>= 0) | Active administrative files |
| `pending_case_count` | INTEGER | CHECK (>= 0) | Backlog files |
| `staff_available` | INTEGER | CHECK (>= 0) | Assigned personnel |
| `average_processing_days` | INTEGER | CHECK (>= 0) | Processing turnaround days |
| `approval_backlog` | INTEGER | CHECK (>= 0) | Pending approval file count |
| `historical_delay_rate` | REAL | CHECK (0.0 to 1.0) | Department historical delay rate |
| `coordination_score` | REAL | CHECK (0.0 to 10.0) | Inter-departmental coordination score |

---

## 12. `project_geospatial.csv` / `project_geospatial` table
EXACTLY 1 record per project containing GPS coordinates and village location names.

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `geo_id` | TEXT | PRIMARY KEY | Unique geo ID (`GEO-000001`...) |
| `project_id` | TEXT | UNIQUE, FK (`projects.project_id`) | Parent project ID |
| `latitude` | REAL | NOT NULL | Latitude coordinate (within India bounds) |
| `longitude` | REAL | NOT NULL | Longitude coordinate (within India bounds) |
| `state` | TEXT | NOT NULL | State name |
| `district` | TEXT | NOT NULL | District name |
| `village` | TEXT | NOT NULL | Main synthetic site village |
| `location_name` | TEXT | NOT NULL | Site descriptive location |

---

## 13. `project_outcomes.csv` / `project_outcomes` table
> [!CAUTION]
> **TARGET / OUTCOME DATA ONLY**. Do NOT use columns from this table as ML input features to prevent data leakage!

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `outcome_id` | TEXT | PRIMARY KEY | Unique outcome ID (`OUT-000001`...) |
| `project_id` | TEXT | UNIQUE, FK (`projects.project_id`) | Parent project ID |
| `planned_duration_days` | INTEGER | CHECK (>= 0) | Total planned duration |
| `actual_duration_days` | INTEGER | CHECK (>= 0) | Total actual duration |
| `delay_days` | INTEGER | CHECK (>= 0) | Delay in days (`max(actual - planned, 0)`) |
| `delay_flag` | INTEGER | CHECK (0, 1) | Target binary label (1 if delay > 90 days, else 0) |
| `final_status` | TEXT | NOT NULL | Final status: `On Time`, `Delayed`, `Severely Delayed` |
| `delay_stage` | TEXT | NOT NULL | Main lifecycle stage where delay occurred |
| `completion_date` | TEXT | NULLABLE | Actual completion date |

---

## 14. `risk_history.csv` / `risk_history` table
Historical time-series prediction snapshots (5 - 20 records per project).

| Column | Data Type | Key / Constraint | Description |
|---|---|---|---|
| `risk_history_id` | TEXT | PRIMARY KEY | Unique risk history ID (`RISK-0000001`...) |
| `project_id` | TEXT | FK (`projects.project_id`) | Parent project ID |
| `prediction_date` | TEXT | NOT NULL | Snapshot prediction date |
| `delay_probability` | REAL | CHECK (0.0 to 1.0) | Predicted delay probability |
| `risk_score` | INTEGER | CHECK (0 to 100) | Risk score (0 - 100) |
| `risk_category` | TEXT | NOT NULL | Category: `LOW` (0-30), `MEDIUM` (31-60), `HIGH` (61-80), `CRITICAL` (81-100) |
| `expected_delay_days` | INTEGER | CHECK (>= 0) | Forecasted delay days |
| `highest_risk_stage` | TEXT | NOT NULL | Stage identified as primary risk bottleneck |
| `model_version` | TEXT | NOT NULL | ML model version string |

---

## 15. `coverage_summary.csv`
Summary dataset recording project coverage per State and District.

| Column | Data Type | Description |
|---|---|---|
| `state` | TEXT | State or Union Territory name |
| `district` | TEXT | District name |
| `project_count` | INTEGER | Total synthetic projects assigned |
| `minimum_project_coverage_met` | BOOLEAN | `True` if `project_count >= 1` |
