from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from pathlib import Path
import joblib
import pandas as pd
import os
from dotenv import load_dotenv
from supabase import create_client
load_dotenv(Path(__file__).parent / ".env")

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise RuntimeError("Missing SUPABASE_URL or SUPABASE_KEY in backend/.env")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://127.0.0.1",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost:8001",
        "http://127.0.0.1:8001",
        "file://",
        "*",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Landmark(BaseModel):
    x: float
    y: float
    z: float


class PredictionRequest(BaseModel):
    landmarks: List[Landmark]


class AttemptRequest(BaseModel):
    user_id: str
    sign_id: int
    recognized_sign: str
    correct: bool
    confidence: float
    response_time: float
    xp_earned: int


# Load the trained SilentSync gesture model
BASE_DIR = Path(__file__).parent.parent

MODEL_PATH = (
    BASE_DIR
    / "ml"
    / "models"
    / "gesture_model.pkl"
)

if not MODEL_PATH.exists():
    raise FileNotFoundError(f"Gesture model not found at {MODEL_PATH}")

model = joblib.load(MODEL_PATH)


def normalize_landmarks(landmarks):
    """Normalize landmarks relative to the wrist."""

    wrist = landmarks[0]

    features = []

    for landmark in landmarks:
        features.extend([
            landmark.x - wrist.x,
            landmark.y - wrist.y,
            landmark.z - wrist.z
        ])

    return features


@app.get("/")
def home():
    return {
        "message": "SilentSync backend is running"
    }


@app.post("/predict")
def predict(request: PredictionRequest):

    landmarks = request.landmarks

    if len(landmarks) == 0:
        return {
            "prediction": "NO HAND",
            "confidence": 0.0
        }

    features = normalize_landmarks(landmarks)

    features_df = pd.DataFrame(
        [features],
        columns=model.feature_names_in_
    )

    prediction = model.predict(features_df)[0]

    probabilities = model.predict_proba(features_df)[0]

    confidence = float(max(probabilities))

    return {
        "prediction": str(prediction),
        "confidence": confidence
    }
@app.post("/attempt")
def save_attempt(request: AttemptRequest):
    data = request.dict() if hasattr(request, "dict") else request.model_dump()

    try:
        result = supabase.table("sign_attempts").insert(data).execute()
    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Failed to save sign attempt",
                "message": str(exc)
            }
        ) from exc

    if not getattr(result, "data", None):
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Supabase insert returned no data",
                "message": "The attempt was not persisted."
            }
        )

    return {
        "success": True,
        "attempt": result.data
    }