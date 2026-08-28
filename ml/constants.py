"""
LANDGUARD AI - Constants
------------------------

Central configuration and constants shared across the LANDGUARD AI
machine-learning modules.

IMPORTANT:
constants.py is located directly inside the LANDGUARD AI project folder:

    C:/Users/Girija Senthil/Downloads/pep ml/

Therefore all project folders are resolved relative to this file.
"""

from __future__ import annotations

from pathlib import Path


# ============================================================================
# PROJECT PATHS
# ============================================================================

# constants.py location:
#
# C:\Users\Girija Senthil\Downloads\pep ml\constants.py
#
# Therefore this is the actual LANDGUARD project directory.
ML_DIR = Path(__file__).resolve().parent

PROJECT_ROOT = ML_DIR

MODELS_DIR = PROJECT_ROOT / "models"

DATA_DIR = PROJECT_ROOT / "data"

OUTPUT_DIR = PROJECT_ROOT / "outputs"

REPORTS_DIR = OUTPUT_DIR / "reports"

LOGS_DIR = OUTPUT_DIR / "logs"


# ============================================================================
# MODEL FILES
# ============================================================================

CLASSIFIER_MODEL_FILENAME = "delay_model.pkl"

REGRESSOR_MODEL_FILENAME = "delay_regressor.pkl"

PREPROCESSOR_FILENAME = "preprocessor.pkl"

MODEL_METADATA_FILENAME = "model_metadata.json"

METRICS_FILENAME = "metrics.json"

FEATURE_IMPORTANCE_FILENAME = "feature_importance.json"


CLASSIFIER_MODEL_PATH = (
    MODELS_DIR / CLASSIFIER_MODEL_FILENAME
)

REGRESSOR_MODEL_PATH = (
    MODELS_DIR / REGRESSOR_MODEL_FILENAME
)

PREPROCESSOR_PATH = (
    MODELS_DIR / PREPROCESSOR_FILENAME
)

MODEL_METADATA_PATH = (
    MODELS_DIR / MODEL_METADATA_FILENAME
)

METRICS_PATH = (
    MODELS_DIR / METRICS_FILENAME
)

FEATURE_IMPORTANCE_PATH = (
    MODELS_DIR / FEATURE_IMPORTANCE_FILENAME
)


# ============================================================================
# TARGET COLUMNS
# ============================================================================

CLASSIFICATION_TARGET = "delayed"

REGRESSION_TARGET = "actual_delay_days"

TARGET_COLUMNS = {
    "classification": CLASSIFICATION_TARGET,
    "regression": REGRESSION_TARGET,
}


# ============================================================================
# IDENTIFIER COLUMNS
# ============================================================================

IDENTIFIER_COLUMNS = [
    "project_id",
    "project_name",
    "id",
]


# ============================================================================
# LEAKAGE COLUMNS
# ============================================================================

LEAKAGE_COLUMNS = {
    "delayed",
    "actual_delay_days",
    "actual_delay",
    "delay_days",
    "final_delay_days",
    "project_outcome",
    "final_outcome",
    "completion_date",
    "actual_completion_date",
    "final_completion_date",
    "days_to_completion",
}


# ============================================================================
# CLASSIFICATION CONFIGURATION
# ============================================================================

CLASSIFICATION_CLASSES = {
    0: "Not Delayed",
    1: "Delayed",
}

CLASSIFICATION_LABELS = [
    "Not Delayed",
    "Delayed",
]


# ============================================================================
# CLASSIFIER THRESHOLDS
# ============================================================================

DEFAULT_CLASSIFICATION_THRESHOLD = 0.50

# Your predictor.py is currently using 0.36.
# Keep this value synchronized with predictor.py if 0.36
# is your selected optimized threshold.
OPTIMIZED_CLASSIFICATION_THRESHOLD = 0.36

HIGH_RECALL_THRESHOLD = 0.40

HIGH_CONFIDENCE_DELAY_THRESHOLD = 0.70


# ============================================================================
# RISK LEVELS
# ============================================================================

RISK_LEVEL_LOW = "Low"

RISK_LEVEL_MODERATE = "Moderate"

RISK_LEVEL_HIGH = "High"

RISK_LEVEL_CRITICAL = "Critical"

RISK_LEVELS = [
    RISK_LEVEL_LOW,
    RISK_LEVEL_MODERATE,
    RISK_LEVEL_HIGH,
    RISK_LEVEL_CRITICAL,
]


# ============================================================================
# RISK PROBABILITY BANDS
# ============================================================================

RISK_PROBABILITY_BANDS = {

    RISK_LEVEL_LOW: (
        0.00,
        0.25,
    ),

    RISK_LEVEL_MODERATE: (
        0.25,
        0.50,
    ),

    RISK_LEVEL_HIGH: (
        0.50,
        0.75,
    ),

    RISK_LEVEL_CRITICAL: (
        0.75,
        1.01,
    ),
}


# ============================================================================
# RISK SCORE BANDS
# ============================================================================

RISK_SCORE_BANDS = {

    RISK_LEVEL_LOW: (
        0.00,
        0.25,
    ),

    RISK_LEVEL_MODERATE: (
        0.25,
        0.50,
    ),

    RISK_LEVEL_HIGH: (
        0.50,
        0.75,
    ),

    RISK_LEVEL_CRITICAL: (
        0.75,
        1.01,
    ),
}


# ============================================================================
# DELAY SEVERITY
# ============================================================================

DELAY_SEVERITY_NONE = "None"

DELAY_SEVERITY_LOW = "Low"

DELAY_SEVERITY_MODERATE = "Moderate"

DELAY_SEVERITY_HIGH = "High"

DELAY_SEVERITY_CRITICAL = "Critical"


# ============================================================================
# DELAY DAY BANDS
# ============================================================================

DELAY_DAY_BANDS = {

    DELAY_SEVERITY_NONE: (
        0,
        7,
    ),

    DELAY_SEVERITY_LOW: (
        7,
        30,
    ),

    DELAY_SEVERITY_MODERATE: (
        30,
        60,
    ),

    DELAY_SEVERITY_HIGH: (
        60,
        120,
    ),

    DELAY_SEVERITY_CRITICAL: (
        120,
        float("inf"),
    ),
}


# ============================================================================
# PROJECT STAGES
# ============================================================================

STAGE_NOTIFICATION = "Notification"

STAGE_DOCUMENTATION = "Documentation"

STAGE_OWNERSHIP = "Ownership Verification"

STAGE_COMPENSATION = "Compensation"

STAGE_LEGAL = "Legal"

STAGE_APPROVAL = "Approval"

STAGE_POSSESSION = "Possession"

STAGE_REHABILITATION = "Rehabilitation & Resettlement"

STAGE_COMPLETION = "Completion"


PROJECT_STAGES = [
    STAGE_NOTIFICATION,
    STAGE_DOCUMENTATION,
    STAGE_OWNERSHIP,
    STAGE_COMPENSATION,
    STAGE_LEGAL,
    STAGE_APPROVAL,
    STAGE_POSSESSION,
    STAGE_REHABILITATION,
    STAGE_COMPLETION,
]


# ============================================================================
# STAGE WEIGHTS
# ============================================================================

STAGE_RISK_WEIGHTS = {

    STAGE_NOTIFICATION: 0.10,

    STAGE_DOCUMENTATION: 0.10,

    STAGE_OWNERSHIP: 0.15,

    STAGE_COMPENSATION: 0.20,

    STAGE_LEGAL: 0.15,

    STAGE_APPROVAL: 0.15,

    STAGE_POSSESSION: 0.05,

    STAGE_REHABILITATION: 0.10,

    STAGE_COMPLETION: 0.00,
}


# ============================================================================
# RECOMMENDATION PRIORITIES
# ============================================================================

PRIORITY_LOW = "Low"

PRIORITY_MEDIUM = "Medium"

PRIORITY_HIGH = "High"

PRIORITY_CRITICAL = "Critical"

PRIORITY_LEVELS = [
    PRIORITY_LOW,
    PRIORITY_MEDIUM,
    PRIORITY_HIGH,
    PRIORITY_CRITICAL,
]


# ============================================================================
# PRIORITY SCORE BANDS
# ============================================================================

PRIORITY_SCORE_BANDS = {

    PRIORITY_LOW: (
        0.00,
        0.25,
    ),

    PRIORITY_MEDIUM: (
        0.25,
        0.50,
    ),

    PRIORITY_HIGH: (
        0.50,
        0.75,
    ),

    PRIORITY_CRITICAL: (
        0.75,
        1.01,
    ),
}


# ============================================================================
# DEFAULT VALUES
# ============================================================================

DEFAULT_CATEGORICAL_VALUE = "Unknown"

DEFAULT_NUMERIC_VALUE = 0.0

DEFAULT_PROBABILITY = 0.50

DEFAULT_DELAY_DAYS = 0.0

DEFAULT_RISK_SCORE = 0.0


# ============================================================================
# DATA VALIDATION
# ============================================================================

MIN_SYNTHETIC_ROWS = 50

DEFAULT_SYNTHETIC_ROWS = 2000

DEFAULT_RANDOM_SEED = 42


# ============================================================================
# TRAIN / TEST CONFIGURATION
# ============================================================================

DEFAULT_TEST_SIZE = 0.20

DEFAULT_VALIDATION_SIZE = 0.20

DEFAULT_CV_FOLDS = 5


# ============================================================================
# CLASSIFIER CONFIGURATION
# ============================================================================

CLASSIFIER_RANDOM_STATE = 42

CLASSIFIER_MAX_ITER = 2000

CLASSIFIER_C = 1.0


# ============================================================================
# XGBOOST CONFIGURATION
# ============================================================================

XGB_RANDOM_STATE = 42

XGB_N_ESTIMATORS = 400

XGB_MAX_DEPTH = 5

XGB_LEARNING_RATE = 0.05

XGB_SUBSAMPLE = 0.85

XGB_COLSAMPLE_BYTREE = 0.85

XGB_MIN_CHILD_WEIGHT = 2

XGB_REG_ALPHA = 0.05

XGB_REG_LAMBDA = 1.0


# ============================================================================
# REGRESSION CONFIGURATION
# ============================================================================

REGRESSOR_RANDOM_STATE = 42

REGRESSION_TEST_SIZE = 0.20


# ============================================================================
# MODEL PERFORMANCE TARGETS
# ============================================================================

TARGET_CLASSIFICATION_ACCURACY = 0.80

TARGET_BALANCED_ACCURACY = 0.80

TARGET_F1_SCORE = 0.80

TARGET_ROC_AUC = 0.80

TARGET_REGRESSION_R2 = 0.80


# ============================================================================
# METRIC NAMES
# ============================================================================

CLASSIFICATION_METRICS = [
    "accuracy",
    "balanced_accuracy",
    "precision",
    "recall",
    "f1",
    "roc_auc",
    "average_precision",
]


REGRESSION_METRICS = [
    "mae",
    "mse",
    "rmse",
    "r2",
    "mape",
]


# ============================================================================
# DISPLAY PRECISION
# ============================================================================

PROBABILITY_DECIMALS = 4

SCORE_DECIMALS = 4

DELAY_DAYS_DECIMALS = 1

CURRENCY_DECIMALS = 2


# ============================================================================
# EXPLAINABILITY
# ============================================================================

DEFAULT_TOP_FEATURES = 10

MAX_EXPLAINABILITY_FEATURES = 20


# ============================================================================
# SIMULATOR CONFIGURATION
# ============================================================================

SIMULATOR_DEFAULT_SCENARIOS = 5

SIMULATOR_RANDOM_SEED = 42

SCENARIO_BASELINE = "Baseline"

SCENARIO_COMPENSATION_IMPROVEMENT = "Improve Compensation"

SCENARIO_APPROVAL_ACCELERATION = "Accelerate Approvals"

SCENARIO_LEGAL_RESOLUTION = "Resolve Legal Cases"

SCENARIO_DOCUMENTATION_IMPROVEMENT = "Complete Documentation"

SCENARIO_COMBINED_INTERVENTION = "Combined Intervention"


SIMULATION_SCENARIOS = [
    SCENARIO_BASELINE,
    SCENARIO_COMPENSATION_IMPROVEMENT,
    SCENARIO_APPROVAL_ACCELERATION,
    SCENARIO_LEGAL_RESOLUTION,
    SCENARIO_DOCUMENTATION_IMPROVEMENT,
    SCENARIO_COMBINED_INTERVENTION,
]


# ============================================================================
# RECOMMENDATION CONFIGURATION
# ============================================================================

MAX_RECOMMENDATIONS = 5

DEFAULT_RECOMMENDATION_COUNT = 3


# ============================================================================
# RECOMMENDATION IMPACT
# ============================================================================

IMPACT_LOW = "Low"

IMPACT_MEDIUM = "Medium"

IMPACT_HIGH = "High"

IMPACT_LEVELS = [
    IMPACT_LOW,
    IMPACT_MEDIUM,
    IMPACT_HIGH,
]


# ============================================================================
# FEATURE RISK WEIGHTS
# ============================================================================

FEATURE_RISK_WEIGHTS = {

    "compensation_pending_ratio": 0.14,

    "approval_delay_score": 0.13,

    "legal_dispute_density": 0.12,

    "documentation_score": 0.08,

    "rr_score": 0.08,

    "possession_score": 0.08,

    "ownership_conflict_score": 0.10,

    "stakeholder_response_score": 0.07,

    "administrative_bottleneck_score": 0.07,

    "project_importance": 0.06,

    "delay_impact": 0.07,
}


# ============================================================================
# FEATURE RISK DIRECTIONS
# ============================================================================

FEATURES_INCREASING_RISK = [

    "notification_pending_days",

    "ownership_conflict_count",

    "pending_compensation_cases",

    "average_processing_days",

    "pending_compensation_amount",

    "legal_disputes",

    "pending_legal_cases",

    "average_legal_resolution_time",

    "pending_approvals",

    "approval_delay_days",

    "rr_waiting_families",

    "pending_resettlement_cases",

    "avg_stakeholder_response_time",

    "pending_requests",

    "administrative_bottleneck_count",

    "compensation_pending_ratio",

    "legal_dispute_density",

    "approval_delay_score",

    "ownership_conflict_score",

    "stakeholder_response_score",

    "administrative_bottleneck_score",

    "project_importance",

    "delay_impact",

    "urgency",
]


FEATURES_DECREASING_RISK = [

    "documentation_completion_pct",

    "possession_pct",

    "compensation_completed_pct",

    "rr_completion_pct",

    "department_coordination_score",

    "documentation_score",

    "rr_score",

    "possession_score",
]


# ============================================================================
# STATUS VALUES
# ============================================================================

STATUS_PENDING = "Pending"

STATUS_COMPLETED = "Completed"

STATUS_ON_TRACK = "On Track"

STATUS_CONFLICT = "Conflict"

STATUS_VERIFIED = "Verified"

STATUS_LOW = "Low"


# ============================================================================
# STATUS MAPPINGS
# ============================================================================

STATUS_RISK_MAP = {

    "notification_status": {

        "Pending": RISK_LEVEL_HIGH,

        "Completed": RISK_LEVEL_LOW,
    },

    "ownership_status": {

        "Conflict": RISK_LEVEL_HIGH,

        "Verified": RISK_LEVEL_LOW,
    },

    "compensation_status": {

        "Pending": RISK_LEVEL_HIGH,

        "On Track": RISK_LEVEL_LOW,
    },

    "legal_status": {

        "Pending": RISK_LEVEL_HIGH,

        "Low": RISK_LEVEL_LOW,
    },

    "approval_status": {

        "Pending": RISK_LEVEL_HIGH,

        "On Track": RISK_LEVEL_LOW,
    },
}


# ============================================================================
# STATUS SEVERITY SCORES
# ============================================================================

STATUS_SEVERITY_SCORES = {

    "Pending": 0.75,

    "Conflict": 0.85,

    "Completed": 0.10,

    "Verified": 0.10,

    "On Track": 0.15,

    "Low": 0.15,

    "Unknown": 0.50,
}


# ============================================================================
# RISK BADGE LABELS
# ============================================================================

RISK_BADGE_LABELS = {

    RISK_LEVEL_LOW:
        "LOW RISK",

    RISK_LEVEL_MODERATE:
        "MODERATE RISK",

    RISK_LEVEL_HIGH:
        "HIGH RISK",

    RISK_LEVEL_CRITICAL:
        "CRITICAL RISK",
}


# ============================================================================
# MODEL TYPES
# ============================================================================

MODEL_TYPE_CLASSIFIER = "classification"

MODEL_TYPE_REGRESSOR = "regression"

MODEL_TYPES = [
    MODEL_TYPE_CLASSIFIER,
    MODEL_TYPE_REGRESSOR,
]


# ============================================================================
# MODEL VERSION
# ============================================================================

MODEL_VERSION = "1.0.0"

PROJECT_VERSION = "1.0.0"


# ============================================================================
# MODEL NAMES
# ============================================================================

CLASSIFIER_MODEL_NAME = "LANDGUARD Delay Classifier"

REGRESSOR_MODEL_NAME = "LANDGUARD Delay Regressor"


# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def ensure_directories() -> None:
    """Create required LANDGUARD directories."""

    directories = [
        MODELS_DIR,
        DATA_DIR,
        OUTPUT_DIR,
        REPORTS_DIR,
        LOGS_DIR,
    ]

    for directory in directories:
        directory.mkdir(
            parents=True,
            exist_ok=True,
        )


def get_model_paths() -> dict:
    """Return all important model-related paths."""

    return {

        "models_dir":
            MODELS_DIR,

        "classifier":
            CLASSIFIER_MODEL_PATH,

        "regressor":
            REGRESSOR_MODEL_PATH,

        "preprocessor":
            PREPROCESSOR_PATH,

        "metadata":
            MODEL_METADATA_PATH,

        "metrics":
            METRICS_PATH,

        "feature_importance":
            FEATURE_IMPORTANCE_PATH,
    }


def get_risk_level(
    probability: float,
) -> str:
    """Convert probability into a risk level."""

    try:
        probability = float(probability)

    except (
        TypeError,
        ValueError,
    ):

        probability = DEFAULT_PROBABILITY

    probability = max(
        0.0,
        min(
            1.0,
            probability,
        ),
    )

    if probability < 0.25:
        return RISK_LEVEL_LOW

    if probability < 0.50:
        return RISK_LEVEL_MODERATE

    if probability < 0.75:
        return RISK_LEVEL_HIGH

    return RISK_LEVEL_CRITICAL


def get_priority_level(
    score: float,
) -> str:
    """Convert normalized priority score into a priority level."""

    try:
        score = float(score)

    except (
        TypeError,
        ValueError,
    ):

        score = 0.0

    score = max(
        0.0,
        min(
            1.0,
            score,
        ),
    )

    if score < 0.25:
        return PRIORITY_LOW

    if score < 0.50:
        return PRIORITY_MEDIUM

    if score < 0.75:
        return PRIORITY_HIGH

    return PRIORITY_CRITICAL


def get_delay_severity(
    delay_days: float,
) -> str:
    """Convert predicted delay days into severity."""

    try:
        delay_days = float(delay_days)

    except (
        TypeError,
        ValueError,
    ):

        delay_days = 0.0

    delay_days = max(
        0.0,
        delay_days,
    )

    if delay_days < 7:
        return DELAY_SEVERITY_NONE

    if delay_days < 30:
        return DELAY_SEVERITY_LOW

    if delay_days < 60:
        return DELAY_SEVERITY_MODERATE

    if delay_days < 120:
        return DELAY_SEVERITY_HIGH

    return DELAY_SEVERITY_CRITICAL


def get_classification_label(
    prediction: int,
) -> str:
    """Convert classifier output to readable label."""

    try:
        prediction = int(prediction)

    except (
        TypeError,
        ValueError,
    ):

        prediction = 0

    return CLASSIFICATION_CLASSES.get(
        prediction,
        "Unknown",
    )


def is_high_risk(
    probability: float,
) -> bool:
    """Return True when probability is at least 0.50."""

    try:
        probability = float(probability)

    except (
        TypeError,
        ValueError,
    ):

        return False

    return probability >= 0.50


def is_critical_risk(
    probability: float,
) -> bool:
    """Return True when probability is at least 0.75."""

    try:
        probability = float(probability)

    except (
        TypeError,
        ValueError,
    ):

        return False

    return probability >= 0.75


def get_status_risk(
    status_column: str,
    status_value: str,
) -> str:
    """Convert project status into risk level."""

    mapping = STATUS_RISK_MAP.get(
        status_column,
        {},
    )

    return mapping.get(
        status_value,
        RISK_LEVEL_MODERATE,
    )


def get_configuration() -> dict:
    """Return main LANDGUARD configuration."""

    return {

        "project_root":
            str(PROJECT_ROOT),

        "ml_directory":
            str(ML_DIR),

        "models_directory":
            str(MODELS_DIR),

        "project_version":
            PROJECT_VERSION,

        "model_version":
            MODEL_VERSION,

        "classifier_model":
            CLASSIFIER_MODEL_NAME,

        "regressor_model":
            REGRESSOR_MODEL_NAME,

        "classification_target":
            CLASSIFICATION_TARGET,

        "regression_target":
            REGRESSION_TARGET,

        "classification_threshold":
            DEFAULT_CLASSIFICATION_THRESHOLD,

        "optimized_classification_threshold":
            OPTIMIZED_CLASSIFICATION_THRESHOLD,

        "test_size":
            DEFAULT_TEST_SIZE,

        "random_seed":
            DEFAULT_RANDOM_SEED,

        "target_accuracy":
            TARGET_CLASSIFICATION_ACCURACY,

        "target_f1":
            TARGET_F1_SCORE,

        "target_roc_auc":
            TARGET_ROC_AUC,

        "target_regression_r2":
            TARGET_REGRESSION_R2,

        "model_paths":
            {
                key: str(value)
                for key, value
                in get_model_paths().items()
            },
    }


# ============================================================================
# MODULE TEST
# ============================================================================

if __name__ == "__main__":

    print("=" * 70)
    print("LANDGUARD AI - Constants")
    print("=" * 70)

    print(
        "\nProject root:",
        PROJECT_ROOT,
    )

    print(
        "ML directory:",
        ML_DIR,
    )

    print(
        "Models directory:",
        MODELS_DIR,
    )

    print(
        "\nClassifier:",
        CLASSIFIER_MODEL_PATH,
    )

    print(
        "Regressor:",
        REGRESSOR_MODEL_PATH,
    )

    print(
        "Preprocessor:",
        PREPROCESSOR_PATH,
    )

    print(
        "\nClassification target:",
        CLASSIFICATION_TARGET,
    )

    print(
        "Regression target:",
        REGRESSION_TARGET,
    )

    print(
        "\nDefault threshold:",
        DEFAULT_CLASSIFICATION_THRESHOLD,
    )

    print(
        "Optimized threshold:",
        OPTIMIZED_CLASSIFICATION_THRESHOLD,
    )

    print(
        "\nRisk examples:"
    )

    for probability in [
        0.10,
        0.30,
        0.55,
        0.80,
    ]:

        print(
            f"  {probability:.2f}"
            f" -> "
            f"{get_risk_level(probability)}"
        )

    print(
        "\nDelay severity examples:"
    )

    for days in [
        0,
        15,
        45,
        90,
        150,
    ]:

        print(
            f"  {days} days"
            f" -> "
            f"{get_delay_severity(days)}"
        )

    print(
        "\nPriority examples:"
    )

    for score in [
        0.10,
        0.35,
        0.60,
        0.85,
    ]:

        print(
            f"  {score:.2f}"
            f" -> "
            f"{get_priority_level(score)}"
        )

    print(
        "\nConfiguration:"
    )

    configuration = get_configuration()

    for key, value in configuration.items():

        print(
            f"  {key}: {value}"
        )

    print(
        "\nconstants.py is running successfully."
    )
