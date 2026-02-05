"""
Models package initialization
Purpose: Export all models for easy imports
"""
from .employee import Employee
from .attendance import Attendance

__all__ = ["Employee", "Attendance"]