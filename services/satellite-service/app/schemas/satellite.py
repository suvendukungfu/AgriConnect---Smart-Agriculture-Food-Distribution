from pydantic import BaseModel
from typing import Dict, Any


class NdviRequest(BaseModel):
    farm_id: str
    image_url_red_band: str
    image_url_nir_band: str


class NdviResponse(BaseModel):
    farm_id: str
    mean_ndvi: float
    health_score: float
    diagnostics: Dict[str, Any]
