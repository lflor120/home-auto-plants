from sqlalchemy.orm import Session
from .. import models
from .. import schemas

def create_plant(db: Session, plant: schemas.PlantCreate):
    db_plant = models.Plant(
        owner_id = plant.owner_id,
        plant_type = plant.plant_type,
        watering_schedule = plant.watering_schedule,
        plant_name = plant.plant_name,
        description = plant.description
    )

    db.add(db_plant)
    db.commit()
    db.refresh()
    return db_plant

def get_all_plants(db: Session):
    return db.query(models.Plant).all()

def get_plant_by_id(id: int, db: Session):
    return db.query(models.Plant).get(id)

def update_plant(id: int, plant: schemas.PlantCreate, db: Session):
    db_plant = get_plant_by_id(id=id, db=db)

    for key, val in plant.model_dump(exclude_unset=True).items():
        setattr(db_plant, key, val)
    
    db.add(db_plant)
    db.commit()
    return db_plant

def delete_plant_by_id(id: int, db: Session):
    db.query(models.Plant).filter(models.Plant.id == id).delete()
    db.commit()
