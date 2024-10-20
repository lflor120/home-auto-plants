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

@router.get("/{id}", response_model=schemas.User)
def get_user(id: int, db: SessionDep):
    return user_crud.get_user_by_id(id=id, db=db)

@router.put("/{id}", response_model=schemas.User)
def update_user(id: int, user: schemas.UserCreate, db: SessionDep):
    return user_crud.update_user(id=id, user=user, db=db)

@router.delete("/{id}", response_class=Response, status_code=204)
def delete_user(id: int, db: SessionDep):
    db_user = user_crud.get_user_by_id(id=id, db=db)

    if db_user is None:
        raise HTTPException(status_code=404, detail="user does not exist!")
    user_crud.delete_user_by_id(id=id, db=db)
