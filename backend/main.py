from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.resume import router as resume_router


app = FastAPI(
    title="JobMatch AI API",
    description="AI-powered Resume to Job Matching API",
    version="1.0.0",
)


# Allow our React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(resume_router)


@app.get("/")
def home():
    return {
        "message": "JobMatch AI API is running 🚀"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }