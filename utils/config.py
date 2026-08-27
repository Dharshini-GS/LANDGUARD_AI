"""
LANDGUARD AI Configuration Settings
"""

import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATABASE_PATH = os.path.join(BASE_DIR, os.getenv("DATABASE_PATH", "database/landguard.db"))
DATA_DIR = os.path.join(BASE_DIR, "data")
MODEL_DIR = os.path.join(BASE_DIR, "models")
REPORTS_DIR = os.path.join(BASE_DIR, "reports/generated")

SECRET_KEY = os.getenv("SECRET_KEY", "landguard_super_secret_jwt_key_2026_production")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "480"))
