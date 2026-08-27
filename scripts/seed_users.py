"""
LANDGUARD AI
Seed Demo Users

Usage:
    python scripts/seed_users.py
"""

from pathlib import Path
import sqlite3
import hashlib
import secrets
from datetime import datetime


BASE_DIR = Path(__file__).resolve().parent.parent
DB_PATH = BASE_DIR / "database" / "landguard.db"


USERS = [
    {
        "username": "admin",
        "password": "Admin@123",
        "role": "admin",
        "state_id": None,
        "district_id": None,
    },
    {
        "username": "state_officer",
        "password": "State@123",
        "role": "state_officer",
        "state_id": "Tamil Nadu",
        "district_id": None,
    },
    {
        "username": "district_officer",
        "password": "District@123",
        "role": "district_officer",
        "state_id": "Tamil Nadu",
        "district_id": "District-1",
    },
    {
        "username": "project_manager",
        "password": "Manager@123",
        "role": "project_manager",
        "state_id": "Tamil Nadu",
        "district_id": "District-1",
    },
    {
        "username": "analytics",
        "password": "Analytics@123",
        "role": "analytics_officer",
        "state_id": None,
        "district_id": None,
    },
]


def hash_password(password):

    salt = secrets.token_hex(16)

    password_hash = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt.encode("utf-8"),
        100000
    ).hex()

    return f"{salt}${password_hash}"


def create_table(connection):

    connection.execute("""
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL,
            state_id TEXT,
            district_id TEXT,
            status TEXT DEFAULT 'active',
            created_at TEXT NOT NULL
        )
    """)

    connection.commit()


def seed_users():

    DB_PATH.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    connection = sqlite3.connect(DB_PATH)

    try:

        create_table(connection)

        for user in USERS:

            password_hash = hash_password(
                user["password"]
            )

            connection.execute(
                """
                INSERT OR REPLACE INTO users
                (
                    username,
                    password_hash,
                    role,
                    state_id,
                    district_id,
                    status,
                    created_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    user["username"],
                    password_hash,
                    user["role"],
                    user["state_id"],
                    user["district_id"],
                    "active",
                    datetime.now().isoformat(),
                )
            )

        connection.commit()

    finally:

        connection.close()

    print("\nDemo users seeded successfully.")

    print("\nLogin credentials:")

    for user in USERS:

        print(
            f"{user['role']:20} "
            f"{user['username']:20} "
            f"{user['password']}"
        )


if __name__ == "__main__":
    seed_users()
