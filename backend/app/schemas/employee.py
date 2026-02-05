"""
Employee Pydantic Schemas
Purpose: Request/response validation and serialization
Why: Automatic validation, clear API contracts, auto-generated docs
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class EmployeeBase(BaseModel):
    """Base schema with common fields"""
    employee_id: str = Field(..., min_length=1, max_length=50, description="Unique employee ID")
    full_name: str = Field(..., min_length=1, max_length=100, description="Full name of employee")
    email: EmailStr = Field(..., description="Valid email address")
    department: str = Field(..., min_length=1, max_length=100, description="Department name")


class EmployeeCreate(EmployeeBase):
    """Schema for creating a new employee"""
    pass


class EmployeeUpdate(BaseModel):
    """Schema for updating employee (all fields optional)"""
    full_name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    department: Optional[str] = Field(None, min_length=1, max_length=100)


class EmployeeResponse(EmployeeBase):
    """Schema for employee response"""
    id: int
    
    class Config:
        from_attributes = True  # Allows SQLAlchemy model conversion


class EmployeeWithStats(EmployeeResponse):
    """Employee with attendance statistics (bonus feature)"""
    total_present_days: int = 0