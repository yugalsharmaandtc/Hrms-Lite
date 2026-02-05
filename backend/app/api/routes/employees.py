from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from app.api.deps import get_db
from app.models.employee import Employee
from app.models.attendance import Attendance
from app.schemas.employee import (
    EmployeeCreate, 
    EmployeeResponse, 
    EmployeeWithStats
)

router = APIRouter(prefix="/employees", tags=["employees"])


@router.post(
    "/",
    response_model=EmployeeResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new employee"
)
def create_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db)
):
    existing_emp_id = db.query(Employee).filter(
        Employee.employee_id == employee.employee_id
    ).first()
    
    if existing_emp_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Employee ID '{employee.employee_id}' already exists"
        )
    
    # Check if email already exists
    existing_email = db.query(Employee).filter(
        Employee.email == employee.email
    ).first()
    
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Email '{employee.email}' already exists"
        )
    
    # Create new employee
    db_employee = Employee(**employee.model_dump())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    
    return db_employee


@router.get(
    "/",
    response_model=List[EmployeeResponse],
    summary="Get all employees"
)
def get_employees(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Retrieve all employees with pagination
    
    Why pagination? Prepares for scaling (100+ employees)
    """
    employees = db.query(Employee).offset(skip).limit(limit).all()
    return employees


@router.get(
    "/with-stats",
    response_model=List[EmployeeWithStats],
    summary="Get employees with attendance statistics (Bonus)"
)
def get_employees_with_stats(db: Session = Depends(get_db)):
    # Query employees with attendance count
    employees = db.query(
        Employee,
        func.count(
            func.case((Attendance.status == 'Present', 1))
        ).label('total_present_days')
    ).outerjoin(
        Attendance, Employee.id == Attendance.employee_id
    ).group_by(Employee.id).all()
    
    # Format response
    result = []
    for emp, total_present in employees:
        emp_dict = {
            "id": emp.id,
            "employee_id": emp.employee_id,
            "full_name": emp.full_name,
            "email": emp.email,
            "department": emp.department,
            "total_present_days": total_present
        }
        result.append(emp_dict)
    
    return result


@router.get(
    "/{employee_id}",
    response_model=EmployeeResponse,
    summary="Get employee by database ID"
)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    """Get a single employee by database ID"""
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
    
    return employee


@router.delete(
    "/{employee_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete an employee"
)
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    """
    Delete an employee
    
    Why cascade delete?
    - Attendance records are deleted automatically (defined in model)
    - Maintains referential integrity
    """
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
    
    db.delete(employee)
    db.commit()
    
    return None