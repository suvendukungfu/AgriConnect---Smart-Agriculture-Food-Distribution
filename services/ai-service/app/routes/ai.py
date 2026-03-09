from fastapi import APIRouter
from app.schemas.prediction import (
    DiseaseDetectionRequest,
    YieldPredictionRequest,
    PredictionResponse,
)
from app.services.inference import detect_disease, predict_yield
from app.services.events import emit_event

router = APIRouter(prefix="/api/ai", tags=["ai"])


@router.get("/health")
def health():
    return {"status": "ok", "service": "ai-service"}


@router.post("/disease-detection", response_model=PredictionResponse)
def disease_detection(request: DiseaseDetectionRequest):
    result = detect_disease(request.model_dump())
    event = {
        "eventName": "DiseaseDetected",
        "payload": {
            "cropType": request.crop_type,
            "imageUrl": request.image_url,
            "result": result,
        },
    }
    emit_event("ai.events", event)

    return PredictionResponse(
        model_name="disease-detector",
        version="v1",
        confidence=0.91,
        result=result,
    )


@router.post("/yield-prediction", response_model=PredictionResponse)
def yield_prediction(request: YieldPredictionRequest):
    result = predict_yield(request.model_dump())
    event = {
        "eventName": "YieldPredicted",
        "payload": {
            "farmId": request.farm_id,
            "cropCycleId": request.crop_cycle_id,
            "result": result,
        },
    }
    emit_event("ai.events", event)

    return PredictionResponse(
        model_name="yield-predictor",
        version="v1",
        confidence=0.87,
        result=result,
    )
