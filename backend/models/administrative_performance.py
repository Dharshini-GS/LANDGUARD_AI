from sqlalchemy import ForeignKey, Integer, Float, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class AdministrativePerformance(Base):
    __tablename__ = "administrative_performance"

    admin_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.project_id"),
        nullable=False,
        index=True
    )

    department: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    officer_workload: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    active_case_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    pending_case_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    staff_available: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    average_processing_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    approval_backlog: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    historical_delay_rate: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    coordination_score: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    project = relationship(
        "Project",
        back_populates="administrative_performance"
    )