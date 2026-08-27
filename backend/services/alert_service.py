from datetime import datetime, timezone

from sqlalchemy import func
from sqlalchemy.orm import Session

from ..models.alert import Alert
from ..models.project import Project
from ..models.risk_history import RiskHistory
from ..models.user import User
from .risk_service import get_latest_risk_query


# =========================================================
# ACCESS CONTROL
# =========================================================

def apply_user_scope(query, current_user: User):
    """
    Apply LandGuard RBAC rules to project-based queries.
    """

    role = current_user.role

    if role == "ADMIN":
        return query

    if role == "STATE_OFFICER":

        if current_user.state != "ALL":
            query = query.filter(
                Project.state == current_user.state
            )

        return query

    if role == "DISTRICT_OFFICER":

        if current_user.state != "ALL":
            query = query.filter(
                Project.state == current_user.state
            )

        if current_user.district != "ALL":
            query = query.filter(
                Project.district == current_user.district
            )

        return query

    if role == "PROJECT_MANAGER":

        return query.filter(
            Project.project_manager_id
            == current_user.user_id
        )

    if role == "ANALYST":

        if current_user.state != "ALL":
            query = query.filter(
                Project.state == current_user.state
            )

        if current_user.district != "ALL":
            query = query.filter(
                Project.district == current_user.district
            )

        return query

    return query.filter(
        Project.project_id == "__NO_ACCESS__"
    )


# =========================================================
# PROJECT ACCESS
# =========================================================

def get_accessible_project(
    db: Session,
    current_user: User,
    project_id: str
):
    query = (
        db.query(Project)
        .filter(
            Project.project_id == project_id
        )
    )

    query = apply_user_scope(
        query,
        current_user
    )

    return query.first()


# =========================================================
# ALERT OVERVIEW
# =========================================================

def get_alert_overview(
    db: Session,
    current_user: User
):

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

    base_query = (
        db.query(Alert)
        .filter(
            Alert.project_id.in_(
                db.query(
                    scoped_project_ids.c.project_id
                )
            )
        )
    )

    total = base_query.count()

    unread = (
        base_query
        .filter(
            func.upper(Alert.status) == "UNREAD"
        )
        .count()
    )

    acknowledged = (
        base_query
        .filter(
            func.upper(Alert.status)
            == "ACKNOWLEDGED"
        )
        .count()
    )

    resolved = (
        base_query
        .filter(
            func.upper(Alert.status)
            == "RESOLVED"
        )
        .count()
    )

    critical = (
        base_query
        .filter(
            func.upper(Alert.severity)
            == "CRITICAL"
        )
        .count()
    )

    high = (
        base_query
        .filter(
            func.upper(Alert.severity)
            == "HIGH"
        )
        .count()
    )

    medium = (
        base_query
        .filter(
            func.upper(Alert.severity)
            == "MEDIUM"
        )
        .count()
    )

    low = (
        base_query
        .filter(
            func.upper(Alert.severity)
            == "LOW"
        )
        .count()
    )

    return {
        "total_alerts": total,
        "unread": unread,
        "acknowledged": acknowledged,
        "resolved": resolved,
        "by_severity": {
            "CRITICAL": critical,
            "HIGH": high,
            "MEDIUM": medium,
            "LOW": low,
        },
    }


# =========================================================
# LIST ALERTS
# =========================================================

def get_alerts(
    db: Session,
    current_user: User,
    severity: str | None = None,
    alert_status: str | None = None,
    alert_type: str | None = None,
    project_id: str | None = None,
    page: int = 1,
    page_size: int = 20,
):

    page = max(page, 1)

    page_size = min(
        max(page_size, 1),
        100
    )

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

    query = (
        db.query(Alert, Project)
        .join(
            Project,
            Project.project_id == Alert.project_id
        )
        .filter(
            Alert.project_id.in_(
                db.query(
                    scoped_project_ids.c.project_id
                )
            )
        )
    )

    if severity:
        query = query.filter(
            func.upper(Alert.severity)
            == severity.upper()
        )

    if alert_status:
        query = query.filter(
            func.upper(Alert.status)
            == alert_status.upper()
        )

    if alert_type:
        query = query.filter(
            func.upper(Alert.alert_type)
            == alert_type.upper()
        )

    if project_id:
        query = query.filter(
            Alert.project_id == project_id
        )

    total = query.count()

    offset = (
        page - 1
    ) * page_size

    records = (
        query
        .order_by(
            Alert.created_at.desc()
        )
        .offset(offset)
        .limit(page_size)
        .all()
    )

    items = []

    for alert, project in records:

        items.append({
            "alert_id": alert.alert_id,
            "project_id": alert.project_id,
            "project_name": project.project_name,
            "state": project.state,
            "district": project.district,
            "alert_type": alert.alert_type,
            "severity": alert.severity,
            "message": alert.message,
            "status": alert.status,
            "created_at": alert.created_at,
            "acknowledged_by": alert.acknowledged_by,
        })

    total_pages = (
        (total + page_size - 1) // page_size
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
# SINGLE ALERT
# =========================================================

def get_alert_by_id(
    db: Session,
    current_user: User,
    alert_id: str
):

    result = (
        db.query(Alert, Project)
        .join(
            Project,
            Project.project_id == Alert.project_id
        )
        .filter(
            Alert.alert_id == alert_id
        )
        .first()
    )

    if not result:
        return None

    alert, project = result

    accessible = get_accessible_project(
        db,
        current_user,
        project.project_id
    )

    if not accessible:
        return None

    return {
        "alert_id": alert.alert_id,
        "project_id": alert.project_id,
        "project_name": project.project_name,
        "state": project.state,
        "district": project.district,
        "alert_type": alert.alert_type,
        "severity": alert.severity,
        "message": alert.message,
        "status": alert.status,
        "created_at": alert.created_at,
        "acknowledged_by": alert.acknowledged_by,
    }


# =========================================================
# ACKNOWLEDGE ALERT
# =========================================================

def acknowledge_alert(
    db: Session,
    current_user: User,
    alert_id: str
):

    result = (
        db.query(Alert, Project)
        .join(
            Project,
            Project.project_id == Alert.project_id
        )
        .filter(
            Alert.alert_id == alert_id
        )
        .first()
    )

    if not result:
        return None

    alert, project = result

    accessible = get_accessible_project(
        db,
        current_user,
        project.project_id
    )

    if not accessible:
        return None

    alert.status = "ACKNOWLEDGED"

    alert.acknowledged_by = (
        current_user.user_id
    )

    db.commit()
    db.refresh(alert)

    return {
        "alert_id": alert.alert_id,
        "status": alert.status,
        "acknowledged_by": alert.acknowledged_by,
        "message": "Alert acknowledged successfully",
    }


# =========================================================
# CREATE MANUAL ALERT
# =========================================================

def create_alert(
    db: Session,
    current_user: User,
    project_id: str,
    alert_type: str,
    severity: str,
    message: str,
):

    if current_user.role not in (
        "ADMIN",
        "STATE_OFFICER"
    ):
        return None

    project = get_accessible_project(
        db,
        current_user,
        project_id
    )

    if not project:
        return None

    alert_id = generate_alert_id(db)

    alert = Alert(
        alert_id=alert_id,
        project_id=project_id,
        alert_type=alert_type,
        severity=severity.upper(),
        message=message,
        status="UNREAD",
        created_at=datetime.now(
            timezone.utc
        ).strftime(
            "%Y-%m-%d %H:%M:%S"
        ),
    )

    db.add(alert)

    try:
        db.commit()
        db.refresh(alert)

    except Exception:
        db.rollback()
        raise

    return alert


# =========================================================
# ALERT ID GENERATOR
# =========================================================

def generate_alert_id(
    db: Session
) -> str:

    latest = (
        db.query(Alert.alert_id)
        .order_by(
            Alert.alert_id.desc()
        )
        .first()
    )

    if not latest or not latest[0]:
        number = 1

    else:
        try:
            number = (
                int(
                    latest[0].split("-")[-1]
                ) + 1
            )

        except (ValueError, AttributeError):
            number = 1

    return f"ALERT-{number:07d}"


# =========================================================
# AUTOMATIC ALERT GENERATION
# =========================================================

def generate_risk_alerts(
    db: Session,
    current_user: User,
    include_medium: bool = False,
):
    """
    Generate alerts from the latest risk prediction
    of every project accessible to the current user.

    Default behaviour:

        CRITICAL -> alert
        HIGH     -> alert
        MEDIUM   -> ignored
        LOW      -> ignored

    Set include_medium=True to include MEDIUM alerts.

    Existing alerts for the same project + risk prediction
    are not duplicated.

    IMPORTANT:
    Alert IDs are generated sequentially BEFORE adding each
    alert to the SQLAlchemy session. This prevents all pending
    alerts from receiving the same ID.
    """

    # ---------------------------------------------------------
    # Get latest risk records
    # ---------------------------------------------------------

    query = get_latest_risk_query(
        db=db,
        current_user=current_user
    )

    records = query.all()

    generated = []
    skipped = 0

    # ---------------------------------------------------------
    # IMPORTANT FIX
    #
    # Get the latest ID ONCE before creating alerts.
    #
    # generate_alert_id(db) cannot be called repeatedly inside
    # this loop because db.add() does not immediately insert
    # the object into the database.
    # ---------------------------------------------------------

    latest = (
        db.query(Alert.alert_id)
        .order_by(
            Alert.alert_id.desc()
        )
        .first()
    )

    if not latest or not latest[0]:

        next_alert_number = 1

    else:

        try:
            next_alert_number = (
                int(
                    latest[0].split("-")[-1]
                ) + 1
            )

        except (ValueError, AttributeError):

            next_alert_number = 1

    # ---------------------------------------------------------
    # Process risk records
    # ---------------------------------------------------------

    for risk, project in records:

        category = (
            risk.risk_category or ""
        ).upper()

        # -----------------------------------------------------
        # CRITICAL
        # -----------------------------------------------------

        if category == "CRITICAL":

            severity = "CRITICAL"

            alert_type = "CRITICAL_RISK"

            message = (
                f"Project {project.project_id} "
                f"has CRITICAL delay risk with "
                f"a risk score of {risk.risk_score}/100 "
                f"and estimated delay of "
                f"{risk.expected_delay_days} days."
            )

        # -----------------------------------------------------
        # HIGH
        # -----------------------------------------------------

        elif category == "HIGH":

            severity = "HIGH"

            alert_type = "HIGH_RISK"

            message = (
                f"Project {project.project_id} "
                f"has HIGH delay risk with "
                f"a risk score of {risk.risk_score}/100 "
                f"and estimated delay of "
                f"{risk.expected_delay_days} days."
            )

        # -----------------------------------------------------
        # MEDIUM
        # -----------------------------------------------------

        elif category == "MEDIUM" and include_medium:

            severity = "MEDIUM"

            alert_type = "MEDIUM_RISK"

            message = (
                f"Project {project.project_id} "
                f"requires monitoring with a "
                f"risk score of {risk.risk_score}/100 "
                f"and estimated delay of "
                f"{risk.expected_delay_days} days."
            )

        # -----------------------------------------------------
        # LOW / ignored
        # -----------------------------------------------------

        else:

            skipped += 1

            continue

        # -----------------------------------------------------
        # Prevent duplicate alerts for same risk record
        # -----------------------------------------------------

        existing = (
            db.query(Alert)
            .filter(
                Alert.project_id
                == project.project_id
            )
            .filter(
                Alert.alert_type
                == alert_type
            )
            .filter(
                Alert.message.contains(
                    str(risk.risk_history_id)
                )
            )
            .first()
        )

        if existing:

            skipped += 1

            continue

        # -----------------------------------------------------
        # Include risk-history ID in message
        # -----------------------------------------------------

        message = (
            message
            + " Risk record: "
            + str(risk.risk_history_id)
            + "."
        )

        # -----------------------------------------------------
        # Generate UNIQUE alert ID
        #
        # This is the critical fix.
        # -----------------------------------------------------

        alert_id = (
            f"ALERT-{next_alert_number:07d}"
        )

        next_alert_number += 1

        # -----------------------------------------------------
        # Create alert
        # -----------------------------------------------------

        alert = Alert(
            alert_id=alert_id,
            project_id=project.project_id,
            alert_type=alert_type,
            severity=severity,
            message=message,
            status="UNREAD",
            created_at=datetime.now(
                timezone.utc
            ).strftime(
                "%Y-%m-%d %H:%M:%S"
            ),
        )

        db.add(alert)

        generated.append({
            "alert_id": alert.alert_id,
            "project_id": project.project_id,
            "project_name": project.project_name,
            "severity": severity,
            "alert_type": alert_type,
            "risk_score": risk.risk_score,
            "risk_category": category,
            "expected_delay_days":
                risk.expected_delay_days,
            "risk_history_id":
                risk.risk_history_id,
        })

    # ---------------------------------------------------------
    # Commit everything
    # ---------------------------------------------------------

    try:

        db.commit()

    except Exception:

        db.rollback()

        raise

    # ---------------------------------------------------------
    # Return result
    # ---------------------------------------------------------

    return {
        "generated_count": len(generated),
        "skipped_count": skipped,
        "alerts": generated,
    }