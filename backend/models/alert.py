from sqlalchemy import ForeignKey, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class Alert(Base):
    __tablename__ = "alerts"

    alert_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey(
            "projects.project_id",
            ondelete="CASCADE"
        ),
        nullable=False,
        index=True
    )

    alert_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    severity: Mapped[str] = mapped_column(
        String(20),
        nullable=False,
        index=True
    )

    message: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        index=True
    )

    created_at: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    acknowledged_by: Mapped[str | None] = mapped_column(
        ForeignKey(
            "users.user_id",
            ondelete="SET NULL"
        ),
        nullable=True,
        index=True
    )

    # -----------------------------------------------------
    # Relationships
    # -----------------------------------------------------

    project = relationship(
        "Project",
        back_populates="alerts"
    )

    acknowledged_user = relationship(
        "User",
        foreign_keys=[acknowledged_by]
    )