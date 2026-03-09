from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.services.satellite import calculate_ndvi_for_polygon

router = APIRouter()

class PolygonRequest(BaseModel):
    farm_id: str
    coordinates: List[List[float]] # GeoJSON coordinates e.g. [[lng, lat], ...]

@router.post("/calculate-ndvi")
async def calculate_ndvi(request: PolygonRequest):
    try:
        result = await calculate_ndvi_for_polygon(request.farm_id, request.coordinates)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
