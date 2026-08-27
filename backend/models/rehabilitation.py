from sqlalchemy import ForeignKey, Integer, Float, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class RehabilitationRR(Base):
    __tablename__ = "rehabilitation_rr"

    rr_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.project_id"),
        nullable=False,
        index=True
    )

    affected_families: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    families_eligible: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    families_rehabilitated: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    families_pending: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    houses_required: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    houses_completed: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    rr_budget: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    rr_spent: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    rr_completion_percentage: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    rr_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    project = relationship(
        "Project",
        back_populates="rehabilitation"
    )