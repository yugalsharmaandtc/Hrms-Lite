"""
Employee Database Model
Purpose: Define employee table structure
Why: ORM for type-safe database operations
"""
from sqlalchemy import Column, String, Integer
from sqlalchemy.orm import relationship
from app.core.database import Base


class Employee(Base):
    """
    Employee table
    Stores employee master data
    """
    __tablename__ = "employees"
    
    # Primary key
    id = Column(Integer, primary_key=True, index=True)
    
    # Employee details
    employee_id = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    department = Column(String, nullable=False)
    
    # Relationship: One employee has many attendance records
    # Why cascade="all, delete-orphan"? When employee is deleted, delete their attendance too
    attendance_records = relationship(
        "Attendance",
        back_populates="employee",
        cascade="all, delete-orphan"
    )
    
    def __repr__(self):
        return f"<Employee {self.employee_id}: {self.full_name}>"