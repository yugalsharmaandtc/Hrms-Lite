/**
 * Application Constants
 * Purpose: Centralize all configuration values
 */

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

// Attendance Status Options
export const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent'
};

// Departments (can be extended)
export const DEPARTMENTS = [
  'Engineering',
  'HR',
  'Marketing',
  'Sales',
  'Finance',
  'Operations',
  'IT',
  'Customer Support'
];

// Date Format
export const DATE_FORMAT = 'YYYY-MM-DD';

// Pagination
export const DEFAULT_PAGE_SIZE = 50;

// Messages
export const MESSAGES = {
  SUCCESS: {
    EMPLOYEE_CREATED: 'Employee created successfully',
    EMPLOYEE_DELETED: 'Employee deleted successfully',
    ATTENDANCE_MARKED: 'Attendance marked successfully'
  },
  ERROR: {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    NOT_FOUND: 'Resource not found'
  }
};