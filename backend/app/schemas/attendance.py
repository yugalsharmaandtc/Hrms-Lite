"""
Attendance Pydantic Schemas
Purpose: Validation for attendance operations
"""
from pydantic import BaseModel, Field, field_validator
from datetime import date as DateType
from typing import Optional


class AttendanceBase(BaseModel):
    """Base attendance schema"""
    date: DateType = Field(..., description="Attendance date")
    status: str = Field(..., description="Present or Absent")
    
    @field_validator('status')
    @classmethod
    def validate_status(cls, v: str) -> str:
        """
        Validate status is either Present or Absent
        Why: Ensures data integrity at API level
        """
        allowed = ['Present', 'Absent']
        if v not in allowed:
            raise ValueError(f'Status must be one of: {", ".join(allowed)}')
        return v


class AttendanceCreate(AttendanceBase):
    """Schema for creating attendance record"""
    employee_id: int = Field(..., description="Employee ID (database ID, not employee_id)")


class AttendanceResponse(AttendanceBase):
    """Schema for attendance response"""
    id: int
    employee_id: int
    
    class Config:
        from_attributes = True


class AttendanceWithEmployee(AttendanceResponse):
    """Attendance record with employee details"""
    employee_name: str
    employee_code: str


class AttendanceStats(BaseModel):
    """Statistics for attendance (bonus feature)"""
    employee_id: int
    employee_name: str
    total_present: int
    total_absent: int
    total_days: int