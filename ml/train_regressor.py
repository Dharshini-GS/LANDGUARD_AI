"""
Trains the Delay Duration Regressor model predicting delay_days
"""

import os
import joblib
import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
from ml.features import extract_project_features, FEATURE_COLUMNS
from ml.preprocessing import FeaturePreprocessor
from backend.database import get_db_connection
from utils.config import MODEL_DIR

REGRESSOR_FILE = os.path.join(MODEL_DIR, "delay_regressor.pkl")

def train_regressor():
    print("=" * 50)
    print("Training LANDGUARD AI Delay Regressor...")
    print("=" * 50)

    # 1. Extract Features
    X_df = extract_project_features()
    if X_df.empty:
        return False

    # 2. Get Target delay_days
    conn = get_db_connection()
    out_df = pd.read_sql_query("SELECT project_id, delay_days FROM project_outcomes", conn)
    conn.close()

    merged = pd.merge(X_df, out_df, on='project_id')
    X = merged[FEATURE_COLUMNS]
    y = merged['delay_days']

    # 3. Train/Test Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    # 4. Scaling
    preprocessor = FeaturePreprocessor.load()
    if not preprocessor:
        preprocessor = FeaturePreprocessor()
        X_train_scaled = preprocessor.fit_transform(X_train)
    else:
        X_train_scaled = preprocessor.transform(X_train)

    X_test_scaled = preprocessor.transform(X_test)

    # 5. Train Model
    reg = RandomForestRegressor(n_estimators=150, max_depth=10, random_state=42)
    reg.fit(X_train_scaled, y_train)

    # 6. Evaluate
    y_pred = reg.predict(X_test_scaled)
    mae = mean_absolute_error(y_test, y_pred)
    r2 = r2_score(y_test, y_pred)

    print(f"  Mean Absolute Error (MAE) : {mae:.2f} days")
    print(f"  R^2 Score                : {r2:.4f}")

    # 7. Save Model
    joblib.dump(reg, REGRESSOR_FILE)
    print(f"Regressor model saved to {REGRESSOR_FILE}")
    return True

if __name__ == "__main__":
    train_regressor()
