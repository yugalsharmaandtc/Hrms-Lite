"""
Configuration Management - Production Ready
"""
from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # Database
    DATABASE_URL: str
    
    # CORS - will be parsed from comma-separated string
    ALLOWED_ORIGINS: str = "http://localhost:5173"
    
    # Application
    APP_NAME: str = "HRMS Lite API"
    DEBUG: bool = False  # Changed to False for production
    API_V1_PREFIX: str = "/api/v1"
    
    # Environment
    ENVIRONMENT: str = "production"
    
    class Config:
        env_file = ".env"
        case_sensitive = True
    
    @property
    def cors_origins(self) -> List[str]:
        """Convert comma-separated string to list"""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]


settings = Settings()