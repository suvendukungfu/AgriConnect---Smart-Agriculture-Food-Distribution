from fastapi import APIRouter, HTTPException, Depends
from services.yield_service import YieldService
from infrastructure.ml_handler import MLHandler
from api.schemas.yield_schema import YieldPredictionRequest, YieldPredictionResponse, TrainingMetrics
import logging

logger = logging.getLogger(__name__)

# Initialize the ML handler globally to ensure the model stays loaded in memory
ml_handler = MLHandler()
yield_service = YieldService(ml_handler)

router = APIRouter(prefix="/api/v1", tags=["AI Engine"])

@router.post("/predict-yield", response_model=YieldPredictionResponse)
async def predict_yield(request: YieldPredictionRequest):
    """Predicts crop yield using the trained RandomForest model."""
    try:
        return await yield_service.predict_yield(request)
    except RuntimeError as e:
        logger.error(f"Prediction attempt failed: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Internal error: {e}")
        raise HTTPException(status_code=500, detail="Yield prediction failed.")

@router.post("/train-model", response_model=TrainingMetrics)
async def train_model():
    """Manually triggers model re-training with current dataset."""
    try:
        data_path = "data/crop_yield_data.csv"
        return await yield_service.train_model(data_path)
    except Exception as e:
        logger.error(f"Training failed: {e}")
        raise HTTPException(status_code=500, detail=f"Model training failed: {str(e)}")

@router.get("/health")
async def health_check():
    """Health status check and model metadata."""
    model_loaded = ml_handler.load_model()
    return {
        "status": "online",
        "model_loaded": model_loaded,
        "service": "AgriConnect AI Yield Engine"
    }
