"""
Attendance Database Model
Purpose: Define attendance table structure
Why: Track daily employee presence with date-based records
"""
from sqlalchemy import Column, String, Integer, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base


class Attendance(Base):
    """
    Attendance table
    Stores daily attendance records for employees
    """
    __tablename__ = "attendance"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True)
    
    # Foreign key to employee
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    
    # Attendance details
    date = Column(Date, nullable=False, index=True)  # Index for fast date filtering
    status = Column(String, nullable=False)  # "Present" or "Absent"
    
    # Relationship: Attendance belongs to an employee
    employee = relationship("Employee", back_populates="attendance_records")
    
    def __repr__(self):
        return f"<Attendance {self.date}: {self.status}>"