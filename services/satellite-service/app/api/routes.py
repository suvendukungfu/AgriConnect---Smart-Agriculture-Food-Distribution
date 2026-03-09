from fastapi import APIRouter
from . import ndvi

router = APIRouter()
router.include_router(ndvi.router, tags=["ndvi"])
