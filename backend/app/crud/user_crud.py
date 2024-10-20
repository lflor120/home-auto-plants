from sqlalchemy.orm import Session
from .. import models
from .. import schemas

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(
        email = user.email,
        username = user.username,
        password = user.password, # will encrypt later
        name = user.name
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_all_users(db: Session):
    return db.query(models.User).all()

def get_user_by_id(id: int, db: Session):
    return db.query(models.User).get(id)

def update_user(id: int, user: schemas.UserPatch, db: Session):
    db_user = get_user_by_id(id=id, db=db)

    for key, val in user.model_dump(exclude_unset=True).items():
        setattr(db_user, key, val)
    
    db.add(db_user)
    db.commit()
    return db_user

def delete_user_by_id(id: int, db: Session):
    db.query(models.User).filter(models.User.id == id).delete()
    db.commit()