from fastapi import FastAPI

from . import models
from .database import engine
from .routers import plant

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def get_home():
    return {"message": "Welcome to Plant Automation!"}

app.include_router(plant.router)
