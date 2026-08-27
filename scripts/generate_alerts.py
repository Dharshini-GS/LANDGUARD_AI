"""
LANDGUARD AI
Alert Generation

Usage:
    python scripts/generate_alerts.py
"""

from pathlib import Path
import sqlite3
from datetime import datetime


BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "database" / "landguard.db"


CRITICAL_THRESHOLD = 81
HIGH_THRESHOLD = 61


def create_alert_table(connection):

    connection.execute("""
        CREATE TABLE IF NOT EXISTS alerts (
            alert_id INTEGER PRIMARY KEY AUTOINCREMENT,
            project_id TEXT,
            alert_type TEXT,
            risk REAL,
            message TEXT,
            status TEXT DEFAULT 'NEW',
            created_at TEXT,
            acknowledged_by INTEGER
        )
    """)

    connection.commit()


def get_projects(connection):

    cursor = connection.execute(
        """
        SELECT
            project_id,
            delay_probability,
            risk_score,
            expected_delay
        FROM predictions
        """
    )

    return cursor.fetchall()


def alert_exists(
    connection,
    project_id,
    alert_type
):

    cursor = connection.execute(
        """
        SELECT COUNT(*)
        FROM alerts
        WHERE project_id = ?
          AND alert_type = ?
          AND status != 'RESOLVED'
        """,
        (
            project_id,
            alert_type
        )
    )

    return cursor.fetchone()[0] > 0


def create_alert(
    connection,
    project_id,
    alert_type,
    risk,
    message
):

    if alert_exists(
        connection,
        project_id,
        alert_type
    ):
        return

    connection.execute(
        """
        INSERT INTO alerts
        (
            project_id,
            alert_type,
            risk,
            message,
            status,
            created_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            project_id,
            alert_type,
            risk,
            message,
            "NEW",
            datetime.now().isoformat()
        )
    )


def main():

    connection = sqlite3.connect(
        DB_PATH
    )

    try:

        create_alert_table(connection)

        projects = get_projects(
            connection
        )

        alert_count = 0

        for row in projects:

            (
                project_id,
                delay_probability,
                risk_score,
                expected_delay
            ) = row

            if delay_probability is None:
                continue

            if delay_probability >= CRITICAL_THRESHOLD:

                message = (
                    f"Project {project_id} "
                    f"is CRITICAL with "
                    f"{delay_probability:.1f}% "
                    f"delay probability. "
                    f"Expected delay: "
                    f"{expected_delay:.0f} days."
                )

                before = connection.total_changes

                create_alert(
                    connection,
                    project_id,
                    "CRITICAL_RISK",
                    delay_probability,
                    message
                )

                if connection.total_changes > before:
                    alert_count += 1

            elif delay_probability >= HIGH_THRESHOLD:

                message = (
                    f"Project {project_id} "
                    f"is HIGH RISK with "
                    f"{delay_probability:.1f}% "
                    f"delay probability."
                )

                before = connection.total_changes

                create_alert(
                    connection,
                    project_id,
                    "HIGH_RISK",
                    delay_probability,
                    message
                )

                if connection.total_changes > before:
                    alert_count += 1

        connection.commit()

        print(
            f"Alert generation completed. "
            f"New alerts: {alert_count}"
        )

    finally:

        connection.close()


if __name__ == "__main__":
    main()
