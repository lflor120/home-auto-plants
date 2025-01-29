from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, func
from sqlalchemy.orm import mapped_column, relationship
from app.database import Base

class Plant(Base):
    __tablename__ = "plant"

    id = mapped_column(Integer, primary_key=True, index=True)
    plant_type = Column(String, index=True)
    cron_schedule = Column(String, index=True) # this will be in a cron job syntax, look into better data type later
    interval = Column(Integer)
    frequency = Column(String)
    updated_time = Column(DateTime(timezone=True), onupdate=func.now())
    created_time = Column(DateTime(timezone=True), server_default=func.now())
    plant_name = Column(String)
    description = Column(String)