from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class LegalDispute(Base):
    __tablename__ = "legal_disputes"

    dispute_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.project_id"),
        nullable=False,
        index=True
    )

    case_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    filing_date: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    resolution_date: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    case_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    pending_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    court_level: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    case_severity: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    project = relationship(
        "Project",
        back_populates="legal_disputes"
    )