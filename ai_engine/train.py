import logging
import sys
import os

# Set up local path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from infrastructure.ml_handler import MLHandler

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger("Train_Script")

def main():
    logger.info("Starting initial model training...")
    
    handler = MLHandler(model_path="models/yield_model.joblib")
    data_path = "data/crop_yield_data.csv"
    
    if not os.path.exists(data_path):
        logger.error(f"Training data not found at {data_path}")
        return
        
    try:
        metrics = handler.train_and_save(data_path)
        logger.info(f"Model trained successfully! Metrics: {metrics}")
    except Exception as e:
        logger.error(f"Training failed: {e}")

if __name__ == "__main__":
    main()
