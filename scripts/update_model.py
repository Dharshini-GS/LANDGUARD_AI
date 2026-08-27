"""
LANDGUARD AI
Model Update / Retraining Script

Usage:
    python scripts/update_model.py

The script:
    1. Retrains the model.
    2. Evaluates it.
    3. Keeps the existing production model unless
       the candidate passes the acceptance criteria.
"""

from pathlib import Path
import json
import shutil
import subprocess
import sys
from datetime import datetime


BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "models"

METRICS_FILE = MODEL_DIR / "model_metrics.json"

CLASSIFIER_FILE = MODEL_DIR / "delay_classifier.pkl"
REGRESSOR_FILE = MODEL_DIR / "delay_regressor.pkl"

BACKUP_DIR = MODEL_DIR / "backup"


def load_metrics():

    if not METRICS_FILE.exists():
        return None

    with open(
        METRICS_FILE,
        "r",
        encoding="utf-8"
    ) as file:

        return json.load(file)


def backup_models():

    BACKUP_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    timestamp = datetime.now().strftime(
        "%Y%m%d_%H%M%S"
    )

    backup_path = BACKUP_DIR / timestamp

    backup_path.mkdir(
        parents=True,
        exist_ok=True
    )

    for model_file in [
        CLASSIFIER_FILE,
        REGRESSOR_FILE,
        METRICS_FILE,
    ]:

        if model_file.exists():

            shutil.copy2(
                model_file,
                backup_path / model_file.name
            )

    return backup_path


def main():

    print("================================")
    print("LANDGUARD AI MODEL UPDATE")
    print("================================")

    old_metrics = load_metrics()

    if old_metrics:
        print("\nCurrent model:")
        print(
            json.dumps(
                old_metrics,
                indent=2
            )
        )

    # Backup current model
    if CLASSIFIER_FILE.exists():

        backup_path = backup_models()

        print(
            f"\nCurrent model backed up to:"
            f"\n{backup_path}"
        )

    print("\nTraining candidate model...")

    train_script = (
        BASE_DIR
        / "scripts"
        / "train_model.py"
    )

    result = subprocess.run(
        [
            sys.executable,
            str(train_script)
        ],
        capture_output=True,
        text=True
    )

    print(result.stdout)

    if result.returncode != 0:

        print(result.stderr)

        raise RuntimeError(
            "Candidate model training failed."
        )

    new_metrics = load_metrics()

    if not new_metrics:

        raise RuntimeError(
            "No model metrics generated."
        )

    print("\nCandidate metrics:")
    print(
        json.dumps(
            new_metrics,
            indent=2
        )
    )

    # Simple acceptance criteria
    # You can make this more sophisticated later.

    if old_metrics:

        old_recall = (
            old_metrics
            .get("classification", {})
            .get("recall", 0)
        )

        new_recall = (
            new_metrics
            .get("classification", {})
            .get("recall", 0)
        )

        old_f1 = (
            old_metrics
            .get("classification", {})
            .get("f1", 0)
        )

        new_f1 = (
            new_metrics
            .get("classification", {})
            .get("f1", 0)
        )

        candidate_is_better = (
            new_recall >= old_recall
            and new_f1 >= old_f1
        )

        if candidate_is_better:

            print(
                "\nCandidate model PASSED "
                "acceptance criteria."
            )

            print(
                "Candidate model retained."
            )

        else:

            print(
                "\nCandidate model did NOT "
                "improve sufficiently."
            )

            print(
                "Review metrics before deployment."
            )

    else:

        print(
            "\nNo previous production model."
        )

        print(
            "Candidate model accepted as "
            "initial model."
        )

    print("\nModel update process completed.")


if __name__ == "__main__":
    main()
