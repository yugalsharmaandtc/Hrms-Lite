from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.models.employee import Employee
from app.schemas.employee import EmployeeCreate

def create_employee(db: Session, employee: EmployeeCreate):
    db_employee = Employee(
        employee_id=employee.employee_id,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department
    )
    db.add(db_employee)
    try:
        db.commit()
        db.refresh(db_employee)
        return db_employee
    except IntegrityError:
        db.rollback()
        return None

def get_all_employees(db: Session):
    return db.query(Employee).order_by(Employee.created_at.desc()).all()

def delete_employee(db: Session, employee_id: str):
    employee = db.query(Employee).filter(Employee.employee_id == employee_id).first()
    if not employee:
        return False
    db.delete(employee)
    db.commit()
    return True
