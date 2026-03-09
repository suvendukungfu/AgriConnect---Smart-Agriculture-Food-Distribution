from fastapi import APIRouter
router = APIRouter()
@router.post('/predict-disease')
async def predict_disease():
    return {'disease': 'Healthy', 'confidence': 0.98}
