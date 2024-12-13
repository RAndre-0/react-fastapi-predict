from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import joblib
import os
from typing import Optional
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Obtenir le chemin du répertoire courant
current_directory = os.getcwd()

# Chemin complet vers ton modèle
model_path = os.path.join(current_directory, "decision_tree.pkl")

# Charger le modèle
model = joblib.load(model_path)

# Définir votre modèle de données
class CommuteValues(BaseModel):
    holiday: str
    temp: float
    rain_1h: float
    snow_1h: float
    clouds_all: int
    weather_main: str
    weather_description: str
    day: str
    month: int
    year: int
    hour: int

@app.get("/")
async def read_root():
    return {"message": "Fast API"}

@app.get("/items/{item_id}")
async def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "q": q}

@app.post("/api")
async def commute(values: CommuteValues):
    try:
        input_data = pd.DataFrame([{
            "holiday": values.holiday,
            "temp": values.temp,
            "rain_1h": values.rain_1h,
            "snow_1h": values.snow_1h,
            "clouds_all": values.clouds_all,
            "weather_main": values.weather_main,
            "weather_description": values.weather_description,
            "day": values.day,
            "month": values.month,
            "year": values.year,
            "hour":values.hour
        }])

        prediction = model.predict(input_data)
        print(prediction)
        return {"prediction": prediction.tolist()[0]}
    except Exception as e:
        return (f"ERROR : {e}")

@app.get("/apitest")
async def commute():
    return {"message": "it works"}