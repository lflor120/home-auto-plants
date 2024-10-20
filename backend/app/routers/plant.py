from fastapi import APIRouter, HTTPException, Response

from .. import schemas
from ..crud import plant_crud
from ..database import SessionDep

router = APIRouter(
    prefix="/api/plant"
)

@router.post("/", response_model=schemas.Plant, status_code=201)
def create_plant(plant: schemas.PlantCreate, db: SessionDep):
    return plant_crud.create_plant(plant=plant, db=db)

@router.get("/", response_model=list[schemas.Plant])
def get_all_plants(db: SessionDep):
    return plant_crud.get_all_plants(db=db)

@router.get("/{id}", response_model=schemas.Plant)
def get_plant(id: int, db: SessionDep):
    return plant_crud.get_plant_by_id(id=id, db=db)

@router.patch("/{id}", response_model=schemas.Plant)
def update_plant(id: int, plant: schemas.PlantPatch, db: SessionDep):
    return plant_crud.update_plant(id=id, plant=plant, db=db)

@router.delete("/{id}", response_class=Response, status_code=204)
def delete_plant(id: int, db: SessionDep):
    db_plant = plant_crud.get_plant_by_id(id=id, db=db)

    if db_plant is None:
        raise HTTPException(status_code=404, detail="Plant does not exist!")
    plant_crud.delete_plant_by_id(id=id, db=db)
