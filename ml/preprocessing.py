"""
Preprocessing pipeline for scaling and transforming features
"""

import joblib
import os
import pandas as pd
from sklearn.preprocessing import StandardScaler
from utils.config import MODEL_DIR

PREPROCESSOR_FILE = os.path.join(MODEL_DIR, "preprocessor.pkl")

class FeaturePreprocessor:
    def __init__(self):
        self.scaler = StandardScaler()
        self.feature_names = []

    def fit_transform(self, df: pd.DataFrame) -> pd.DataFrame:
        self.feature_names = df.columns.tolist()
        scaled = self.scaler.fit_transform(df)
        return pd.DataFrame(scaled, columns=self.feature_names, index=df.index)

    def transform(self, df: pd.DataFrame) -> pd.DataFrame:
        scaled = self.scaler.transform(df)
        return pd.DataFrame(scaled, columns=self.feature_names, index=df.index)

    def save(self, filepath: str = PREPROCESSOR_FILE):
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        joblib.dump(self, filepath)

    @classmethod
    def load(cls, filepath: str = PREPROCESSOR_FILE):
        if os.path.exists(filepath):
            return joblib.load(filepath)
        return None
