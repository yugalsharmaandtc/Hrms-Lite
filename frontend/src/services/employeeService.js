import api from './api';

const employeeService = {
  /**
   * Get all employees
   * @returns {Promise<Array>}
   */
  getAllEmployees: async () => {
    const response = await api.get('/employees');
    return response.data;
  },

  /**
   * Get employees with attendance statistics (BONUS)
   * @returns {Promise<Array>}
   */
  getEmployeesWithStats: async () => {
    const response = await api.get('/employees/with-stats');
    return response.data;
  },

  /**
   * Get single employee by ID
   * @param {number} id - Employee database ID
   * @returns {Promise<Object>}
   */
  getEmployeeById: async (id) => {
    const response = await api.get(`/employees/${id}`);
    return response.data;
  },

  /**
   * Create new employee
   * @param {Object} employeeData
   * @param {string} employeeData.employee_id
   * @param {string} employeeData.full_name
   * @param {string} employeeData.email
   * @param {string} employeeData.department
   * @returns {Promise<Object>}
   */
  createEmployee: async (employeeData) => {
    const response = await api.post('/employees', employeeData);
    return response.data;
  },

  /**
   * Delete employee
   * @param {number} id - Employee database ID
   * @returns {Promise<void>}
   */
  deleteEmployee: async (id) => {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  },
};

export default employeeService;