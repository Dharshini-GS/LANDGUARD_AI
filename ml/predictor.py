"""
LANDGUARD AI - Delay Prediction
--------------------------------

Loads the trained LANDGUARD XGBoost delay classifier and shared
preprocessor, then predicts delay probability for new project data.

Artifacts:
    models/delay_model.pkl
    models/preprocessor.pkl

Usage:

    python predictor.py

Or import:

    from predictor import predict_delay
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

import joblib
import numpy as np
import pandas as pd

from features import (
    PREDICTION_FEATURES,
    engineer_features,
)


# ---------------------------------------------------------------------------
# PATHS
# ---------------------------------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parent

MODELS_DIR = PROJECT_ROOT / "models"

DEFAULT_MODEL_PATH = MODELS_DIR / "delay_model.pkl"
DEFAULT_PREPROCESSOR_PATH = MODELS_DIR / "preprocessor.pkl"


# ---------------------------------------------------------------------------
# DEFAULT THRESHOLD
# ---------------------------------------------------------------------------
#
# IMPORTANT:
# Use the threshold selected during classifier training.
#
# Your latest model was evaluated at:
#
#     Threshold = 0.36
#
# Therefore we use 0.36 here by default.
#

DEFAULT_THRESHOLD = 0.36


# ---------------------------------------------------------------------------
# MODEL LOADING
# ---------------------------------------------------------------------------

def load_model(
    model_path: str | Path = DEFAULT_MODEL_PATH,
):
    """
    Load the trained XGBoost classifier.
    """

    path = Path(model_path)

    if not path.exists():
        raise FileNotFoundError(
            f"Delay classifier not found: {path}"
        )

    model = joblib.load(path)

    return model


def load_preprocessor(
    preprocessor_path: str | Path = DEFAULT_PREPROCESSOR_PATH,
):
    """
    Load the shared preprocessing pipeline.
    """

    path = Path(preprocessor_path)

    if not path.exists():
        raise FileNotFoundError(
            f"Preprocessor not found: {path}"
        )

    preprocessor = joblib.load(path)

    return preprocessor


# ---------------------------------------------------------------------------
# PREDICTOR CLASS
# ---------------------------------------------------------------------------

class DelayPredictor:
    """
    LANDGUARD AI delay prediction service.

    Loads:

        delay_model.pkl
        preprocessor.pkl

    and performs:

        raw input
            ↓
        feature engineering
            ↓
        preprocessing
            ↓
        XGBoost prediction
            ↓
        delay probability
            ↓
        risk classification
    """

    def __init__(
        self,
        model_path: str | Path = DEFAULT_MODEL_PATH,
        preprocessor_path: str | Path = DEFAULT_PREPROCESSOR_PATH,
        threshold: float = DEFAULT_THRESHOLD,
    ) -> None:

        if not 0 < threshold < 1:
            raise ValueError(
                "threshold must be between 0 and 1."
            )

        print(
            "[LANDGUARD] Loading delay classifier..."
        )

        self.model = load_model(
            model_path
        )

        print(
            "[LANDGUARD] Loading shared preprocessor..."
        )

        self.preprocessor = load_preprocessor(
            preprocessor_path
        )

        self.threshold = float(
            threshold
        )

        print(
            "[LANDGUARD] Predictor ready."
        )

    # -----------------------------------------------------------------------
    # FEATURE PREPARATION
    # -----------------------------------------------------------------------

    def prepare_features(
        self,
        data: pd.DataFrame,
    ) -> pd.DataFrame:
        """
        Convert raw project data into logical prediction features.
        """

        if not isinstance(
            data,
            pd.DataFrame,
        ):
            raise TypeError(
                "Input must be a pandas.DataFrame."
            )

        if data.empty:
            raise ValueError(
                "Input dataframe is empty."
            )

        features = engineer_features(
            data
        )

        # Explicit feature ordering.
        features = features.loc[
            :,
            PREDICTION_FEATURES,
        ].copy()

        return features

    # -----------------------------------------------------------------------
    # TRANSFORM FEATURES
    # -----------------------------------------------------------------------

    def transform_features(
        self,
        data: pd.DataFrame,
    ):
        """
        Engineer and preprocess prediction features.
        """

        features = self.prepare_features(
            data
        )

        transformed = (
            self.preprocessor.transform(
                features
            )
        )

        return transformed

    # -----------------------------------------------------------------------
    # PREDICT PROBABILITY
    # -----------------------------------------------------------------------

    def predict_probability(
        self,
        data: pd.DataFrame,
    ) -> np.ndarray:
        """
        Return probability of project delay.

        Returns:
            numpy array containing P(delayed=1)
        """

        transformed = self.transform_features(
            data
        )

        probability = (
            self.model.predict_proba(
                transformed
            )[:, 1]
        )

        return np.asarray(
            probability,
            dtype=float,
        )

    # -----------------------------------------------------------------------
    # PREDICT CLASS
    # -----------------------------------------------------------------------

    def predict_class(
        self,
        data: pd.DataFrame,
    ) -> np.ndarray:
        """
        Convert delay probabilities into binary predictions.

        0 = not delayed
        1 = delayed
        """

        probability = (
            self.predict_probability(
                data
            )
        )

        return (
            probability >= self.threshold
        ).astype(int)

    # -----------------------------------------------------------------------
    # RISK LEVEL
    # -----------------------------------------------------------------------

    @staticmethod
    def get_risk_level(
        probability: float,
    ) -> str:
        """
        Convert probability into a human-readable risk level.

        LOW:
            < 0.30

        MEDIUM:
            0.30 - 0.59

        HIGH:
            0.60 - 0.79

        CRITICAL:
            >= 0.80
        """

        if probability < 0.30:
            return "LOW"

        if probability < 0.60:
            return "MEDIUM"

        if probability < 0.80:
            return "HIGH"

        return "CRITICAL"

    # -----------------------------------------------------------------------
    # SINGLE PROJECT PREDICTION
    # -----------------------------------------------------------------------

    def predict_one(
        self,
        project: dict[str, Any],
    ) -> dict[str, Any]:
        """
        Predict delay for a single project.

        Parameters
        ----------
        project:
            Dictionary containing project features.

        Returns
        -------
        dict
            Prediction result.
        """

        if not isinstance(
            project,
            dict,
        ):
            raise TypeError(
                "project must be a dictionary."
            )

        data = pd.DataFrame(
            [project]
        )

        probability = float(
            self.predict_probability(
                data
            )[0]
        )

        prediction = int(
            probability >= self.threshold
        )

        risk_level = self.get_risk_level(
            probability
        )

        return {
            "delayed": prediction,

            "prediction": (
                "delayed"
                if prediction == 1
                else "not_delayed"
            ),

            "delay_probability": round(
                probability,
                4,
            ),

            "delay_probability_percent": round(
                probability * 100,
                2,
            ),

            "risk_level": risk_level,

            "threshold": self.threshold,
        }

    # -----------------------------------------------------------------------
    # BATCH PREDICTION
    # -----------------------------------------------------------------------

    def predict(
        self,
        data: pd.DataFrame,
    ) -> pd.DataFrame:
        """
        Predict delay for multiple projects.
        """

        if not isinstance(
            data,
            pd.DataFrame,
        ):
            raise TypeError(
                "Input must be a pandas.DataFrame."
            )

        if data.empty:
            raise ValueError(
                "Input dataframe is empty."
            )

        probability = (
            self.predict_probability(
                data
            )
        )

        prediction = (
            probability >= self.threshold
        ).astype(int)

        result = data.copy()

        result[
            "delay_probability"
        ] = probability.round(4)

        result[
            "delay_probability_percent"
        ] = (
            probability * 100
        ).round(2)

        result[
            "delayed_prediction"
        ] = prediction

        result[
            "prediction"
        ] = np.where(
            prediction == 1,
            "delayed",
            "not_delayed",
        )

        result[
            "risk_level"
        ] = [
            self.get_risk_level(
                float(p)
            )
            for p in probability
        ]

        return result


# ---------------------------------------------------------------------------
# CONVENIENCE FUNCTION
# ---------------------------------------------------------------------------

_predictor = None


def predict_delay(
    project: dict[str, Any],
    *,
    threshold: float = DEFAULT_THRESHOLD,
    model_path: str | Path = DEFAULT_MODEL_PATH,
    preprocessor_path: str | Path = DEFAULT_PREPROCESSOR_PATH,
) -> dict[str, Any]:
    """
    Simple public function for API/backend integration.

    Example:

        result = predict_delay({
            "land_area": 500,
            "affected_families": 300,
            ...
        })

    Returns:

        {
            "delayed": 1,
            "prediction": "delayed",
            "delay_probability": 0.82,
            "delay_probability_percent": 82.0,
            "risk_level": "CRITICAL",
            "threshold": 0.36
        }
    """

    global _predictor

    if _predictor is None:

        _predictor = DelayPredictor(
            model_path=model_path,
            preprocessor_path=preprocessor_path,
            threshold=threshold,
        )

    return _predictor.predict_one(
        project
    )


# ---------------------------------------------------------------------------
# CSV PREDICTION
# ---------------------------------------------------------------------------

def predict_csv(
    input_path: str | Path,
    output_path: str | Path,
    *,
    threshold: float = DEFAULT_THRESHOLD,
    model_path: str | Path = DEFAULT_MODEL_PATH,
    preprocessor_path: str | Path = DEFAULT_PREPROCESSOR_PATH,
) -> Path:
    """
    Load projects from CSV, predict delays, and save results.
    """

    input_file = Path(
        input_path
    )

    if not input_file.exists():
        raise FileNotFoundError(
            f"Input CSV not found: {input_file}"
        )

    if input_file.suffix.lower() != ".csv":
        raise ValueError(
            "Input file must be a CSV."
        )

    data = pd.read_csv(
        input_file
    )

    predictor = DelayPredictor(
        model_path=model_path,
        preprocessor_path=preprocessor_path,
        threshold=threshold,
    )

    result = predictor.predict(
        data
    )

    output_file = Path(
        output_path
    )

    output_file.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    result.to_csv(
        output_file,
        index=False,
    )

    print(
        f"[LANDGUARD] Predictions saved: "
        f"{output_file}"
    )

    return output_file


# ---------------------------------------------------------------------------
# DEMO PROJECT
# ---------------------------------------------------------------------------

def create_demo_project() -> dict[str, Any]:
    """
    Create a sample project for testing predictor.py.

    Missing fields are automatically handled by features.py,
    but this example contains the major model inputs.
    """

    return {
        "project_id": "DEMO001",

        "project_name": "LANDGUARD Demo Project",

        "project_type": "Highway",

        "state": "Tamil Nadu",

        "district": "District A",

        "land_area": 650,

        "affected_families": 420,

        "landowners": 280,

        "notification_pending_days": 75,

        "documentation_completion_pct": 58,

        "ownership_conflict_count": 12,

        "possession_pct": 48,

        "compensation_amount": 50000000,

        "compensation_completed_pct": 42,

        "pending_compensation_cases": 65,

        "average_processing_days": 38,

        "pending_compensation_amount": 25000000,

        "legal_disputes": 18,

        "pending_legal_cases": 14,

        "average_legal_resolution_time": 120,

        "pending_approvals": 7,

        "approval_delay_days": 65,

        "rr_completion_pct": 45,

        "rr_waiting_families": 80,

        "pending_resettlement_cases": 35,

        "avg_stakeholder_response_time": 42,

        "pending_requests": 28,

        "department_coordination_score": 52,

        "administrative_bottleneck_count": 8,

        "notification_status": "Pending",

        "ownership_status": "Conflict",

        "compensation_status": "Pending",

        "legal_status": "Pending",

        "approval_status": "Pending",
    }


# ---------------------------------------------------------------------------
# COMMAND LINE
# ---------------------------------------------------------------------------

def parse_args() -> argparse.Namespace:

    parser = argparse.ArgumentParser(
        description=(
            "LANDGUARD AI delay prediction."
        )
    )

    parser.add_argument(
        "--data",
        type=str,
        default=None,
        help=(
            "Input CSV containing project records."
        ),
    )

    parser.add_argument(
        "--output",
        type=str,
        default="predictions.csv",
        help=(
            "Output CSV path."
        ),
    )

    parser.add_argument(
        "--threshold",
        type=float,
        default=DEFAULT_THRESHOLD,
        help=(
            "Delay probability threshold. "
            "Default: 0.36"
        ),
    )

    parser.add_argument(
        "--model-path",
        type=str,
        default=str(
            DEFAULT_MODEL_PATH
        ),
        help=(
            "Path to delay_model.pkl."
        ),
    )

    parser.add_argument(
        "--preprocessor-path",
        type=str,
        default=str(
            DEFAULT_PREPROCESSOR_PATH
        ),
        help=(
            "Path to preprocessor.pkl."
        ),
    )

    return parser.parse_args()


# ---------------------------------------------------------------------------
# MAIN
# ---------------------------------------------------------------------------

def main() -> None:

    args = parse_args()

    predictor = DelayPredictor(
        model_path=args.model_path,
        preprocessor_path=args.preprocessor_path,
        threshold=args.threshold,
    )

    # -----------------------------------------------------------------------
    # CSV MODE
    # -----------------------------------------------------------------------

    if args.data:

        output = predictor.predict(
            pd.read_csv(
                args.data
            )
        )

        output_path = Path(
            args.output
        )

        output_path.parent.mkdir(
            parents=True,
            exist_ok=True,
        )

        output.to_csv(
            output_path,
            index=False,
        )

        print()
        print(
            "=" * 60
        )
        print(
            "LANDGUARD AI - BATCH PREDICTION"
        )
        print(
            "=" * 60
        )

        print(
            f"Input rows: {len(output):,}"
        )

        print(
            f"Delayed predictions: "
            f"{int(output['delayed_prediction'].sum()):,}"
        )

        print(
            f"Not delayed predictions: "
            f"{int((output['delayed_prediction'] == 0).sum()):,}"
        )

        print(
            f"Output: {output_path}"
        )

        return

    # -----------------------------------------------------------------------
    # DEMO MODE
    # -----------------------------------------------------------------------

    demo_project = create_demo_project()

    result = predictor.predict_one(
        demo_project
    )

    print()
    print(
        "=" * 60
    )
    print(
        "LANDGUARD AI - DELAY PREDICTION"
    )
    print(
        "=" * 60
    )

    print(
        json.dumps(
            result,
            indent=2,
        )
    )

    print(
        "=" * 60
    )


# ---------------------------------------------------------------------------
# ENTRY POINT
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    main()
