from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config import settings
from .routes.auth_routes import router as auth_router
from .routes.project_routes import router as project_router
from .routes.analytics_routes import router as analytics_router
from .routes.risk_routes import router as risk_router
from .routes.stage_routes import router as stage_router
from .routes.alert_routes import router as alert_router
from .routes.user_routes import router as user_router
from .routes.priority_routes import router as priority_router
from .routes.gis_routes import router as gis_router
from .routes.report_routes import router as report_router
from .routes.audit_routes import router as audit_router
from .routes.simulation_routes import router as simulation_router
from .routes.model_routes import router as model_router
from .routes.shap_routes import router as shap_router
from .routes.assistant_routes import router as assistant_router
from .middleware.logging_middleware import RequestLoggingMiddleware
from .middleware.security_middleware import SecurityHeadersMiddleware

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="LandGuard AI Backend API",
)


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------
# Health
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "application": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "online",
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
    }


# ---------------------------------------------------------
# Authentication
# ---------------------------------------------------------

app.include_router(auth_router)
app.include_router(project_router)
app.include_router(analytics_router)
app.include_router(risk_router)
app.include_router(stage_router)
app.include_router(alert_router)
app.include_router(user_router)
app.include_router(priority_router)
app.include_router(gis_router)
app.include_router(report_router)
app.include_router(audit_router)
app.include_router(simulation_router)
app.include_router(model_router)
app.include_router(shap_router)
app.include_router(assistant_router)
app.add_middleware(RequestLoggingMiddleware)
app.add_middleware(SecurityHeadersMiddleware)