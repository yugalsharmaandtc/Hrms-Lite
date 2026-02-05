/**
 * Attendance API Service
 * Purpose: Encapsulate all attendance-related API calls
 */
import api from './api';

const attendanceService = {
  /**
   * Mark attendance for an employee
   * @param {Object} attendanceData
   * @param {number} attendanceData.employee_id
   * @param {string} attendanceData.date - YYYY-MM-DD format
   * @param {string} attendanceData.status - Present or Absent
   * @returns {Promise<Object>}
   */
  markAttendance: async (attendanceData) => {
    const response = await api.post('/attendance', attendanceData);
    return response.data;
  },

  /**
   * Get all attendance records with optional filters (BONUS)
   * @param {Object} filters
   * @param {number} filters.employee_id - Optional
   * @param {string} filters.start_date - Optional (YYYY-MM-DD)
   * @param {string} filters.end_date - Optional (YYYY-MM-DD)
   * @returns {Promise<Array>}
   */
  getAttendanceRecords: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.employee_id) {
      params.append('employee_id', filters.employee_id);
    }
    if (filters.start_date) {
      params.append('start_date', filters.start_date);
    }
    if (filters.end_date) {
      params.append('end_date', filters.end_date);
    }
    
    const response = await api.get(`/attendance?${params.toString()}`);
    return response.data;
  },

  /**
   * Get attendance records for specific employee
   * @param {number} employeeId - Employee database ID
   * @returns {Promise<Array>}
   */
  getEmployeeAttendance: async (employeeId) => {
    const response = await api.get(`/attendance/employee/${employeeId}`);
    return response.data;
  },
};

export default attendanceService;