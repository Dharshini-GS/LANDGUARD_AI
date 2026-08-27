from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class Stakeholder(Base):
    __tablename__ = "stakeholders"

    stakeholder_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.project_id"),
        nullable=False,
        index=True
    )

    stakeholder_type: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    stakeholder_name: Mapped[str] = mapped_column(
        String(200),
        nullable=False
    )

    engagement_level: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    sentiment: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    requests_received: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    requests_resolved: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    pending_requests: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    response_time_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    project = relationship(
        "Project",
        back_populates="stakeholders"
    )