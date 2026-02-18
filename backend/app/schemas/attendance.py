from pydantic import BaseModel, Field, field_validator
from datetime import date as DateType
from typing import Optional


class AttendanceBase(BaseModel):
    date: DateType = Field(..., description="Attendance date")
    status: str = Field(..., description="Present or Absent")
    
    @field_validator('status')
    @classmethod
    def validate_status(cls, v: str) -> str:
        allowed = ['Present', 'Absent']
        if v not in allowed:
            raise ValueError(f'Status must be one of: {", ".join(allowed)}')
        return v


class AttendanceCreate(AttendanceBase):
    employee_id: int = Field(..., description="Employee ID")


# FINAL CODE CLASS 

class AttendanceResponse(AttendanceBase):
    id: int
    employee_id: int
    
    class Config:
        from_attributes = True


class AttendanceWithEmployee(AttendanceResponse):
    employee_name: str
    employee_code: str


class AttendanceStats(BaseModel):
    employee_id: int
    employee_name: str
    total_present: int
    total_absent: int
    total_days: int