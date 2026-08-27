from sqlalchemy import ForeignKey, Float, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from ..database import Base


class ProjectGeospatial(Base):
    __tablename__ = "project_geospatial"

    geo_id: Mapped[str] = mapped_column(
        String(50),
        primary_key=True
    )

    project_id: Mapped[str] = mapped_column(
        ForeignKey("projects.project_id"),
        unique=True,
        nullable=False,
        index=True
    )

    latitude: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    longitude: Mapped[float] = mapped_column(
        Float,
        nullable=False
    )

    state: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    district: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    village: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    location_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    project = relationship(
        "Project",
        back_populates="geospatial"
    )