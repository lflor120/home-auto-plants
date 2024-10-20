from fastapi import APIRouter, HTTPException, Response

from .. import schemas
from ..crud import user_crud
from ..database import SessionDep

router = APIRouter(
    prefix="/api/user"
)

@router.post("/", response_model=schemas.User, status_code=201)
def create_user(user: schemas.UserCreate, db: SessionDep):
    return user_crud.create_user(user=user, db=db)

@router.get("/", response_model=list[schemas.User])
def get_all_users(db: SessionDep):
    return user_crud.get_all_users(db=db)

@router.get("/{id}/plants", response_model=list[schemas.Plant])
def get_plants_by_userid(id: int, db: SessionDep):
    return user_crud.get_users_plants(id=id, db=db)

@router.get("/{id}", response_model=schemas.UserPublic)
def get_user(id: int, db: SessionDep):
    return user_crud.get_user_by_id(id=id, db=db)

@router.patch("/{id}", response_model=schemas.User)
def update_user(id: int, user: schemas.UserPatch, db: SessionDep):
    return user_crud.update_user(id=id, user=user, db=db)

@router.delete("/{id}", response_class=Response, status_code=204)
def delete_user(id: int, db: SessionDep):
    db_user = user_crud.get_user_by_id(id=id, db=db)

    if db_user is None:
        raise HTTPException(status_code=404, detail="user does not exist!")
    user_crud.delete_user_by_id(id=id, db=db)
