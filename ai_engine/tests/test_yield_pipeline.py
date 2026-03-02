"""
AgriConnect AI Engine - Unit Tests
Tests the ML pipeline, prediction service, and API routes.
"""
import os
import sys
import pytest

# Ensure ai_engine root is on path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))


class TestMLHandler:
    """Tests for the core ML infrastructure layer."""

    def test_training_produces_model_file(self, tmp_path):
        """Verify that training creates a serialized model artifact."""
        from infrastructure.ml_handler import MLHandler

        model_path = str(tmp_path / "test_model.joblib")
        handler = MLHandler(model_path=model_path)

        data_path = os.path.join(os.path.dirname(__file__), "..", "data", "crop_yield_data.csv")
        metrics = handler.train_and_save(data_path)

        assert os.path.exists(model_path), "Model file was not created"
        assert "rmse" in metrics
        assert "r2_score" in metrics
        assert metrics["r2_score"] > 0.5, "Model accuracy too low"

    def test_prediction_returns_float(self, tmp_path):
        """Verify prediction output is a valid float."""
        from infrastructure.ml_handler import MLHandler

        model_path = str(tmp_path / "test_model.joblib")
        handler = MLHandler(model_path=model_path)

        data_path = os.path.join(os.path.dirname(__file__), "..", "data", "crop_yield_data.csv")
        handler.train_and_save(data_path)

        prediction = handler.predict({
            "rainfall_mm": 1200.5,
            "avg_temperature_c": 25.5,
            "soil_type": "Alluvial",
            "humidity_percent": 80,
            "area_hectares": 10.5,
            "crop_type": "Rice",
        })

        assert isinstance(prediction, float)
        assert prediction > 0, "Yield prediction should be positive"

    def test_prediction_fails_without_model(self):
        """Verify proper error handling when no model exists."""
        from infrastructure.ml_handler import MLHandler

        handler = MLHandler(model_path="/nonexistent/path/model.joblib")

        with pytest.raises(RuntimeError):
            handler.predict({
                "rainfall_mm": 1200.5,
                "avg_temperature_c": 25.5,
                "soil_type": "Alluvial",
                "humidity_percent": 80,
                "area_hectares": 10.5,
                "crop_type": "Rice",
            })


class TestYieldSchema:
    """Tests for Pydantic validation schemas."""

    def test_valid_request_passes(self):
        """Verify valid input creates a valid schema object."""
        from api.schemas.yield_schema import YieldPredictionRequest

        req = YieldPredictionRequest(
            rainfall_mm=1200.5,
            avg_temperature_c=25.5,
            soil_type="Alluvial",
            humidity_percent=80,
            area_hectares=10.5,
            crop_type="Rice",
        )
        assert req.rainfall_mm == 1200.5

    def test_negative_rainfall_rejected(self):
        """Verify negative rainfall is rejected by Pydantic."""
        from api.schemas.yield_schema import YieldPredictionRequest
        from pydantic import ValidationError

        with pytest.raises(ValidationError):
            YieldPredictionRequest(
                rainfall_mm=-100,
                avg_temperature_c=25.5,
                soil_type="Alluvial",
                humidity_percent=80,
                area_hectares=10.5,
                crop_type="Rice",
            )

    def test_humidity_over_100_rejected(self):
        """Verify humidity above 100% is rejected."""
        from api.schemas.yield_schema import YieldPredictionRequest
        from pydantic import ValidationError

        with pytest.raises(ValidationError):
            YieldPredictionRequest(
                rainfall_mm=1200,
                avg_temperature_c=25.5,
                soil_type="Alluvial",
                humidity_percent=150,
                area_hectares=10.5,
                crop_type="Rice",
            )
