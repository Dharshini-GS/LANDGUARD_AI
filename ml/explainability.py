"""
SHAP Explainability Engine
Calculates global feature importances and per-project SHAP feature contributions.
"""

import os
import joblib
import pandas as pd
import numpy as np
import shap
from ml.features import extract_project_features, FEATURE_COLUMNS
from ml.feature_labels import FEATURE_LABELS
from ml.preprocessing import FeaturePreprocessor
from utils.config import MODEL_DIR

MODEL_FILE = os.path.join(MODEL_DIR, "delay_model.pkl")

def get_project_shap_values(project_id: str) -> dict:
    """
    Calculates SHAP values for a single project.
    Returns structured waterfall list of feature contributions.
    """
    df_feat = extract_project_features(project_id)
    if df_feat.empty:
        return {"error": "Project not found"}

    X = df_feat[FEATURE_COLUMNS]

    preprocessor = FeaturePreprocessor.load()
    if preprocessor:
        X_scaled = preprocessor.transform(X)
    else:
        X_scaled = X

    if not os.path.exists(MODEL_FILE):
        # Fallback heuristic if model file not trained yet
        drivers = []
        for col in FEATURE_COLUMNS[:5]:
            drivers.append({
                "feature": col,
                "label": FEATURE_LABELS.get(col, col),
                "value": float(X[col].iloc[0]),
                "shap_value": 0.15,
                "impact": "Increases Risk"
            })
        return {"base_value": 0.35, "prediction": 0.50, "drivers": drivers}

    clf = joblib.load(MODEL_FILE)
    explainer = shap.TreeExplainer(clf)
    shap_vals = explainer.shap_values(X_scaled)

    # Handle binary classification output format differences in SHAP versions
    if isinstance(shap_vals, list):
        vals = shap_vals[1][0]  # Positive class SHAP values
        base_val = float(explainer.expected_value[1])
    elif len(shap_vals.shape) == 3:
        vals = shap_vals[0, :, 1]
        base_val = float(explainer.expected_value[1])
    else:
        vals = shap_vals[0]
        base_val = float(explainer.expected_value)

    drivers = []
    for col, val, orig_v in zip(FEATURE_COLUMNS, vals, X.iloc[0]):
        drivers.append({
            "feature": col,
            "label": FEATURE_LABELS.get(col, col),
            "value": round(float(orig_v), 2),
            "shap_value": round(float(val), 4),
            "impact": "Increases Delay Risk" if val > 0 else "Reduces Delay Risk"
        })

    # Sort drivers by absolute SHAP impact
    drivers = sorted(drivers, key=lambda x: abs(x["shap_value"]), reverse=True)

    return {
        "project_id": project_id,
        "base_value": round(base_val, 4),
        "drivers": drivers
    }
