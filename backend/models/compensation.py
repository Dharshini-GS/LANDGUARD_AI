from sqlalchemy import ForeignKey, Integer, Float, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class Compensation(Base):
    __tablename__ = "compensation"

    compensation_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.project_id"),
        nullable=False,
        index=True
    )

    total_estimated_amount: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    total_approved_amount: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    total_disbursed_amount: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    total_pending_amount: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    beneficiaries_total: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    beneficiaries_paid: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    beneficiaries_pending: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    average_processing_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    payment_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    compensation_dispute_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    project = relationship(
        "Project",
        back_populates="compensation"
    )