from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class Approval(Base):
    __tablename__ = "approvals"

    approval_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.project_id"),
        nullable=False,
        index=True
    )

    approval_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    submission_date: Mapped[str] = mapped_column(
        String(20),
        nullable=False
    )

    approval_date: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    approval_status: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    responsible_authority: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    delay_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    project = relationship(
        "Project",
        back_populates="approvals"
    )