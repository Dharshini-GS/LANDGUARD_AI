# LANDGUARD AI — Synthetic Dataset Generation & Usage Guide

> [!IMPORTANT]
> **DATA_TYPE = SYNTHETIC**
> "Prototype trained and demonstrated using synthetic/historical-like data. The system is designed to be retrained and validated using authorized government data when available."
>
> **Do NOT claim that any record is actual Government of India data.**

---

## Executive Summary

This repository contains the complete synthetic dataset pipeline for **LANDGUARD AI — Predictive Land Acquisition Delay Intelligence**.

The pipeline generates an India-wide synthetic dataset of **1,200 infrastructure land acquisition projects**, full coverage across **36 States and Union Territories (784 districts)**, a role-based user hierarchy, 12 relational child tables, strict quality validation rules, and an automated SQLite database builder (`database/landguard.db`).

---

## Key Pipeline Features

1. **Complete India Administrative Master**:
   - Covers 28 States and 8 Union Territories (36 administrative divisions).
   - Covers all 784 official districts in the reference list.
   - Enforces strict `district -> state` lookup validation.

2. **1,200 Projects with Coverage Guarantee**:
   - **Step 1**: Every single district receives at least 1 project (784 districts covered).
   - **Step 2**: Remaining projects distributed using weighted sampling by state size.
   - 0 States/UTs with zero projects.
   - 0 Districts with zero projects.

3. **Role-Based User Hierarchy (1,058 Users)**:
   - **ADMIN (12 users)**: Full national access (`state=ALL, district=ALL`).
   - **STATE_OFFICER (72 users)**: State-wide access (2 per State/UT, `district=ALL`).
   - **DISTRICT_OFFICER (784 users)**: District-level access (1 per district).
   - **PROJECT_MANAGER (150 users)**: Project-assigned access (`projects.project_manager_id`).
   - **ANALYST (40 users)**: Analytical reporting scope.
   - Password hashes stored securely via `bcrypt` (default demo password: `LandGuard@2026`).

4. **Realistic Correlated Risk Dynamics**:
   - High legal disputes, low documentation verification, pending approvals, low compensation disbursement, and poor R&R completion correlate logically with higher risk probabilities (`HIGH`, `CRITICAL`).
   - Includes a specific **Demo High-Risk Project (`LG-000042`)** with 800 acres, 450 affected families, 42% compensation completion, and 18 legal disputes.

5. **ML Data Leakage Prevention**:
   - Target outcomes (`actual_duration_days`, `delay_days`, `delay_flag`, `final_status`, `completion_date`) are strictly isolated in `project_outcomes.csv` and MUST NOT be used as predictive model input features.

---

## Directory Structure

```
pro_data/
├── data/                         # CSV Source Files
│   ├── users.csv
│   ├── projects.csv
│   ├── land_parcels.csv
│   ├── lifecycle_timeline.csv
│   ├── compensation.csv
│   ├── legal_disputes.csv
│   ├── approvals.csv
│   ├── documentation.csv
│   ├── rehabilitation_rr.csv
│   ├── stakeholders.csv
│   ├── administrative_performance.csv
│   ├── project_geospatial.csv
│   ├── project_outcomes.csv
│   ├── risk_history.csv
│   └── coverage_summary.csv
├── database/
│   └── landguard.db              # Validated SQLite Database
├── scripts/
│   ├── generate_data.py          # Data Generation Script
│   ├── validate_data.py          # 23-Rule Data Validation Suite
│   └── csv_to_sqlite.py          # CSV to SQLite Import Pipeline
├── DATA_DICTIONARY.md            # Complete Schema Documentation
├── DATA_GENERATION_README.md     # Pipeline Architecture & Guide
└── demo_credentials.txt          # Synthetic Demo User Credentials
```

---

## How to Run the Pipeline

### Step 1: Generate Synthetic Data
Generates 1,200 projects and all relational CSV files deterministically using random seed `42`.
```bash
python scripts/generate_data.py --projects 1200 --seed 42
```

### Step 2: Validate Data Quality
Runs the 23-rule validation suite to ensure referential integrity, date validity, bounds checks, and geographic coverage.
```bash
python scripts/validate_data.py
```
*Output snippet:*
```text
==============================
LANDGUARD DATA VALIDATION
==============================

Projects:
1200

States/UTs covered:
36

Districts covered:
ALL (784/784)

Projects without district: 0
Projects without state: 0
Invalid state/district combinations: 0
Projects without project manager: 0
Districts without district officer: 0
Orphan child records: 0
Duplicate primary keys: 0
Invalid percentages: 0
Negative values: 0
Invalid dates: 0
Lifecycle inconsistencies: 0
Compensation inconsistencies: 0
R&R inconsistencies: 0
Outcome inconsistencies: 0

==============================
VALIDATION PASSED
==============================
```

### Step 3: Import into SQLite
Imports validated CSVs into `database/landguard.db`, creates foreign key constraints, indexes, operational tables, and executes `PRAGMA foreign_key_check`.
```bash
python scripts/csv_to_sqlite.py
```

---

## Database Usage & Query Examples

### SQLite Connection (Python)
```python
import sqlite3

conn = sqlite3.connect("database/landguard.db")
conn.execute("PRAGMA foreign_keys = ON;")
cursor = conn.cursor()

# Query High-Risk Projects in Maharashtra
query = """
SELECT p.project_id, p.project_name, p.district, r.risk_category, r.delay_probability
FROM projects p
JOIN risk_history r ON p.project_id = r.project_id
WHERE p.state = 'Maharashtra' AND r.risk_category IN ('HIGH', 'CRITICAL')
ORDER BY r.delay_probability DESC;
"""
cursor.execute(query)
for row in cursor.fetchall():
    print(row)

conn.close()
```

---

## Demo Credentials
For testing role-based login:
- **Default Password**: `LandGuard@2026`
- **Admin**: `admin_1`
- **State Officer**: `so_001_andhraprad`
- **District Officer**: `do_0518_pune`
- **Project Manager**: `pm_042`
- **Analyst**: `analyst_01`

Refer to `demo_credentials.txt` for the complete list.
