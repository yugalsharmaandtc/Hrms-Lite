# HRMS Lite - Backend API

FastAPI-based REST API for Human Resource Management System.

## Tech Stack

- **Framework**: FastAPI 0.115.0
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Migrations**: Alembic
- **Validation**: Pydantic v2

## Local Development Setup

### Prerequisites
- Python 3.11+
- PostgreSQL 14+

### Installation

1. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. **Install dependencies**
```bash
pip install -r requirements.txt
```

3. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

4. **Create database**
```bash
# In PostgreSQL
createdb hrms_lite
```

5. **Run migrations**
```bash
alembic upgrade head
```

6. **Start server**
```bash
uvicorn app.main:app --reload --port 8000
```

API will be available at: http://localhost:8000
API Docs: http://localhost:8000/docs

## API Endpoints

### Employees
- `POST /api/v1/employees` - Create employee
- `GET /api/v1/employees` - List all employees
- `GET /api/v1/employees/with-stats` - List with attendance stats
- `GET /api/v1/employees/{id}` - Get employee details
- `DELETE /api/v1/employees/{id}` - Delete employee

### Attendance
- `POST /api/v1/attendance` - Mark attendance
- `GET /api/v1/attendance` - List attendance (with filters)
- `GET /api/v1/attendance/employee/{id}` - Get employee attendance

## Database Schema

### Employees Table
- `id` (PK)
- `employee_id` (unique)
- `full_name`
- `email` (unique)
- `department`

### Attendance Table
- `id` (PK)
- `employee_id` (FK)
- `date`
- `status` (Present/Absent)