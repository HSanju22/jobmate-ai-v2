from fastapi import FastAPI

app = FastAPI(
    title="JobMate API",
    description="Backend API for the JobMate AI-powered job application assistant.",
    version="2.0.0",
)


@app.get("/")
def root():
    return {
        "message": "JobMate API is running",
        "version": "2.0.0",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }