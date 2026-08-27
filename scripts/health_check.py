"""
LANDGUARD AI
System Health Check

Usage:
    python scripts/health_check.py
"""

from pathlib import Path
import sqlite3
import sys


BASE_DIR = Path(__file__).resolve().parent.parent

DATA_DIR = BASE_DIR / "data"
MODEL_DIR = BASE_DIR / "models"
DB_PATH = BASE_DIR / "database" / "landguard.db"


def check_directory(path):

    exists = path.exists()

    print(
        f"[{'OK' if exists else 'FAIL'}] "
        f"Directory: {path}"
    )

    return exists


def check_database():

    if not DB_PATH.exists():

        print(
            "[WARN] Database does not exist:"
            f" {DB_PATH}"
        )

        return False

    try:

        connection = sqlite3.connect(
            DB_PATH
        )

        connection.execute(
            "SELECT 1"
        )

        connection.close()

        print(
            f"[OK] Database: {DB_PATH}"
        )

        return True

    except Exception as exc:

        print(
            f"[FAIL] Database: {exc}"
        )

        return False


def check_models():

    classifier = (
        MODEL_DIR
        / "delay_classifier.pkl"
    )

    regressor = (
        MODEL_DIR
        / "delay_regressor.pkl"
    )

    classifier_ok = classifier.exists()
    regressor_ok = regressor.exists()

    print(
        f"[{'OK' if classifier_ok else 'FAIL'}] "
        f"Classifier: {classifier}"
    )

    print(
        f"[{'OK' if regressor_ok else 'WARN'}] "
        f"Regressor: {regressor}"
    )

    return classifier_ok


def check_data():

    csv_files = list(
        DATA_DIR.glob("*.csv")
    )

    if csv_files:

        print(
            f"[OK] CSV files found: "
            f"{len(csv_files)}"
        )

        return True

    print(
        "[WARN] No CSV files found."
    )

    return False


def main():

    print("================================")
    print("LANDGUARD AI HEALTH CHECK")
    print("================================")

    checks = []

    checks.append(
        check_directory(DATA_DIR)
    )

    checks.append(
        check_directory(MODEL_DIR)
    )

    checks.append(
        check_directory(DB_PATH.parent)
    )

    checks.append(
        check_database()
    )

    checks.append(
        check_models()
    )

    checks.append(
        check_data()
    )

    print("\n================================")

    if all(checks):

        print(
            "SYSTEM STATUS: HEALTHY"
        )

        return 0

    print(
        "SYSTEM STATUS: ATTENTION REQUIRED"
    )

    return 1


if __name__ == "__main__":

    sys.exit(
        main()
    )
