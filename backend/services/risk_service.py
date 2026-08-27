from sqlalchemy import func
from sqlalchemy.orm import Session

from ..models.project import Project
from ..models.risk_history import RiskHistory
from ..models.user import User


# =========================================================
# ACCESS CONTROL
# =========================================================

def apply_user_scope(query, current_user: User):
    """
    Apply the same RBAC scope used by the Project and
    Analytics APIs.
    """

    role = current_user.role

    # -----------------------------------------------------
    # ADMIN → National access
    # -----------------------------------------------------

    if role == "ADMIN":
        return query

    # -----------------------------------------------------
    # STATE OFFICER → State access
    # -----------------------------------------------------

    if role == "STATE_OFFICER":

        if (
            current_user.state
            and current_user.state != "ALL"
        ):
            query = query.filter(
                Project.state == current_user.state
            )

        return query

    # -----------------------------------------------------
    # DISTRICT OFFICER → State + District
    # -----------------------------------------------------

    if role == "DISTRICT_OFFICER":

        if (
            current_user.state
            and current_user.state != "ALL"
        ):
            query = query.filter(
                Project.state == current_user.state
            )

        if (
            current_user.district
            and current_user.district != "ALL"
        ):
            query = query.filter(
                Project.district == current_user.district
            )

        return query

    # -----------------------------------------------------
    # PROJECT MANAGER → Assigned projects
    # -----------------------------------------------------

    if role == "PROJECT_MANAGER":

        return query.filter(
            Project.project_manager_id
            == current_user.user_id
        )

    # -----------------------------------------------------
    # ANALYST → Permitted state/district
    # -----------------------------------------------------

    if role == "ANALYST":

        if (
            current_user.state
            and current_user.state != "ALL"
        ):
            query = query.filter(
                Project.state == current_user.state
            )

        if (
            current_user.district
            and current_user.district != "ALL"
        ):
            query = query.filter(
                Project.district == current_user.district
            )

        return query

    # -----------------------------------------------------
    # UNKNOWN ROLE → No access
    # -----------------------------------------------------

    return query.filter(
        Project.project_id == "__NO_ACCESS__"
    )


# =========================================================
# LATEST RISK RECORDS
# =========================================================

def get_latest_risk_query(
    db: Session,
    current_user: User
):
    """
    Return the latest risk-history record for every
    project accessible to the current user.

    Uses prediction_date to identify the latest record.
    """

    # -----------------------------------------------------
    # First get the user's permitted projects
    # -----------------------------------------------------

    project_query = db.query(Project)

    project_query = apply_user_scope(
        project_query,
        current_user
    )

    scoped_project_ids = (
        project_query
        .with_entities(Project.project_id)
        .subquery()
    )

    # -----------------------------------------------------
    # Find latest prediction date per project
    # -----------------------------------------------------

    latest_dates = (
        db.query(
            RiskHistory.project_id,
            func.max(
                RiskHistory.prediction_date
            ).label("latest_date")
        )
        .filter(
            RiskHistory.project_id.in_(
                db.query(
                    scoped_project_ids.c.project_id
                )
            )
        )
        .group_by(
            RiskHistory.project_id
        )
        .subquery()
    )

    # -----------------------------------------------------
    # Join latest records with projects
    # -----------------------------------------------------

    query = (
        db.query(
            RiskHistory,
            Project
        )
        .join(
            Project,
            Project.project_id
            == RiskHistory.project_id
        )
        .join(
            latest_dates,
            (
                RiskHistory.project_id
                == latest_dates.c.project_id
            )
            & (
                RiskHistory.prediction_date
                == latest_dates.c.latest_date
            )
        )
    )

    return query


# =========================================================
# RISK OVERVIEW
# =========================================================

def get_risk_overview(
    db: Session,
    current_user: User
) -> dict:
    """
    Return risk statistics based on the latest risk
    prediction for each accessible project.
    """

    query = get_latest_risk_query(
        db,
        current_user
    )

    records = query.all()

    total_projects = len(records)

    # -----------------------------------------------------
    # Risk category counts
    # -----------------------------------------------------

    category_counts = {
        "CRITICAL": 0,
        "HIGH": 0,
        "MEDIUM": 0,
        "LOW": 0,
    }

    total_risk_score = 0
    total_delay_probability = 0.0
    total_expected_delay_days = 0

    for risk, project in records:

        category = (
            risk.risk_category
            or "UNKNOWN"
        ).upper()

        if category not in category_counts:
            category_counts[category] = 0

        category_counts[category] += 1

        total_risk_score += (
            risk.risk_score or 0
        )

        total_delay_probability += (
            risk.delay_probability or 0
        )

        total_expected_delay_days += (
            risk.expected_delay_days or 0
        )

    # -----------------------------------------------------
    # Averages
    # -----------------------------------------------------

    if total_projects > 0:

        average_risk_score = (
            total_risk_score
            / total_projects
        )

        average_delay_probability = (
            total_delay_probability
            / total_projects
        )

        average_expected_delay_days = (
            total_expected_delay_days
            / total_projects
        )

    else:

        average_risk_score = 0
        average_delay_probability = 0
        average_expected_delay_days = 0

    # -----------------------------------------------------
    # Return
    # -----------------------------------------------------

    return {
        "total_projects": total_projects,

        "critical": category_counts.get(
            "CRITICAL",
            0
        ),

        "high": category_counts.get(
            "HIGH",
            0
        ),

        "medium": category_counts.get(
            "MEDIUM",
            0
        ),

        "low": category_counts.get(
            "LOW",
            0
        ),

        "average_risk_score": round(
            average_risk_score,
            2
        ),

        "average_delay_probability": round(
            average_delay_probability,
            4
        ),

        "average_expected_delay_days": round(
            average_expected_delay_days,
            2
        ),
    }


# =========================================================
# RISK PROJECT LIST
# =========================================================

def get_risk_projects(
    db: Session,
    current_user: User,
    risk_category: str | None = None,
    min_risk_score: int | None = None,
    page: int = 1,
    page_size: int = 20,
):
    """
    Return latest risk prediction for each accessible
    project, ordered by risk score descending.
    """

    page = max(
        page,
        1
    )

    page_size = min(
        max(page_size, 1),
        100
    )

    query = get_latest_risk_query(
        db,
        current_user
    )

    # -----------------------------------------------------
    # Filters
    # -----------------------------------------------------

    if risk_category:

        query = query.filter(
            func.upper(
                RiskHistory.risk_category
            )
            == risk_category.upper()
        )

    if min_risk_score is not None:

        query = query.filter(
            RiskHistory.risk_score
            >= min_risk_score
        )

    # -----------------------------------------------------
    # Total
    # -----------------------------------------------------

    total = query.count()

    # -----------------------------------------------------
    # Pagination
    # -----------------------------------------------------

    offset = (
        page - 1
    ) * page_size

    records = (
        query
        .order_by(
            RiskHistory.risk_score.desc(),
            RiskHistory.prediction_date.desc()
        )
        .offset(offset)
        .limit(page_size)
        .all()
    )

    # -----------------------------------------------------
    # Serialize
    # -----------------------------------------------------

    items = []

    for risk, project in records:

        items.append({
            "project_id":
                project.project_id,

            "project_name":
                project.project_name,

            "state":
                project.state,

            "district":
                project.district,

            "current_stage":
                project.current_stage,

            "project_status":
                project.project_status,

            "risk_history_id":
                risk.risk_history_id,

            "prediction_date":
                risk.prediction_date,

            "risk_score":
                risk.risk_score,

            "risk_category":
                risk.risk_category,

            "delay_probability":
                risk.delay_probability,

            "expected_delay_days":
                risk.expected_delay_days,

            "highest_risk_stage":
                risk.highest_risk_stage,

            "model_version":
                risk.model_version,
        })

    total_pages = (
        (total + page_size - 1)
        // page_size
        if total > 0
        else 0
    )

    return {
        "items": items,
        "page": page,
        "page_size": page_size,
        "total": total,
        "total_pages": total_pages,
    }


# =========================================================
# PROJECT RISK HISTORY
# =========================================================

def get_project_risk_history(
    db: Session,
    current_user: User,
    project_id: str
):
    """
    Return complete risk prediction history for a
    single accessible project.
    """

    # -----------------------------------------------------
    # Verify project access
    # -----------------------------------------------------

    project_query = (
        db.query(Project)
        .filter(
            Project.project_id
            == project_id
        )
    )

    project_query = apply_user_scope(
        project_query,
        current_user
    )

    project = project_query.first()

    if not project:
        return None

    # -----------------------------------------------------
    # Get history
    # -----------------------------------------------------

    history = (
        db.query(RiskHistory)
        .filter(
            RiskHistory.project_id
            == project_id
        )
        .order_by(
            RiskHistory.prediction_date.desc()
        )
        .all()
    )

    return {
        "project": {
            "project_id":
                project.project_id,

            "project_name":
                project.project_name,

            "state":
                project.state,

            "district":
                project.district,

            "current_stage":
                project.current_stage,

            "project_status":
                project.project_status,
        },

        "risk_history": [
            {
                "risk_history_id":
                    risk.risk_history_id,

                "project_id":
                    risk.project_id,

                "prediction_date":
                    risk.prediction_date,

                "delay_probability":
                    risk.delay_probability,

                "risk_score":
                    risk.risk_score,

                "risk_category":
                    risk.risk_category,

                "expected_delay_days":
                    risk.expected_delay_days,

                "highest_risk_stage":
                    risk.highest_risk_stage,

                "model_version":
                    risk.model_version,
            }
            for risk in history
        ],

        "total_records":
            len(history),
    }


# =========================================================
# SINGLE PROJECT LATEST RISK
# =========================================================

def get_project_latest_risk(
    db: Session,
    current_user: User,
    project_id: str
):
    """
    Return the latest risk prediction for one project.
    """

    project_query = (
        db.query(Project)
        .filter(
            Project.project_id
            == project_id
        )
    )

    project_query = apply_user_scope(
        project_query,
        current_user
    )

    project = project_query.first()

    if not project:
        return None

    risk = (
        db.query(RiskHistory)
        .filter(
            RiskHistory.project_id
            == project_id
        )
        .order_by(
            RiskHistory.prediction_date.desc()
        )
        .first()
    )

    if not risk:
        return {
            "project": {
                "project_id":
                    project.project_id,

                "project_name":
                    project.project_name,

                "state":
                    project.state,

                "district":
                    project.district,

                "current_stage":
                    project.current_stage,

                "project_status":
                    project.project_status,
            },
            "risk": None,
        }

    return {
        "project": {
            "project_id":
                project.project_id,

            "project_name":
                project.project_name,

            "state":
                project.state,

            "district":
                project.district,

            "current_stage":
                project.current_stage,

            "project_status":
                project.project_status,
        },

        "risk": {
            "risk_history_id":
                risk.risk_history_id,

            "prediction_date":
                risk.prediction_date,

            "delay_probability":
                risk.delay_probability,

            "risk_score":
                risk.risk_score,

            "risk_category":
                risk.risk_category,

            "expected_delay_days":
                risk.expected_delay_days,

            "highest_risk_stage":
                risk.highest_risk_stage,

            "model_version":
                risk.model_version,
        },
    }