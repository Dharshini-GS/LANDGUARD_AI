from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class ProjectOutcome(Base):
    __tablename__ = "project_outcomes"

    outcome_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.project_id"),
        unique=True,
        nullable=False,
        index=True
    )

    planned_duration_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    actual_duration_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    delay_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    delay_flag: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    final_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    delay_stage: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    completion_date: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    project = relationship(
        "Project",
        back_populates="outcome"
    )