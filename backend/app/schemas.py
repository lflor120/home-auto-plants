from pydantic import BaseModel, field_validator, ConfigDict
from pydantic.alias_generators import to_camel

class UserCreate(BaseModel):
    email: str
    username: str
    name: str
    password: str

    @field_validator('email')
    def must_be_valid_email(cls, value: str):
        if "@" not in value:
            raise ValueError("Must be a valid email")
        return value
    
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class UserPatch(BaseModel):
    email: str | None = None
    username: str | None = None
    name: str | None = None
    password: str | None = None

    @field_validator('email')
    def must_be_valid_email(cls, value: str):
        if "@" not in value:
            raise ValueError("Must be a valid email")
        return value
    
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class User(UserCreate):
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )

class PlantCreate(BaseModel):
    owner_id: int
    plant_type: str
    watering_schedule: str
    plant_name: str
    description: str

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class PlantPatch(BaseModel):
    owner_id: int | None = None
    plant_type: str | None = None
    watering_schedule: str | None = None
    plant_name: str | None = None
    description: str | None = None

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True
    )

class Plant(PlantCreate):
    id: int

    model_config = ConfigDict(
        from_attributes=True
    )