from .database import Base, engine

# Import every model so SQLAlchemy knows about all tables
from .models import (
    User,
    Project,
    LandParcel,
    LifecycleTimeline,
    Compensation,
    LegalDispute,
    Approval,
    Documentation,
    RehabilitationRR,
    Stakeholder,
    AdministrativePerformance,
    ProjectGeospatial,
    ProjectOutcome,
    RiskHistory,
)


def initialize_database():
    print("Creating LandGuard AI database tables...")

    Base.metadata.create_all(bind=engine)

    print("Database initialization completed.")

    print("\nCreated tables:")

    for table_name in sorted(Base.metadata.tables.keys()):
        print(f"  ✓ {table_name}")


if __name__ == "__main__":
    initialize_database()