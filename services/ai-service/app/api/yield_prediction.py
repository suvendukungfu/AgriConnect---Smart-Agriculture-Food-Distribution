from fastapi import APIRouter
router = APIRouter()
@router.post('/predict-yield')
async def predict_yield():
    return {'predicted_yield_tons_ha': 4.5, 'confidence': 0.92}
