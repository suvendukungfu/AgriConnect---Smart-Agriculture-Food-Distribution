import uvicorn
import logging
import sys
from fastapi import FastAPI
from api.routes.yield_router import router

# Configure detailed logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    stream=sys.stdout
)
logger = logging.getLogger("AgriConnect_AI_Engine")

def create_app() -> FastAPI:
    """App initialization and metadata setup."""
    app = FastAPI(
        title="AgriConnect AI Yield Engine",
        description="Enterprise AI system for precision agriculture yield prediction.",
        version="1.0.0"
    )

    # Register API Routes
    app.include_router(router)
    
    @app.on_event("startup")
    async def startup_event():
        logger.info("Initializing AgriConnect AI Engine...")
        # Add tasks on startup (e.g. check for model exists)

    return app

app = create_app()

if __name__ == "__main__":
    # In production, recommend running with gunicorn + uvicorn workers
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
