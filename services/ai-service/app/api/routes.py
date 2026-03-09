from fastapi import APIRouter
from . import disease, yield_prediction

router = APIRouter()
router.include_router(disease.router, tags=['disease'])
router.include_router(yield_prediction.router, tags=['yield_prediction'])
