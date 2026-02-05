# HRMS Lite - Human Resource Management System

A lightweight, full-stack web application for managing employee records and tracking daily attendance.

## 🚀 Live Demo

- **Frontend**: [Your Vercel URL]
- **Backend API**: [Your Render URL]
- **API Documentation**: [Your Render URL]/docs

## 📋 Overview

HRMS Lite is a production-ready HR management system that allows administrators to:
- Manage employee records (Add, View, Delete)
- Track daily attendance (Mark Present/Absent)
- View attendance statistics and reports
- Filter attendance by date range and employee

## 🛠️ Tech Stack

### Backend
- **Framework**: FastAPI 0.115.0
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy 2.0.35
- **Migrations**: Alembic 1.14.0
- **Validation**: Pydantic 2.9.2
- **Server**: Uvicorn 0.32.0

### Frontend
- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.3
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 6.28.0
- **HTTP Client**: Axios 1.7.9

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: Render PostgreSQL

## ✨ Features

### Core Features ✅
- ✅ Employee Management
  - Add employees with unique ID, name, email, department
  - View all employees in responsive grid
  - Delete employees (cascade deletes attendance)
  
- ✅ Attendance Tracking
  - Mark attendance for any employee on any date
  - View attendance records with employee details
  - Prevent duplicate attendance for same date
  
- ✅ Validation & Error Handling
  - Server-side validation (duplicate checks, email format)
  - Client-side validation with real-time feedback
  - Meaningful error messages
  - Loading states and empty states

### Bonus Features ⭐
- ⭐ Dashboard with summary statistics
- ⭐ Attendance filtering by date range and employee
- ⭐ Employee list with total present days
- ⭐ Professional, production-ready UI

## 📁 Project Structure
```
hrms/
├── backend/
│   ├── alembic/              # Database migrations
│   ├── app/
│   │   ├── api/              # API routes
│   │   ├── core/             # Config & database
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   └── main.py           # FastAPI app
│   ├── requirements.txt
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   └── utils/            # Utilities
│   ├── package.json
│   └── README.md
│
└── README.md                 # This file
```

## 🚀 Local Development Setup

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 14+

### Backend Setup

1. **Navigate to backend directory**
```bash
cd hrms/backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL credentials:
```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/hrms_lite
ALLOWED_ORIGINS=http://localhost:5173
```

5. **Create database**
```bash
createdb hrms_lite
```

6. **Run migrations**
```bash
alembic upgrade head
```

7. **Start backend server**
```bash
uvicorn app.main:app --reload --port 8000
```

Backend runs at: http://localhost:8000
API Docs: http://localhost:8000/docs

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd hrms/frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

4. **Start development server**
```bash
npm run dev
```

Frontend runs at: http://localhost:5173

## 🌐 Deployment Guide

### Deploy Backend to Render

1. **Create New Web Service** on Render
2. **Connect GitHub repository**
3. **Configuration**:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
   - **Environment Variables**:
     - `DATABASE_URL`: (Use Render PostgreSQL)
     - `ALLOWED_ORIGINS`: `https://your-frontend.vercel.app`

4. **Create PostgreSQL Database** on Render
5. **Run migrations** (via Render Shell):
```bash
   alembic upgrade head
```

### Deploy Frontend to Vercel

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Navigate to frontend directory**
```bash
cd frontend
```

3. **Deploy**
```bash
vercel
```

4. **Set environment variable** in Vercel dashboard:
   - `VITE_API_BASE_URL`: `https://your-backend.onrender.com/api/v1`

5. **Redeploy** to apply environment variable

## 📊 API Endpoints

### Employees
- `POST /api/v1/employees` - Create employee
- `GET /api/v1/employees` - List all employees
- `GET /api/v1/employees/with-stats` - List with attendance stats
- `GET /api/v1/employees/{id}` - Get employee by ID
- `DELETE /api/v1/employees/{id}` - Delete employee

### Attendance
- `POST /api/v1/attendance` - Mark attendance
- `GET /api/v1/attendance` - List all attendance (with filters)
- `GET /api/v1/attendance/employee/{id}` - Get employee attendance

Full API documentation: http://localhost:8000/docs

## 🧪 Testing

### Backend Testing (Thunder Client / Postman)
Import `thunder-collection_HRMS-API.json` for ready-to-use API tests.

### Manual Testing Checklist
- [ ] Create employee with valid data
- [ ] Create employee with duplicate ID (should fail)
- [ ] Create employee with invalid email (should fail)
- [ ] View all employees
- [ ] Delete employee
- [ ] Mark attendance
- [ ] Mark duplicate attendance (should fail)
- [ ] Filter attendance by date
- [ ] View dashboard statistics

## 📝 Assumptions & Limitations

### Assumptions
- Single admin user (no authentication required)
- Attendance can only be marked for past/present dates
- One attendance record per employee per day
- Employee ID and email must be unique

### Out of Scope
- User authentication/authorization
- Leave management
- Payroll calculations
- Multi-tenant support
- File uploads
- Advanced reporting

## 🎨 Design Decisions

### Why This Tech Stack?
- **FastAPI**: Modern, fast, auto-generated docs
- **React + Vite**: Fast dev experience, optimized builds
- **Tailwind CSS**: Rapid UI development, consistent design
- **PostgreSQL**: Reliable, ACID-compliant
- **Alembic**: Professional database migration management

### Architecture Choices
- **Service Layer Pattern**: Separate API logic from business logic
- **Component-Based UI**: Reusable, maintainable components
- **RESTful API**: Standard, predictable endpoints
- **Responsive Design**: Mobile-first approach

## 👨‍💻 Development Notes

### Code Quality
- Type hints in Python (Pydantic)
- PropTypes in React components
- Consistent naming conventions
- Comprehensive error handling
- Loading and empty states

### Performance Optimizations
- Database query optimization (JOINs)
- Frontend code splitting
- Lazy loading (potential improvement)
- Connection pooling

## 📞 Support

For issues or questions:
1. Check API docs at `/docs`
2. Review this README
3. Check individual component READMEs

## 📄 License

This project is created for assessment purposes.

---

**Built with ❤️ for professional HR management**# Hrms-Lite
