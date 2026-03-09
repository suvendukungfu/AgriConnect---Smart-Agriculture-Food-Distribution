from typing import Dict, Any
import numpy as np


def calculate_ndvi(_payload: Dict[str, Any]) -> Dict[str, Any]:
    # Placeholder: real implementation reads raster with Rasterio/GDAL.
    red = np.array([0.2, 0.3, 0.4])
    nir = np.array([0.6, 0.7, 0.8])
    ndvi = (nir - red) / (nir + red)
    mean = float(np.mean(ndvi))

    return {
        "mean_ndvi": mean,
        "health_score": round(min(max(mean * 100, 0), 100), 2),
        "diagnostics": {
            "pixel_count": int(ndvi.size),
            "min_ndvi": float(np.min(ndvi)),
            "max_ndvi": float(np.max(ndvi)),
        },
    }
