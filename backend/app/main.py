"""
FastAPI Application Entry Point
Purpose: Initialize app, configure CORS, register routes
Why: Single source of truth for app configuration
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import employees_router, attendance_router

# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    description="Lightweight Human Resource Management System API",
    version="1.0.0",
    docs_url="/docs",  # Swagger UI
    redoc_url="/redoc"  # ReDoc UI
)

# Configure CORS
# Why? Frontend (React) runs on different port, needs access
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,  # Frontend URLs
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, DELETE, etc.
    allow_headers=["*"],  # Accept any headers
)

# Register routes
app.include_router(employees_router, prefix=settings.API_V1_PREFIX)
app.include_router(attendance_router, prefix=settings.API_V1_PREFIX)


@app.get("/")
def root():
    """Health check endpoint"""
    return {
        "message": "HRMS Lite API is running",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    """Health check for deployment platforms"""
    return {"status": "healthy"}