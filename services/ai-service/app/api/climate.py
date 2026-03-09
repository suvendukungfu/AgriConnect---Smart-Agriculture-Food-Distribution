from fastapi import APIRouter
router = APIRouter()
@router.post('/climate-risk')
async def climate_risk():
    return {'drought_risk': 'Low', 'flood_risk': 'Medium', 'heat_stress': 'High'}
