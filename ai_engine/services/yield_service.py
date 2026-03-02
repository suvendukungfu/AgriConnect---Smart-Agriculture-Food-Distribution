import logging
from infrastructure.ml_handler import MLHandler
from api.schemas.yield_schema import YieldPredictionRequest, YieldPredictionResponse, TrainingMetrics
from typing import Dict, Any

logger = logging.getLogger(__name__)

class YieldService:
    def __init__(self, ml_handler: MLHandler):
        self.ml_handler = ml_handler

    async def predict_yield(self, request: YieldPredictionRequest) -> YieldPredictionResponse:
        """Invokes the ML handler for prediction."""
        logger.info(f"Predicting yield for {request.dict()}")
        
        try:
            # Map Pydantic to CSV format
            input_data = {
                "rainfall_mm": request.rainfall_mm,
                "avg_temperature_c": request.avg_temperature_c,
                "soil_type": request.soil_type,
                "humidity_percent": request.humidity_percent,
                "area_hectares": request.area_hectares,
                "crop_type": request.crop_type
            }
            
            prediction = self.ml_handler.predict(input_data)
            
            return YieldPredictionResponse(
                predicted_yield_tons=round(prediction, 4),
                model_version="1.0.0",
                explanation=f"Based on historical data for {request.soil_type} soil and {request.crop_type} crop."
            )
            
        except Exception as e:
            logger.error(f"Prediction error: {e}")
            raise e

    async def train_model(self, data_path: str) -> TrainingMetrics:
        """Triggers model training through the ML handler."""
        logger.info(f"Triggering model training from {data_path}")
        metrics_dict = self.ml_handler.train_and_save(data_path)
        
        return TrainingMetrics(
            rmse=metrics_dict["rmse"],
            mae=metrics_dict["mae"],
            r2_score=metrics_dict["r2_score"],
            timestamp=metrics_dict["timestamp"]
        )
