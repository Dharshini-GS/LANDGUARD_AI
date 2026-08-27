from datetime import datetime, timezone

from sqlalchemy import inspect, text
from sqlalchemy.orm import Session

from ..models.user import User


# =========================================================
# HELPERS
# =========================================================

def _get_audit_table(db: Session):
    """
    Return the existing audit table name if one exists.

    The project database may already contain an audit table,
    so we inspect the database instead of assuming a schema.
    """

    inspector = inspect(db.bind)

    tables = inspector.get_table_names()

    candidates = [
        "audit_logs",
        "audit_log",
        "audits",
    ]

    for table in candidates:
        if table in tables:
            return table

    return None


def _get_columns(
    db: Session,
    table_name: str,
):
    inspector = inspect(db.bind)

    return [
        column["name"]
        for column in inspector.get_columns(
            table_name
        )
    ]


def _serialize_row(
    row,
    columns,
):
    data = {}

    for index, column in enumerate(columns):
        value = row[index]

        if isinstance(
            value,
            datetime,
        ):
            value = value.isoformat()

        data[column] = value

    return data


# =========================================================
# AUDIT OVERVIEW
# =========================================================

def get_audit_overview(
    db: Session,
    current_user: User,
):
    table_name = _get_audit_table(db)

    if not table_name:
        return {
            "total_logs": 0,
            "message": "Audit log table is not available",
            "by_action": {},
            "by_entity_type": {},
        }

    columns = _get_columns(
        db,
        table_name,
    )

    # -----------------------------------------------------
    # Total
    # -----------------------------------------------------

    total = db.execute(
        text(
            f"SELECT COUNT(*) FROM "
            f'"{table_name}"'
        )
    ).scalar() or 0

    # -----------------------------------------------------
    # Action distribution
    # -----------------------------------------------------

    by_action = {}

    if "action" in columns:

        rows = db.execute(
            text(
                f'''
                SELECT action, COUNT(*)
                FROM "{table_name}"
                GROUP BY action
                ORDER BY COUNT(*) DESC
                '''
            )
        ).fetchall()

        for action, count in rows:
            by_action[
                action or "UNKNOWN"
            ] = count

    # -----------------------------------------------------
    # Entity distribution
    # -----------------------------------------------------

    by_entity_type = {}

    if "entity_type" in columns:

        rows = db.execute(
            text(
                f'''
                SELECT entity_type, COUNT(*)
                FROM "{table_name}"
                GROUP BY entity_type
                ORDER BY COUNT(*) DESC
                '''
            )
        ).fetchall()

        for entity_type, count in rows:
            by_entity_type[
                entity_type or "UNKNOWN"
            ] = count

    return {
        "total_logs": total,
        "by_action": by_action,
        "by_entity_type": by_entity_type,
    }


# =========================================================
# GET AUDIT LOGS
# =========================================================

def get_audit_logs(
    db: Session,
    current_user: User,
    user_id: str | None = None,
    action: str | None = None,
    entity_type: str | None = None,
    entity_id: str | None = None,
    page: int = 1,
    page_size: int = 20,
):
    table_name = _get_audit_table(db)

    if not table_name:
        return {
            "items": [],
            "page": page,
            "page_size": page_size,
            "total": 0,
            "total_pages": 0,
        }

    columns = _get_columns(
        db,
        table_name,
    )

    conditions = []
    parameters = {}

    # -----------------------------------------------------
    # Filters
    # -----------------------------------------------------

    if user_id and "user_id" in columns:
        conditions.append(
            '"user_id" = :user_id'
        )
        parameters["user_id"] = user_id

    if action and "action" in columns:
        conditions.append(
            '"action" = :action'
        )
        parameters["action"] = action

    if (
        entity_type
        and "entity_type" in columns
    ):
        conditions.append(
            '"entity_type" = :entity_type'
        )
        parameters[
            "entity_type"
        ] = entity_type

    if entity_id and "entity_id" in columns:
        conditions.append(
            '"entity_id" = :entity_id'
        )
        parameters["entity_id"] = entity_id

    where_clause = ""

    if conditions:
        where_clause = (
            " WHERE "
            + " AND ".join(
                conditions
            )
        )

    # -----------------------------------------------------
    # Total
    # -----------------------------------------------------

    total = db.execute(
        text(
            f'''
            SELECT COUNT(*)
            FROM "{table_name}"
            {where_clause}
            '''
        ),
        parameters,
    ).scalar() or 0

    # -----------------------------------------------------
    # Ordering
    # -----------------------------------------------------

    if "created_at" in columns:
        order_column = '"created_at"'
    elif "timestamp" in columns:
        order_column = '"timestamp"'
    elif "audit_id" in columns:
        order_column = '"audit_id"'
    else:
        order_column = "rowid"

    # -----------------------------------------------------
    # Pagination
    # -----------------------------------------------------

    offset = (
        page - 1
    ) * page_size

    query_parameters = dict(
        parameters
    )

    query_parameters[
        "limit"
    ] = page_size

    query_parameters[
        "offset"
    ] = offset

    rows = db.execute(
        text(
            f'''
            SELECT *
            FROM "{table_name}"
            {where_clause}
            ORDER BY {order_column} DESC
            LIMIT :limit
            OFFSET :offset
            '''
        ),
        query_parameters,
    ).fetchall()

    items = [
        _serialize_row(
            row,
            columns,
        )
        for row in rows
    ]

    total_pages = (
        (
            total
            + page_size
            - 1
        )
        // page_size
        if total
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
# GET SINGLE AUDIT LOG
# =========================================================

def get_audit_log_by_id(
    db: Session,
    current_user: User,
    audit_id: str,
):
    table_name = _get_audit_table(db)

    if not table_name:
        return None

    columns = _get_columns(
        db,
        table_name,
    )

    id_column = None

    for candidate in [
        "audit_id",
        "log_id",
        "id",
    ]:
        if candidate in columns:
            id_column = candidate
            break

    if not id_column:
        return None

    row = db.execute(
        text(
            f'''
            SELECT *
            FROM "{table_name}"
            WHERE "{id_column}" = :audit_id
            LIMIT 1
            '''
        ),
        {
            "audit_id": audit_id
        },
    ).fetchone()

    if not row:
        return None

    return _serialize_row(
        row,
        columns,
    )


# =========================================================
# CREATE AUDIT LOG
# =========================================================

def create_audit_log(
    db: Session,
    user: User | None,
    action: str,
    entity_type: str,
    entity_id: str | None = None,
    description: str | None = None,
):
    """
    Create an audit entry when the existing database
    contains a compatible audit table.

    This function is intentionally defensive because
    the existing database schema was created separately.
    """

    table_name = _get_audit_table(db)

    if not table_name:
        return None

    columns = _get_columns(
        db,
        table_name,
    )

    values = {}
    insert_columns = []

    if "user_id" in columns:
        values["user_id"] = (
            user.user_id
            if user
            else None
        )
        insert_columns.append(
            "user_id"
        )

    if "action" in columns:
        values["action"] = action
        insert_columns.append(
            "action"
        )

    if "entity_type" in columns:
        values[
            "entity_type"
        ] = entity_type
        insert_columns.append(
            "entity_type"
        )

    if (
        entity_id is not None
        and "entity_id" in columns
    ):
        values["entity_id"] = entity_id
        insert_columns.append(
            "entity_id"
        )

    if (
        description is not None
        and "description" in columns
    ):
        values[
            "description"
        ] = description
        insert_columns.append(
            "description"
        )

    if "created_at" in columns:
        values[
            "created_at"
        ] = datetime.now(
            timezone.utc
        ).strftime(
            "%Y-%m-%d %H:%M:%S"
        )
        insert_columns.append(
            "created_at"
        )

    if not insert_columns:
        return None

    column_sql = ", ".join(
        f'"{column}"'
        for column in insert_columns
    )

    value_sql = ", ".join(
        f":{column}"
        for column in insert_columns
    )

    db.execute(
        text(
            f'''
            INSERT INTO "{table_name}"
            ({column_sql})
            VALUES ({value_sql})
            '''
        ),
        values,
    )

    db.commit()

    return True