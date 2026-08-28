"""
LANDGUARD AI - Scenario Simulator
---------------------------------

What-if simulation engine for LANDGUARD AI.

Purpose:
    Simulate project interventions and estimate their effect on:

        - Delay probability
        - Predicted delay days
        - Risk score
        - Risk level

The simulator does NOT modify the original project data.

Expected model files:

    models/
        delay_model.pkl
        delay_regressor.pkl
        preprocessor.pkl
"""

from __future__ import annotations

from pathlib import Path
from typing import Any, Optional

import joblib
import numpy as np
import pandas as pd

from preprocessing import (
    load_preprocessor,
    transform_features,
)


# ============================================================================
# PATHS
# ============================================================================

# scenario_simulator.py is directly inside the "pep ml" folder.
PROJECT_ROOT = Path(__file__).resolve().parent

MODELS_DIR = PROJECT_ROOT / "models"

# Actual LANDGUARD model filenames
CLASSIFIER_PATH = MODELS_DIR / "delay_model.pkl"

REGRESSOR_PATH = MODELS_DIR / "delay_regressor.pkl"

PREPROCESSOR_PATH = MODELS_DIR / "preprocessor.pkl"


# ============================================================================
# RISK LEVEL
# ============================================================================

def get_risk_level(
    risk_score: float,
) -> str:

    score = float(
        np.clip(
            risk_score,
            0.0,
            1.0,
        )
    )

    if score < 0.35:
        return "LOW"

    if score < 0.65:
        return "MODERATE"

    if score < 0.80:
        return "HIGH"

    return "CRITICAL"


# ============================================================================
# SAFE VALUE HELPERS
# ============================================================================

def _safe_float(
    value: Any,
    default: float = 0.0,
) -> float:

    try:

        result = float(value)

        if not np.isfinite(result):
            return default

        return result

    except (
        TypeError,
        ValueError,
    ):

        return default


def _clip_pct(
    value: Any,
) -> float:

    return float(
        np.clip(
            _safe_float(value),
            0.0,
            100.0,
        )
    )


# ============================================================================
# MODEL LOADING
# ============================================================================

def load_classifier(
    path: Optional[str | Path] = None,
):

    model_path = (
        Path(path)
        if path is not None
        else CLASSIFIER_PATH
    )

    if not model_path.exists():

        raise FileNotFoundError(
            f"Classifier not found: {model_path}"
        )

    model = joblib.load(model_path)

    if not hasattr(model, "predict"):

        raise TypeError(
            "Loaded classifier is not a valid model."
        )

    return model


def load_regressor(
    path: Optional[str | Path] = None,
):

    model_path = (
        Path(path)
        if path is not None
        else REGRESSOR_PATH
    )

    if not model_path.exists():

        raise FileNotFoundError(
            f"Regressor not found: {model_path}"
        )

    model = joblib.load(model_path)

    if not hasattr(model, "predict"):

        raise TypeError(
            "Loaded regressor is not a valid model."
        )

    return model


# ============================================================================
# MODEL PREDICTION
# ============================================================================

def _predict_probability(
    classifier,
    transformed,
) -> float:

    if hasattr(
        classifier,
        "predict_proba",
    ):

        probability = (
            classifier
            .predict_proba(
                transformed
            )[0]
        )

        if len(probability) >= 2:

            return float(
                probability[1]
            )

        return float(
            probability[0]
        )

    if hasattr(
        classifier,
        "decision_function",
    ):

        score = float(
            classifier
            .decision_function(
                transformed
            )[0]
        )

        score = np.clip(
            score,
            -50,
            50,
        )

        return float(
            1.0
            / (
                1.0
                + np.exp(-score)
            )
        )

    prediction = classifier.predict(
        transformed
    )[0]

    return float(prediction)


# ============================================================================
# PROJECT RISK SCORE
# ============================================================================

def calculate_risk_score(
    project: pd.Series | dict | pd.DataFrame,
) -> float:

    if isinstance(
        project,
        pd.DataFrame,
    ):

        if len(project) != 1:
            raise ValueError(
                "Expected one project row."
            )

        row = project.iloc[0]

    elif isinstance(
        project,
        pd.Series,
    ):

        row = project

    elif isinstance(
        project,
        dict,
    ):

        row = pd.Series(project)

    else:

        raise TypeError(
            "project must be a dict, Series, "
            "or one-row DataFrame."
        )

    compensation_risk = (
        1.0
        - (
            _clip_pct(
                row.get(
                    "compensation_completed_pct",
                    0,
                )
            )
            / 100.0
        )
    )

    documentation_risk = (
        1.0
        - (
            _clip_pct(
                row.get(
                    "documentation_completion_pct",
                    0,
                )
            )
            / 100.0
        )
    )

    rr_risk = (
        1.0
        - (
            _clip_pct(
                row.get(
                    "rr_completion_pct",
                    0,
                )
            )
            / 100.0
        )
    )

    possession_risk = (
        1.0
        - (
            _clip_pct(
                row.get(
                    "possession_pct",
                    0,
                )
            )
            / 100.0
        )
    )

    approval_risk = np.clip(
        _safe_float(
            row.get(
                "approval_delay_days",
                0,
            )
        )
        / 60.0,
        0.0,
        1.0,
    )

    notification_risk = np.clip(
        _safe_float(
            row.get(
                "notification_pending_days",
                0,
            )
        )
        / 100.0,
        0.0,
        1.0,
    )

    legal_risk = np.clip(
        _safe_float(
            row.get(
                "pending_legal_cases",
                0,
            )
        )
        / 12.0,
        0.0,
        1.0,
    )

    ownership_risk = np.clip(
        _safe_float(
            row.get(
                "ownership_conflict_count",
                0,
            )
        )
        / 8.0,
        0.0,
        1.0,
    )

    stakeholder_risk = np.clip(
        _safe_float(
            row.get(
                "avg_stakeholder_response_time",
                0,
            )
        )
        / 45.0,
        0.0,
        1.0,
    )

    administrative_risk = np.clip(
        _safe_float(
            row.get(
                "administrative_bottleneck_count",
                0,
            )
        )
        / 7.0,
        0.0,
        1.0,
    )

    weighted_score = (

        2.8 * compensation_risk

        + 2.4 * approval_risk

        + 2.2 * legal_risk

        + 2.0 * documentation_risk

        + 1.8 * rr_risk

        + 1.7 * possession_risk

        + 1.5 * ownership_risk

        + 1.2 * notification_risk

        + 1.0 * stakeholder_risk

        + 0.9 * administrative_risk

        + 0.4 * (
            _safe_float(
                row.get(
                    "pending_compensation_cases",
                    0,
                )
            )
            / 30.0
        )

        + 0.3 * (
            _safe_float(
                row.get(
                    "pending_approvals",
                    0,
                )
            )
            / 5.0
        )
    )

    risk_score = weighted_score / 18.5

    return float(
        np.clip(
            risk_score,
            0.0,
            1.0,
        )
    )


# ============================================================================
# SINGLE PROJECT PREDICTION
# ============================================================================

def evaluate_project(
    project: pd.Series | dict | pd.DataFrame,
    classifier=None,
    regressor=None,
    preprocessor=None,
) -> dict:

    if isinstance(project, dict):

        data = pd.DataFrame([project])

    elif isinstance(project, pd.Series):

        data = project.to_frame().T

    elif isinstance(project, pd.DataFrame):

        if len(project) != 1:

            raise ValueError(
                "evaluate_project() expects "
                "one project row."
            )

        data = project.copy()

    else:

        raise TypeError(
            "project must be a dict, Series, "
            "or DataFrame."
        )

    if classifier is None:
        classifier = load_classifier()

    if regressor is None:
        regressor = load_regressor()

    if preprocessor is None:
        preprocessor = load_preprocessor()

    transformed = transform_features(
        data,
        preprocessor,
    )

    delay_probability = _predict_probability(
        classifier,
        transformed,
    )

    predicted_delay_days = float(
        regressor.predict(
            transformed
        )[0]
    )

    risk_score = calculate_risk_score(data)

    return {

        "project_id":
            data.iloc[0].get(
                "project_id",
                None,
            ),

        "delay_probability":
            round(
                delay_probability,
                4,
            ),

        "delay_percentage":
            round(
                delay_probability * 100.0,
                2,
            ),

        "predicted_delay_days":
            round(
                max(
                    0.0,
                    predicted_delay_days,
                ),
                2,
            ),

        "risk_score":
            round(
                risk_score,
                4,
            ),

        "risk_percentage":
            round(
                risk_score * 100.0,
                2,
            ),

        "risk_level":
            get_risk_level(
                risk_score
            ),
    }


# ============================================================================
# SCENARIO APPLICATION
# ============================================================================

def apply_scenario(
    project: pd.Series | dict | pd.DataFrame,
    changes: dict[str, Any],
) -> pd.DataFrame:

    if isinstance(project, dict):

        data = pd.DataFrame([project])

    elif isinstance(project, pd.Series):

        data = project.to_frame().T

    elif isinstance(project, pd.DataFrame):

        if len(project) != 1:

            raise ValueError(
                "apply_scenario() expects "
                "one project row."
            )

        data = project.copy()

    else:

        raise TypeError(
            "project must be a dict, Series, "
            "or DataFrame."
        )

    scenario = data.copy()

    for column, value in changes.items():

        scenario[column] = value

    return scenario


# ============================================================================
# SCENARIO SIMULATION
# ============================================================================

def simulate_scenario(
    project,
    changes,
    classifier=None,
    regressor=None,
    preprocessor=None,
    scenario_name="Custom Scenario",
) -> dict:

    baseline = evaluate_project(
        project,
        classifier=classifier,
        regressor=regressor,
        preprocessor=preprocessor,
    )

    scenario_project = apply_scenario(
        project,
        changes,
    )

    scenario = evaluate_project(
        scenario_project,
        classifier=classifier,
        regressor=regressor,
        preprocessor=preprocessor,
    )

    probability_change = (
        baseline["delay_probability"]
        - scenario["delay_probability"]
    )

    delay_days_change = (
        baseline["predicted_delay_days"]
        - scenario["predicted_delay_days"]
    )

    risk_change = (
        baseline["risk_score"]
        - scenario["risk_score"]
    )

    return {

        "scenario_name":
            scenario_name,

        "baseline":
            baseline,

        "scenario":
            scenario,

        "improvement": {

            "delay_probability_reduction":
                round(
                    probability_change,
                    4,
                ),

            "delay_percentage_reduction":
                round(
                    probability_change * 100.0,
                    2,
                ),

            "predicted_delay_days_reduction":
                round(
                    delay_days_change,
                    2,
                ),

            "risk_score_reduction":
                round(
                    risk_change,
                    4,
                ),

            "risk_percentage_reduction":
                round(
                    risk_change * 100.0,
                    2,
                ),

            "risk_level_changed":
                (
                    baseline["risk_level"]
                    != scenario["risk_level"]
                ),
        },

        "applied_changes":
            changes,
    }


# ============================================================================
# PREDEFINED SCENARIOS
# ============================================================================

def scenario_compensation_recovery(
    project,
    completion_pct=90.0,
    pending_cases=3,
    **kwargs,
):

    return simulate_scenario(
        project,
        {
            "compensation_completed_pct":
                _clip_pct(completion_pct),

            "pending_compensation_cases":
                max(
                    0,
                    int(pending_cases),
                ),
        },
        scenario_name="Compensation Recovery",
        **kwargs,
    )


def scenario_legal_resolution(
    project,
    remaining_cases=2,
    **kwargs,
):

    return simulate_scenario(
        project,
        {
            "pending_legal_cases":
                max(
                    0,
                    int(remaining_cases),
                ),

            "legal_disputes":
                max(
                    0,
                    int(remaining_cases),
                ),
        },
        scenario_name="Legal Case Resolution",
        **kwargs,
    )


def scenario_approval_fast_track(
    project,
    approval_delay_days=10,
    pending_approvals=1,
    **kwargs,
):

    return simulate_scenario(
        project,
        {
            "approval_delay_days":
                max(
                    0.0,
                    _safe_float(
                        approval_delay_days
                    ),
                ),

            "pending_approvals":
                max(
                    0,
                    int(pending_approvals),
                ),
        },
        scenario_name="Approval Fast Track",
        **kwargs,
    )


def scenario_documentation_completion(
    project,
    documentation_completion_pct=95.0,
    **kwargs,
):

    return simulate_scenario(
        project,
        {
            "documentation_completion_pct":
                _clip_pct(
                    documentation_completion_pct
                ),
        },
        scenario_name="Documentation Completion",
        **kwargs,
    )


def scenario_possession_recovery(
    project,
    possession_pct=90.0,
    **kwargs,
):

    return simulate_scenario(
        project,
        {
            "possession_pct":
                _clip_pct(possession_pct),
        },
        scenario_name="Land Possession Recovery",
        **kwargs,
    )


def scenario_rr_acceleration(
    project,
    rr_completion_pct=90.0,
    rr_waiting_families=10,
    pending_resettlement_cases=3,
    **kwargs,
):

    return simulate_scenario(
        project,
        {
            "rr_completion_pct":
                _clip_pct(rr_completion_pct),

            "rr_waiting_families":
                max(
                    0,
                    int(rr_waiting_families),
                ),

            "pending_resettlement_cases":
                max(
                    0,
                    int(pending_resettlement_cases),
                ),
        },
        scenario_name="R&R Acceleration",
        **kwargs,
    )


def scenario_stakeholder_improvement(
    project,
    response_time_days=10,
    pending_requests=3,
    **kwargs,
):

    return simulate_scenario(
        project,
        {
            "avg_stakeholder_response_time":
                max(
                    0.0,
                    _safe_float(
                        response_time_days
                    ),
                ),

            "pending_requests":
                max(
                    0,
                    int(pending_requests),
                ),
        },
        scenario_name="Stakeholder Response Improvement",
        **kwargs,
    )


def scenario_administrative_improvement(
    project,
    bottlenecks=1,
    coordination_score=90,
    **kwargs,
):

    return simulate_scenario(
        project,
        {
            "administrative_bottleneck_count":
                max(
                    0,
                    int(bottlenecks),
                ),

            "department_coordination_score":
                _clip_pct(
                    coordination_score
                ),
        },
        scenario_name="Administrative Improvement",
        **kwargs,
    )


def scenario_full_recovery(
    project,
    **kwargs,
):

    changes = {

        "compensation_completed_pct": 95.0,

        "pending_compensation_cases": 2,

        "pending_legal_cases": 1,

        "legal_disputes": 1,

        "approval_delay_days": 7.0,

        "pending_approvals": 1,

        "documentation_completion_pct": 95.0,

        "possession_pct": 90.0,

        "rr_completion_pct": 90.0,

        "rr_waiting_families": 10,

        "pending_resettlement_cases": 2,

        "avg_stakeholder_response_time": 7.0,

        "pending_requests": 3,

        "administrative_bottleneck_count": 1,

        "department_coordination_score": 90.0,
    }

    return simulate_scenario(
        project,
        changes,
        scenario_name="Full Project Recovery",
        **kwargs,
    )


# ============================================================================
# COMPARE MULTIPLE SCENARIOS
# ============================================================================

def compare_scenarios(
    project,
    scenarios,
    classifier=None,
    regressor=None,
    preprocessor=None,
) -> pd.DataFrame:

    rows = []

    baseline = evaluate_project(
        project,
        classifier=classifier,
        regressor=regressor,
        preprocessor=preprocessor,
    )

    for name, changes in scenarios.items():

        result = simulate_scenario(
            project,
            changes,
            classifier=classifier,
            regressor=regressor,
            preprocessor=preprocessor,
            scenario_name=name,
        )

        scenario = result["scenario"]

        improvement = result["improvement"]

        rows.append(
            {
                "scenario": name,

                "baseline_delay_probability":
                    baseline[
                        "delay_probability"
                    ],

                "scenario_delay_probability":
                    scenario[
                        "delay_probability"
                    ],

                "delay_probability_reduction":
                    improvement[
                        "delay_probability_reduction"
                    ],

                "baseline_delay_days":
                    baseline[
                        "predicted_delay_days"
                    ],

                "scenario_delay_days":
                    scenario[
                        "predicted_delay_days"
                    ],

                "delay_days_reduction":
                    improvement[
                        "predicted_delay_days_reduction"
                    ],

                "baseline_risk_score":
                    baseline[
                        "risk_score"
                    ],

                "scenario_risk_score":
                    scenario[
                        "risk_score"
                    ],

                "risk_reduction":
                    improvement[
                        "risk_score_reduction"
                    ],

                "baseline_risk_level":
                    baseline[
                        "risk_level"
                    ],

                "scenario_risk_level":
                    scenario[
                        "risk_level"
                    ],
            }
        )

    result_df = pd.DataFrame(rows)

    if not result_df.empty:

        result_df = result_df.sort_values(
            "risk_reduction",
            ascending=False,
        ).reset_index(drop=True)

    return result_df


# ============================================================================
# BEST SCENARIO
# ============================================================================

def find_best_scenario(
    project,
    scenarios,
    classifier=None,
    regressor=None,
    preprocessor=None,
) -> dict:

    comparison = compare_scenarios(
        project,
        scenarios,
        classifier=classifier,
        regressor=regressor,
        preprocessor=preprocessor,
    )

    if comparison.empty:

        return {
            "best_scenario": None,
            "comparison": comparison,
        }

    best = comparison.iloc[0]

    return {

        "best_scenario":
            str(best["scenario"]),

        "risk_reduction":
            float(best["risk_reduction"]),

        "delay_probability_reduction":
            float(
                best[
                    "delay_probability_reduction"
                ]
            ),

        "delay_days_reduction":
            float(
                best[
                    "delay_days_reduction"
                ]
            ),

        "baseline_risk_level":
            str(
                best[
                    "baseline_risk_level"
                ]
            ),

        "scenario_risk_level":
            str(
                best[
                    "scenario_risk_level"
                ]
            ),

        "comparison":
            comparison,
    }


# ============================================================================
# SCENARIO SUMMARY
# ============================================================================

def scenario_to_text(
    result: dict,
) -> str:

    baseline = result["baseline"]

    scenario = result["scenario"]

    improvement = result["improvement"]

    lines = [

        f"Scenario: {result['scenario_name']}",

        "=" * 55,

        "",

        "BASELINE",

        f"Risk Score: "
        f"{baseline['risk_percentage']:.2f}%",

        f"Risk Level: "
        f"{baseline['risk_level']}",

        f"Delay Probability: "
        f"{baseline['delay_percentage']:.2f}%",

        f"Predicted Delay: "
        f"{baseline['predicted_delay_days']:.2f} days",

        "",

        "AFTER INTERVENTION",

        f"Risk Score: "
        f"{scenario['risk_percentage']:.2f}%",

        f"Risk Level: "
        f"{scenario['risk_level']}",

        f"Delay Probability: "
        f"{scenario['delay_percentage']:.2f}%",

        f"Predicted Delay: "
        f"{scenario['predicted_delay_days']:.2f} days",

        "",

        "IMPROVEMENT",

        f"Risk Reduction: "
        f"{improvement['risk_percentage_reduction']:.2f}%",

        f"Delay Probability Reduction: "
        f"{improvement['delay_percentage_reduction']:.2f}%",

        f"Delay Days Reduction: "
        f"{improvement['predicted_delay_days_reduction']:.2f} days",

        f"Risk Level Changed: "
        f"{improvement['risk_level_changed']}",
    ]

    return "\n".join(lines)


# ============================================================================
# VALIDATION
# ============================================================================

def validate_simulator_setup() -> dict:

    return {

        "models_directory":
            str(MODELS_DIR),

        "classifier_path":
            str(CLASSIFIER_PATH),

        "regressor_path":
            str(REGRESSOR_PATH),

        "preprocessor_path":
            str(PREPROCESSOR_PATH),

        "classifier_exists":
            CLASSIFIER_PATH.exists(),

        "regressor_exists":
            REGRESSOR_PATH.exists(),

        "preprocessor_exists":
            PREPROCESSOR_PATH.exists(),

        "ready":
            (
                CLASSIFIER_PATH.exists()
                and REGRESSOR_PATH.exists()
                and PREPROCESSOR_PATH.exists()
            ),
    }


# ============================================================================
# TEST
# ============================================================================

if __name__ == "__main__":

    print("=" * 70)
    print("LANDGUARD AI - Scenario Simulator")
    print("=" * 70)

    print("\nModel setup:")
    print(validate_simulator_setup())

    if not validate_simulator_setup()["ready"]:
        print("\nERROR: Simulator models are not ready.")
        raise SystemExit(1)

    # ------------------------------------------------------------
    # SAMPLE PROJECT
    # ------------------------------------------------------------

    sample_project = {
        "project_id": "P00001",
        "project_type": "Highway",
        "state": "Tamil Nadu",
        "district": "District A",

        "land_area": 500,
        "affected_families": 400,
        "landowners": 250,

        "notification_pending_days": 80,
        "documentation_completion_pct": 55,
        "ownership_conflict_count": 9,
        "possession_pct": 45,

        "compensation_amount": 50000000,
        "compensation_completed_pct": 40,
        "pending_compensation_cases": 35,

        "average_processing_days": 35,
        "pending_compensation_amount": 20000000,

        "legal_disputes": 15,
        "pending_legal_cases": 10,
        "average_legal_resolution_time": 180,

        "pending_approvals": 5,
        "approval_delay_days": 60,

        "rr_completion_pct": 50,
        "rr_waiting_families": 80,
        "pending_resettlement_cases": 25,

        "avg_stakeholder_response_time": 35,
        "pending_requests": 20,

        "department_coordination_score": 60,
        "administrative_bottleneck_count": 7,

        "notification_status": "Pending",
        "ownership_status": "Conflict",
        "compensation_status": "Pending",
        "legal_status": "Pending",
        "approval_status": "Pending",
    }

    print("\nEvaluating baseline project...")

    baseline = evaluate_project(sample_project)

    print("\nBASELINE")
    print("-" * 60)
    print(f"Delay Probability : {baseline['delay_percentage']:.2f}%")
    print(f"Predicted Delay   : {baseline['predicted_delay_days']:.2f} days")
    print(f"Risk Score        : {baseline['risk_percentage']:.2f}%")
    print(f"Risk Level        : {baseline['risk_level']}")

    # ------------------------------------------------------------
    # WHAT-IF SCENARIO
    # ------------------------------------------------------------

    print("\nRunning scenario: Compensation Recovery...")

    result = scenario_compensation_recovery(
        sample_project,
        completion_pct=90,
        pending_cases=3,
    )

    print("\n" + scenario_to_text(result))

    print("\n" + "=" * 70)
    print("Scenario simulation completed successfully.")
    print("=" * 70)
