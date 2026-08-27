from sqlalchemy import ForeignKey, Integer, Float, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class Project(Base):
    __tablename__ = "projects"

    project_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    project_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    state: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    district: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    project_manager_id: Mapped[str | None] = mapped_column(
        ForeignKey("users.user_id"),
        nullable=True,
        index=True
    )

    village_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    land_area_acres: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    affected_families: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    total_landowners: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    project_budget: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    planned_start_date: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    planned_completion_date: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    current_stage: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    project_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    created_at: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    updated_at: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    # -------------------------
    # Relationships
    # -------------------------

    project_manager = relationship(
        "User",
        back_populates="projects"
    )

    land_parcels = relationship(
        "LandParcel",
        back_populates="project"
    )

    lifecycle_timeline = relationship(
        "LifecycleTimeline",
        back_populates="project"
    )

    compensation = relationship(
        "Compensation",
        back_populates="project"
    )

    legal_disputes = relationship(
        "LegalDispute",
        back_populates="project"
    )

    approvals = relationship(
        "Approval",
        back_populates="project"
    )

    documentation = relationship(
        "Documentation",
        back_populates="project"
    )

    rehabilitation = relationship(
        "RehabilitationRR",
        back_populates="project"
    )

    stakeholders = relationship(
        "Stakeholder",
        back_populates="project"
    )

    administrative_performance = relationship(
        "AdministrativePerformance",
        back_populates="project"
    )

    geospatial = relationship(
        "ProjectGeospatial",
        back_populates="project",
        uselist=False
    )

    outcome = relationship(
        "ProjectOutcome",
        back_populates="project",
        uselist=False
    )

    risk_history = relationship(
        "RiskHistory",
        back_populates="project"
    )
    alerts = relationship(
    "Alert",
    back_populates="project",
    cascade="all, delete-orphan"
)