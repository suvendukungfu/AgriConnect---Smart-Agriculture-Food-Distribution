from pydantic import BaseModel, Field
from typing import Dict, Any, Optional


class DiseaseDetectionRequest(BaseModel):
    image_url: str = Field(..., description="S3/MinIO URL for crop image")
    crop_type: str
    metadata: Optional[Dict[str, Any]] = None


class YieldPredictionRequest(BaseModel):
    farm_id: str
    crop_cycle_id: str
    features: Dict[str, Any]


class PredictionResponse(BaseModel):
    model_name: str
    version: str
    confidence: float
    result: Dict[str, Any]
