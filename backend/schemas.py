"""
Pydantic API Schemas for Request & Response Validation
"""

from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

# Authentication
class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Dict[str, Any]

class UserProfile(BaseModel):
    user_id: str
    username: str
    full_name: str
    role: str
    state: str
    district: str
    status: str

# Projects
class ProjectSchema(BaseModel):
    project_id: str
    project_name: str
    project_type: str
    state: str
    district: str
    project_manager_id: str
    village_count: int
    land_area_acres: float
    affected_families: int
    total_landowners: int
    project_budget: float
    planned_start_date: str
    planned_completion_date: str
    current_stage: str
    project_status: str

# Risk & Prediction
class RiskPredictionRequest(BaseModel):
    project_id: str

class RiskPredictionResponse(BaseModel):
    project_id: str
    delay_probability: float
    risk_score: int
    risk_category: str
    expected_delay_days: int
    highest_risk_stage: str
    key_risk_drivers: List[Dict[str, Any]]

# What-If Simulation
class SimulationRequest(BaseModel):
    project_id: str
    compensation_disbursement_boost_pct: float = 0.0
    document_verification_boost_pct: float = 0.0
    approval_acceleration_days: int = 0
    legal_dispute_resolution_pct: float = 0.0
    rr_resettlement_boost_pct: float = 0.0

class SimulationResponse(BaseModel):
    project_id: str
    original_risk_score: int
    original_delay_probability: float
    simulated_risk_score: int
    simulated_delay_probability: float
    risk_reduction_pct: float
    estimated_days_saved: int
    recommendations: List[str]

# Alerts
class AlertSchema(BaseModel):
    alert_id: str
    project_id: str
    alert_type: str
    severity: str
    message: str
    status: str
    created_at: str

# AI Assistant
class AssistantQueryRequest(BaseModel):
    query: str
    project_id: Optional[str] = None

class AssistantQueryResponse(BaseModel):
    answer: str
    context_data: Optional[Dict[str, Any]] = None
