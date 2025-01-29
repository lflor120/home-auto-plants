from pydantic import BaseModel, field_validator, ConfigDict
from pydantic.alias_generators import to_camel
from typing import List

class PlantCreate(BaseModel):
    plant_type: str
    interval: int
    frequency: str
    plant_name: str
    description: str

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class PlantPatch(BaseModel):
    plant_type: str | None = None
    cron_schedule: str | None = None
    interval: int | None = None
    frequency: str | None = None
    plant_name: str | None = None
    description: str | None = None

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class PlantPublic(BaseModel):
    plant_type: str
    watering_schedule: str
    plant_name: str
    description: str
    interval: int
    frequency: str

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )    

class Plant(PlantCreate):
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )