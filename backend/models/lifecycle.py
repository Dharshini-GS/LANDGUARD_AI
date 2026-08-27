from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class LifecycleTimeline(Base):
    __tablename__ = "lifecycle_timeline"

    timeline_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.project_id"),
        nullable=False,
        index=True
    )

    stage_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    planned_start_date: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    planned_end_date: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    actual_start_date: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    actual_end_date: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    stage_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    responsible_department: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    planned_duration_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    actual_duration_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    stage_delay_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    project = relationship(
        "Project",
        back_populates="lifecycle_timeline"
    )