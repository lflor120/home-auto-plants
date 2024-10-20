from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import mapped_column, relationship
from app.database import Base

class User(Base):
    __tablename__ = "app_user"

    id = mapped_column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    created_time = Column(DateTime(timezone=True), server_default=func.now())
    updated_time = Column(DateTime(timezone=True), onupdate=func.now())
    password = Column(String, nullable=False)
    name = Column(String)

    # 1: Many relationship
    plants = relationship(
        "Plant",
        back_populates="owner",
        cascade="all, delete-orphan"
    )

class Plant(Base):
    __tablename__ = "plant"

    id = mapped_column(Integer, primary_key=True, index=True)
    owner_id = mapped_column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
    plant_type = Column(String, index=True)
    watering_schedule = Column(String, index=True) # this will be in a cron job syntax, look into better data type later
    updated_time = Column(DateTime(timezone=True), onupdate=func.now())
    created_time = Column(DateTime(timezone=True), server_default=func.now())
    plant_name = Column(String)
    description = Column(String)

    # Many: 1 relationship
    owner = relationship(
        "User",
        back_populates="plants"
    )