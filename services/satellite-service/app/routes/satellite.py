from fastapi import APIRouter
from app.schemas.satellite import NdviRequest, NdviResponse
from app.services.ndvi import calculate_ndvi
from app.services.events import emit_event

router = APIRouter(prefix="/api/satellite", tags=["satellite"])


@router.get("/health")
def health():
    return {"status": "ok", "service": "satellite-service"}


@router.post("/ndvi", response_model=NdviResponse)
def ndvi(request: NdviRequest):
    result = calculate_ndvi(request.model_dump())

    emit_event(
        "satellite.events",
        {
            "eventName": "NdviCalculated",
            "payload": {
                "farmId": request.farm_id,
                **result,
            },
        },
    )

    return NdviResponse(
        farm_id=request.farm_id,
        mean_ndvi=result["mean_ndvi"],
        health_score=result["health_score"],
        diagnostics=result["diagnostics"],
    )
