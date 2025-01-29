from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine
from .routers import plant

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],  # Allowed HTTP methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/")
def get_home():
    return {"message": "Welcome to Plant Automation!"}

app.include_router(plant.router)
