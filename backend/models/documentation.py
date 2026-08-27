from sqlalchemy import ForeignKey, Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class Documentation(Base):
    __tablename__ = "documentation"

    doc_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.project_id"),
        nullable=False,
        index=True
    )

    document_type: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    submitted_flag: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    verified_flag: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    issue_flag: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    submission_date: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    verification_date: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True
    )

    doc_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    project = relationship(
        "Project",
        back_populates="documentation"
    )