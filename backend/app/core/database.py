"""
Database Session Management
Purpose: PostgreSQL connection and SQLAlchemy setup
Why: Reusable DB sessions, connection pooling, Base for models
"""
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .config import settings

# Create database engine
# Why pool_pre_ping? Ensures connection is alive before using it
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,  # Verify connections before using
    echo=settings.DEBUG   # Log SQL queries in debug mode
)

# Session factory
# Why autocommit=False? We control when to commit transactions
# Why autoflush=False? We control when to flush changes to DB
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Base class for all models
Base = declarative_base()


def get_db():
    """
    Dependency for getting DB session
    Why: Ensures session is closed after request, prevents connection leaks
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()