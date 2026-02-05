"""
API Dependencies
Purpose: Reusable dependency injection functions
Why: Clean code, consistent DB session management
"""
from typing import Generator
from sqlalchemy.orm import Session
from app.core.database import SessionLocal


def get_db() -> Generator[Session, None, None]:
    """
    Database session dependency
    
    Why use this pattern?
    - Automatic session cleanup
    - Prevents connection leaks
    - Can be overridden in tests
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()