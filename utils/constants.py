"""
LANDGUARD AI System Constants
"""

DATA_TYPE = "SYNTHETIC"
DISCLAIMER_TEXT = (
    "Prototype trained and demonstrated using synthetic/historical-like data. "
    "The system is designed to be retrained and validated using authorized government data when available."
)

STAGES = [
    "Land Identification", "Survey", "Documentation", "Approval",
    "Notification", "Objection/Hearing", "Compensation",
    "Legal Resolution", "R&R", "Possession", "Final Handover"
]

PROJECT_TYPES = [
    "Highway", "Railway", "Airport", "Dam", "Canal",
    "Industrial Corridor", "Metro", "Power Project", "Water Supply", "Urban Development"
]

ROLES = ["ADMIN", "STATE_OFFICER", "DISTRICT_OFFICER", "PROJECT_MANAGER", "ANALYST"]

RISK_CATEGORIES = {
    "LOW": (0, 30),
    "MEDIUM": (31, 60),
    "HIGH": (61, 80),
    "CRITICAL": (81, 100)
}
