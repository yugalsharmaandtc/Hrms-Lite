# HRMS Lite - Frontend

React-based frontend application for Human Resource Management System.

## Tech Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.0.3
- **Styling**: Tailwind CSS 3.4.17
- **Routing**: React Router DOM 6.28.0
- **HTTP Client**: Axios 1.7.9

## Features

### Core Features
- ✅ Employee Management (Add, View, Delete)
- ✅ Attendance Tracking (Mark, View Records)
- ✅ Responsive Design (Mobile & Desktop)
- ✅ Professional UI with Tailwind CSS

### Bonus Features
- ✅ Dashboard with Statistics
- ✅ Attendance Filtering (Date Range, Employee)
- ✅ Employee Attendance Stats (Total Present Days)

## Project Structure
```
src/
├── components/
│   ├── common/           # Reusable UI components
│   ├── employees/        # Employee-related components
│   ├── attendance/       # Attendance-related components
│   └── layout/           # Layout components (Navbar)
├── pages/                # Page-level components
├── services/             # API service layer
├── utils/                # Utility functions & constants
├── App.jsx               # Main app with routing
├── main.jsx              # React entry point
└── index.css             # Global styles + Tailwind
```

## Local Development Setup

### Prerequisites
- Node.js 18+ and npm

### Installation Steps

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
```

Edit `.env` and set your backend API URL:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

3. **Start development server**
```bash
npm run dev
```

Application will be available at: http://localhost:5173

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Building for Production
```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

## Environment Variables

- `VITE_API_BASE_URL` - Backend API base URL

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Key Components

### Reusable Components
- `Button` - Styled button with variants
- `Input` - Form input with validation
- `Select` - Dropdown with options
- `LoadingSpinner` - Loading indicator
- `EmptyState` - Empty data placeholder
- `ErrorMessage` - Error display

### Employee Components
- `EmployeeForm` - Add new employee
- `EmployeeCard` - Display employee info
- `EmployeeList` - Grid of employee cards

### Attendance Components
- `AttendanceForm` - Mark attendance
- `AttendanceList` - Table of records
- `AttendanceFilter` - Date/employee filter (bonus)

## Design Principles

- **Responsive**: Mobile-first design
- **Accessible**: Semantic HTML, proper labels
- **Professional**: Clean, corporate aesthetic
- **Consistent**: Reusable component system
- **User-Friendly**: Loading states, error handling, empty states