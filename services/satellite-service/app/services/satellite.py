import numpy as np
import rasterio
import mercantile
import asyncio
from typing import List

async def calculate_ndvi_for_polygon(farm_id: str, coordinates: List[List[float]]):
    """
    Simulates calculating Normalized Difference Vegetation Index (NDVI)
    using Rasterio and NumPy for geospatial processing.
    In production, this would fetch real Sentinel-2 satellite data.
    """
    
    # Simulate processing delay proportional to polygon complexity
    await asyncio.sleep(1.5)
    
    # Mocking NDVI range (-1.0 to 1.0)
    # Healthy vegetation is typically > 0.5
    mean_ndvi = float(np.random.uniform(0.35, 0.88))
    
    # Generate mock heatmap values for the front-end to render Mapbox GL interpolation
    heatmap_matrix = np.random.uniform(max(mean_ndvi - 0.2, 0), min(mean_ndvi + 0.2, 1), size=(10, 10))
    
    return {
        "farm_id": farm_id,
        "metrics": {
            "mean_ndvi": round(mean_ndvi, 3),
            "max_ndvi": round(float(np.max(heatmap_matrix)), 3),
            "min_ndvi": round(float(np.min(heatmap_matrix)), 3),
        },
        "health_status": "Healthy" if mean_ndvi > 0.6 else "Stress Detected",
        "timestamp": "2023-11-20T10:00:00Z",
        "resolution": "10m/px",
        # We would normally return a base64 encoded PNG or GeoTIFF tile URL here
        "heatmap_data": heatmap_matrix.tolist() 
    }
