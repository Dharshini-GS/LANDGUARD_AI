from datetime import datetime, timezone
import math

from sqlalchemy.orm import Session

from ..models.project import Project
from ..models.risk_history import RiskHistory
from ..models.user import User


# =========================================================
# ACCESS CONTROL
# =========================================================

def apply_project_scope(
    query,
    current_user: User,
):
    """
    Restrict simulations to projects the authenticated
    user is allowed to access.
    """

    if str(current_user.role).upper() == "ADMIN":
        return query

    state = getattr(current_user, "state", None)
    district = getattr(current_user, "district", None)

    if state and str(state).upper() != "ALL":
        query = query.filter(
            Project.state == state
        )

    if district and str(district).upper() != "ALL":
        query = query.filter(
            Project.district == district
        )

    return query


# =========================================================
# LATEST RISK
# =========================================================

def get_latest_risk(
    db: Session,
    project_id: str,
):
    return (
        db.query(RiskHistory)
        .filter(
            RiskHistory.project_id == project_id
        )
        .order_by(
            RiskHistory.prediction_date.desc()
        )
        .first()
    )


# =========================================================
# RISK CATEGORY
# =========================================================

def risk_category_from_score(
    score: float,
) -> str:

    if score >= 80:
        return "CRITICAL"

    if score >= 60:
        return "HIGH"

    if score >= 40:
        return "MEDIUM"

    return "LOW"


# =========================================================
# SIMULATION CALCULATION
# =========================================================

def calculate_simulation(
    project: Project,
    risk: RiskHistory | None,
    delay_days: int,
    compensation_change_percent: float,
    affected_families_change_percent: float,
    legal_dispute_change: int,
):
    """
    Run a scenario simulation using the project's latest
    stored risk prediction as the baseline.

    This is a scenario-analysis layer; it does not modify
    the project's actual database values.
    """

    if risk:
        baseline_risk_score = float(
            risk.risk_score or 0
        )

        baseline_probability = float(
            risk.delay_probability or 0
        )

        baseline_delay = int(
            risk.expected_delay_days or 0
        )

        baseline_category = (
            risk.risk_category
            or risk_category_from_score(
                baseline_risk_score
            )
        )

    else:
        baseline_risk_score = 0.0
        baseline_probability = 0.0
        baseline_delay = 0
        baseline_category = "LOW"

    # -----------------------------------------------------
    # Delay impact
    # -----------------------------------------------------

    delay_impact = min(
        delay_days * 0.08,
        25.0,
    )

    # -----------------------------------------------------
    # Compensation impact
    # -----------------------------------------------------

    compensation_impact = min(
        max(
            compensation_change_percent,
            0,
        ) * 0.08,
        15.0,
    )

    # Negative compensation changes can also increase risk.
    if compensation_change_percent < 0:
        compensation_impact = min(
            abs(
                compensation_change_percent
            ) * 0.12,
            15.0,
        )

    # -----------------------------------------------------
    # Affected-family impact
    # -----------------------------------------------------

    family_impact = min(
        max(
            affected_families_change_percent,
            0,
        ) * 0.05,
        10.0,
    )

    if affected_families_change_percent < 0:
        family_impact = min(
            abs(
                affected_families_change_percent
            ) * 0.03,
            10.0,
        )

    # -----------------------------------------------------
    # Legal-dispute impact
    # -----------------------------------------------------

    legal_impact = min(
        max(
            legal_dispute_change,
            0,
        ) * 2.0,
        20.0,
    )

    if legal_dispute_change < 0:
        legal_impact = max(
            legal_dispute_change * 1.0,
            -20.0,
        )

    # -----------------------------------------------------
    # Scenario risk score
    # -----------------------------------------------------

    scenario_score = (
        baseline_risk_score
        + delay_impact
        + compensation_impact
        + family_impact
        + legal_impact
    )

    scenario_score = max(
        0.0,
        min(
            100.0,
            scenario_score,
        ),
    )

    scenario_score = round(
        scenario_score,
        2,
    )

    # -----------------------------------------------------
    # Scenario probability
    # -----------------------------------------------------

    probability_change = (
        delay_impact
        + compensation_impact
        + family_impact
        + legal_impact
    ) / 100.0

    scenario_probability = (
        baseline_probability
        + probability_change
    )

    scenario_probability = max(
        0.0,
        min(
            1.0,
            scenario_probability,
        ),
    )

    scenario_probability = round(
        scenario_probability,
        4,
    )

    # -----------------------------------------------------
    # Expected delay
    # -----------------------------------------------------

    scenario_delay = (
        baseline_delay
        + delay_days
        + max(
            legal_dispute_change,
            0,
        ) * 10
    )

    scenario_delay = max(
        0,
        int(
            round(
                scenario_delay
            )
        ),
    )

    # -----------------------------------------------------
    # Category
    # -----------------------------------------------------

    scenario_category = (
        risk_category_from_score(
            scenario_score
        )
    )

    return {
        "risk_score": scenario_score,
        "risk_category": scenario_category,
        "delay_probability": scenario_probability,
        "expected_delay_days": scenario_delay,
        "baseline_risk_score": int(
            round(
                baseline_risk_score
            )
        ),
        "baseline_risk_category":
            baseline_category,
        "baseline_delay_probability":
            baseline_probability,
        "baseline_expected_delay_days":
            baseline_delay,
    }


# =========================================================
# RUN SIMULATION
# =========================================================

def run_simulation(
    db: Session,
    current_user: User,
    project_id: str,
    delay_days: int = 0,
    compensation_change_percent: float = 0.0,
    affected_families_change_percent: float = 0.0,
    legal_dispute_change: int = 0,
):
    query = (
        db.query(Project)
        .filter(
            Project.project_id
            == project_id
        )
    )

    query = apply_project_scope(
        query,
        current_user,
    )

    project = query.first()

    if not project:
        return None

    risk = get_latest_risk(
        db=db,
        project_id=project_id,
    )

    result = calculate_simulation(
        project=project,
        risk=risk,
        delay_days=delay_days,
        compensation_change_percent=(
            compensation_change_percent
        ),
        affected_families_change_percent=(
            affected_families_change_percent
        ),
        legal_dispute_change=(
            legal_dispute_change
        ),
    )

    simulation_id = (
        "SIM-"
        + datetime.now(
            timezone.utc
        ).strftime(
            "%Y%m%d%H%M%S%f"
        )
    )

    return {
        "simulation_id":
            simulation_id,

        "created_at":
            datetime.now(
                timezone.utc
            ).strftime(
                "%Y-%m-%d %H:%M:%S"
            ),

        "project": {
            "project_id":
                project.project_id,

            "project_name":
                project.project_name,

            "project_type":
                project.project_type,

            "state":
                project.state,

            "district":
                project.district,

            "current_stage":
                project.current_stage,

            "project_status":
                project.project_status,
        },

        "scenario": {
            "delay_days":
                delay_days,

            "compensation_change_percent":
                compensation_change_percent,

            "affected_families_change_percent":
                affected_families_change_percent,

            "legal_dispute_change":
                legal_dispute_change,
        },

        "baseline": {
            "risk_score":
                result[
                    "baseline_risk_score"
                ],

            "risk_category":
                result[
                    "baseline_risk_category"
                ],

            "delay_probability":
                result[
                    "baseline_delay_probability"
                ],

            "expected_delay_days":
                result[
                    "baseline_expected_delay_days"
                ],
        },

        "simulation": {
            "risk_score":
                result[
                    "risk_score"
                ],

            "risk_category":
                result[
                    "risk_category"
                ],

            "delay_probability":
                result[
                    "delay_probability"
                ],

            "expected_delay_days":
                result[
                    "expected_delay_days"
                ],
        },

        "impact": {
            "risk_score_change":
                round(
                    result["risk_score"]
                    - result[
                        "baseline_risk_score"
                    ],
                    2,
                ),

            "delay_probability_change":
                round(
                    result[
                        "delay_probability"
                    ]
                    - result[
                        "baseline_delay_probability"
                    ],
                    4,
                ),

            "expected_delay_change_days":
                (
                    result[
                        "expected_delay_days"
                    ]
                    - result[
                        "baseline_expected_delay_days"
                    ]
                ),
        },
    }


# =========================================================
# SIMULATION HISTORY
# =========================================================

def get_simulation_history(
    db: Session,
    current_user: User,
    project_id: str | None = None,
    page: int = 1,
    page_size: int = 20,
):
    """
    Simulation results are currently calculated on demand.

    No simulation table is assumed in the existing database.
    Therefore this endpoint returns an empty persistent
    history until a simulation-history table is introduced.
    """

    if project_id:

        query = (
            db.query(Project)
            .filter(
                Project.project_id
                == project_id
            )
        )

        query = apply_project_scope(
            query,
            current_user,
        )

        if not query.first():
            return {
                "items": [],
                "page": page,
                "page_size": page_size,
                "total": 0,
                "total_pages": 0,
            }

    return {
        "items": [],
        "page": page,
        "page_size": page_size,
        "total": 0,
        "total_pages": 0,
    }


# =========================================================
# GET SINGLE SIMULATION
# =========================================================

def get_simulation_by_id(
    db: Session,
    current_user: User,
    simulation_id: str,
):
    """
    Simulations are currently generated on demand and are
    not persisted in the existing schema.

    Return None rather than pretending that a historical
    simulation exists.
    """

    return None