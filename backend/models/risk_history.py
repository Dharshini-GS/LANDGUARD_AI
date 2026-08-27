from sqlalchemy import ForeignKey, Integer, Float, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class RiskHistory(Base):
    __tablename__ = "risk_history"

    risk_history_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.project_id"),
        nullable=False,
        index=True
    )

    prediction_date: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    delay_probability: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    risk_score: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    risk_category: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    expected_delay_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    highest_risk_stage: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    model_version: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    project = relationship(
        "Project",
        back_populates="risk_history"
    )