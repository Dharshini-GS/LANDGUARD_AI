"""
FastAPI Main Application Entry Point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes.auth_routes import router as auth_router
from backend.routes.project_routes import router as project_router
from backend.routes.risk_routes import router as risk_router
from backend.routes.stage_routes import router as stage_router
from backend.routes.shap_routes import router as shap_router
from backend.routes.simulation_routes import router as simulation_router
from backend.routes.priority_routes import router as priority_router
from backend.routes.alert_routes import router as alert_router
from backend.routes.analytics_routes import router as analytics_router
from backend.routes.gis_routes import router as gis_router
from backend.routes.report_routes import router as report_router
from backend.routes.assistant_routes import router as assistant_router

app = FastAPI(
    title="LANDGUARD AI API",
    description="Predictive Land Acquisition Delay Intelligence REST API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(project_router, prefix="/api/projects", tags=["Projects"])
app.include_router(risk_router, prefix="/api/risk", tags=["Risk"])
app.include_router(stage_router, prefix="/api/stage-risk", tags=["Stage Risk"])
app.include_router(shap_router, prefix="/api/shap", tags=["SHAP Explainability"])
app.include_router(simulation_router, prefix="/api/simulation", tags=["What-If Simulation"])
app.include_router(priority_router, prefix="/api/priority", tags=["Priority Ranking"])
app.include_router(alert_router, prefix="/api/alerts", tags=["Alerts"])
app.include_router(analytics_router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(gis_router, prefix="/api/gis", tags=["GIS Engine"])
app.include_router(report_router, prefix="/api/reports", tags=["Reports"])
app.include_router(assistant_router, prefix="/api/assistant", tags=["AI Assistant"])

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "LANDGUARD AI API", "version": "1.0.0"}
