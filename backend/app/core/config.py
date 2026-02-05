"""
Configuration Management
Purpose: Centralize environment variables and app settings
Why: Secure credentials, easy environment switching (dev/prod)
"""
from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    """Application settings loaded from environment variables"""
    
    # Database
    DATABASE_URL: str
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:5173"]
    
    # Application
    APP_NAME: str = "HRMS Lite API"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()