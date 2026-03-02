import pandas as pd
import numpy as np
import logging
import joblib
import os
from datetime import datetime
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

logger = logging.getLogger(__name__)

class MLHandler:
    def __init__(self, model_path: str = "models/yield_model.joblib"):
        self.model_path = model_path
        self.model = None
        self.categorical_features = ["soil_type", "crop_type"]
        self.numeric_features = ["rainfall_mm", "avg_temperature_c", "humidity_percent", "area_hectares"]

    def _build_pipeline(self):
        """Builds a scikit-learn pipeline with preprocessing and model."""
        preprocessor = ColumnTransformer(
            transformers=[
                ("num", "passthrough", self.numeric_features),
                ("cat", OneHotEncoder(handle_unknown='ignore'), self.categorical_features)
            ]
        )
        
        return Pipeline(steps=[
            ("preprocessor", preprocessor),
            ("regressor", RandomForestRegressor(n_estimators=100, random_state=42))
        ])

    def train_and_save(self, data_path: str):
        """Trains the model from a CSV file and saves it."""
        try:
            logger.info(f"Loading training data from {data_path}")
            df = pd.read_csv(data_path)
            
            X = df[self.numeric_features + self.categorical_features]
            y = df["yield_tons"]
            
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
            
            pipeline = self._build_pipeline()
            logger.info("Training RandomForest model...")
            pipeline.fit(X_train, y_train)
            
            # Evaluation
            y_pred = pipeline.predict(X_test)
            metrics = {
                "rmse": np.sqrt(mean_squared_error(y_test, y_pred)),
                "mae": mean_absolute_error(y_test, y_pred),
                "r2_score": r2_score(y_test, y_pred),
                "timestamp": datetime.now().isoformat()
            }
            
            logger.info(f"Training complete. Metrics: {metrics}")
            
            # Save model
            os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
            joblib.dump(pipeline, self.model_path)
            logger.info(f"Model saved to {self.model_path}")
            
            self.model = pipeline
            return metrics
            
        except Exception as e:
            logger.error(f"Error during training: {e}")
            raise e

    def load_model(self):
        """Loads the serialized model."""
        if os.path.exists(self.model_path):
            self.model = joblib.load(self.model_path)
            logger.info("Model loaded successfully.")
            return True
        logger.warning(f"Model file not found at {self.model_path}")
        return False

    def predict(self, input_data: dict):
        """Makes a prediction from input dictionary."""
        if not self.model:
            if not self.load_model():
                raise RuntimeError("Model not trained or found.")
        
        df_input = pd.DataFrame([input_data])
        prediction = self.model.predict(df_input)
        return float(prediction[0])
