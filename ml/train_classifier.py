"""
Trains the Delay Classifier model predicting delay_flag (0 = On Time, 1 = Delayed)
"""

import os
import json
import joblib
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
from ml.features import extract_project_features, FEATURE_COLUMNS
from ml.preprocessing import FeaturePreprocessor
from backend.database import get_db_connection
from utils.config import MODEL_DIR

MODEL_FILE = os.path.join(MODEL_DIR, "delay_model.pkl")
METADATA_FILE = os.path.join(MODEL_DIR, "model_metadata.json")
IMPORTANCE_FILE = os.path.join(MODEL_DIR, "feature_importance.json")

def train_classifier():
    print("=" * 50)
    print("Training LANDGUARD AI Delay Classifier...")
    print("=" * 50)

    # 1. Extract Features
    X_df = extract_project_features()
    if X_df.empty:
        print("ERROR: No project features extracted.")
        return False

    project_ids = X_df['project_id']
    X = X_df[FEATURE_COLUMNS]

    # 2. Get Targets from project_outcomes
    conn = get_db_connection()
    out_df = pd.read_sql_query("SELECT project_id, delay_flag, delay_days FROM project_outcomes", conn)
    conn.close()

    merged = pd.merge(X_df, out_df, on='project_id')
    X = merged[FEATURE_COLUMNS]
    y = merged['delay_flag']

    # 3. Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    # 4. Preprocessing Scaling
    preprocessor = FeaturePreprocessor()
    X_train_scaled = preprocessor.fit_transform(X_train)
    X_test_scaled = preprocessor.transform(X_test)
    preprocessor.save()

    # 5. Train Model
    clf = RandomForestClassifier(n_estimators=150, max_depth=8, random_state=42, class_weight='balanced')
    clf.fit(X_train_scaled, y_train)

    # 6. Evaluate
    y_pred = clf.predict(X_test_scaled)
    y_prob = clf.predict_proba(X_test_scaled)[:, 1]

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_prob)

    print(f"  Accuracy  : {acc:.4f}")
    print(f"  Precision : {prec:.4f}")
    print(f"  Recall    : {rec:.4f}")
    print(f"  F1 Score  : {f1:.4f}")
    print(f"  ROC-AUC   : {auc:.4f}")

    # 7. Save Model & Artifacts
    os.makedirs(MODEL_DIR, exist_ok=True)
    joblib.dump(clf, MODEL_FILE)

    metadata = {
        "model_type": "RandomForestClassifier",
        "n_samples": len(X),
        "accuracy": round(acc, 4),
        "precision": round(prec, 4),
        "recall": round(rec, 4),
        "f1_score": round(f1, 4),
        "roc_auc": round(auc, 4),
        "feature_count": len(FEATURE_COLUMNS),
        "training_date": "2026-08-26"
    }

    with open(METADATA_FILE, "w") as f:
        json.dump(metadata, f, indent=2)

    importances = dict(zip(FEATURE_COLUMNS, [round(float(imp), 4) for imp in clf.feature_importances_]))
    sorted_imp = dict(sorted(importances.items(), key=lambda item: item[1], reverse=True))

    with open(IMPORTANCE_FILE, "w") as f:
        json.dump(sorted_imp, f, indent=2)

    print(f"Classifier model saved to {MODEL_FILE}")
    return True

if __name__ == "__main__":
    train_classifier()
