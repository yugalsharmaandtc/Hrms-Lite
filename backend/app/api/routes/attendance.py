"""
Attendance API Routes
Purpose: Mark and retrieve attendance records
Why: Separate concerns, date filtering for bonus feature
"""
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import date

from app.api.deps import get_db
from app.models.employee import Employee
from app.models.attendance import Attendance
from app.schemas.attendance import (
    AttendanceCreate,
    AttendanceResponse,
    AttendanceWithEmployee
)

router = APIRouter(prefix="/attendance", tags=["attendance"])


@router.post(
    "/",
    response_model=AttendanceResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Mark attendance for an employee"
)
def mark_attendance(
    attendance: AttendanceCreate,
    db: Session = Depends(get_db)
):
    """
    Mark attendance for an employee on a specific date
    
    Validations:
    - Employee must exist
    - No duplicate attendance for same employee on same date
    - Status must be Present or Absent (Pydantic validator)
    """
    # Check if employee exists
    employee = db.query(Employee).filter(
        Employee.id == attendance.employee_id
    ).first()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {attendance.employee_id} not found"
        )
    
    # Check for duplicate attendance on same date
    existing_attendance = db.query(Attendance).filter(
        Attendance.employee_id == attendance.employee_id,
        Attendance.date == attendance.date
    ).first()
    
    if existing_attendance:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Attendance already marked for employee on {attendance.date}"
        )
    
    # Create attendance record
    db_attendance = Attendance(**attendance.model_dump())
    db.add(db_attendance)
    db.commit()
    db.refresh(db_attendance)
    
    return db_attendance


@router.get(
    "/",
    response_model=List[AttendanceWithEmployee],
    summary="Get attendance records with optional date filter (Bonus)"
)
def get_attendance_records(
    employee_id: Optional[int] = Query(None, description="Filter by employee ID"),
    start_date: Optional[date] = Query(None, description="Filter from this date"),
    end_date: Optional[date] = Query(None, description="Filter until this date"),
    db: Session = Depends(get_db)
):
    """
    BONUS FEATURE: Get attendance records with date filtering
    
    Filters:
    - By employee (optional)
    - By date range (optional)
    
    Why this approach?
    - Flexible filtering
    - Single query with JOINs
    - Returns employee details with attendance
    """
    # Base query with employee details
    query = db.query(
        Attendance.id,
        Attendance.date,
        Attendance.status,
        Attendance.employee_id,
        Employee.full_name.label('employee_name'),
        Employee.employee_id.label('employee_code')
    ).join(Employee, Attendance.employee_id == Employee.id)
    
    # Apply filters
    if employee_id:
        query = query.filter(Attendance.employee_id == employee_id)
    
    if start_date:
        query = query.filter(Attendance.date >= start_date)
    
    if end_date:
        query = query.filter(Attendance.date <= end_date)
    
    # Order by date descending (most recent first)
    query = query.order_by(Attendance.date.desc())
    
    results = query.all()
    
    # Format response
    return [
        {
            "id": r.id,
            "date": r.date,
            "status": r.status,
            "employee_id": r.employee_id,
            "employee_name": r.employee_name,
            "employee_code": r.employee_code
        }
        for r in results
    ]


@router.get(
    "/employee/{employee_id}",
    response_model=List[AttendanceResponse],
    summary="Get attendance records for a specific employee"
)
def get_employee_attendance(
    employee_id: int,
    db: Session = Depends(get_db)
):
    """Get all attendance records for a specific employee"""
    # Check if employee exists
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
    
    # Get attendance records
    attendance_records = db.query(Attendance).filter(
        Attendance.employee_id == employee_id
    ).order_by(Attendance.date.desc()).all()
    
    return attendance_records