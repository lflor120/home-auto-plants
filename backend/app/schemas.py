from pydantic import BaseModel, field_validator

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

class User(UserCreate):
    id: int

    model_config = {
        'from_attributes': True
    }

class PlantCreate(BaseModel):
    owner_id: int
    plant_type: str
    watering_schedule: str
    plant_name: str
    description: str

class Plant(PlantCreate):
    id: int

    model_config = {
        'from_attributes': True
    }  