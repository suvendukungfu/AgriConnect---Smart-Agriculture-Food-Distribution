from pydantic import BaseModel, Field
from typing import Optional

class YieldPredictionRequest(BaseModel):
    rainfall_mm: float = Field(..., ge=0, example=1200.5)
    avg_temperature_c: float = Field(..., example=25.5)
    soil_type: str = Field(..., example="Alluvial")
    humidity_percent: float = Field(..., ge=0, le=100, example=80)
    area_hectares: float = Field(..., ge=0, example=10.5)
    crop_type: str = Field(..., example="Rice")

class YieldPredictionResponse(BaseModel):
    predicted_yield_tons: float
    model_version: str
    explanation: Optional[str] = None

class TrainingMetrics(BaseModel):
    rmse: float
    mae: float
    r2_score: float
    timestamp: str
