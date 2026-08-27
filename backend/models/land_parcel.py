from sqlalchemy import ForeignKey, Integer, Float, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class LandParcel(Base):
    __tablename__ = "land_parcels"

    parcel_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.project_id"),
        nullable=False,
        index=True
    )

    survey_number: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    village: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    land_area_acres: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    land_use_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    ownership_type: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    owner_count: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    ownership_verified: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    ownership_conflict: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    document_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    acquisition_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    possession_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    compensation_status: Mapped[str] = mapped_column(
        String(50),
        nullable=False
    )

    legal_dispute_flag: Mapped[int] = mapped_column(
        Integer,
        nullable=False
    )

    project = relationship(
        "Project",
        back_populates="land_parcels"
    )