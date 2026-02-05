/**
 * Attendance Form Component
 * Purpose: Mark attendance for employees
 * Why: Date picker + employee selection
 */
import React, { useState, useEffect } from 'react';
import Select from '../common/Select';
import Input from '../common/Input';
import Button from '../common/Button';
import { ATTENDANCE_STATUS } from '../../utils/constants';
import { getTodayDate } from '../../utils/helpers';
import employeeService from '../../services/employeeService';

const AttendanceForm = ({ onSubmit, onCancel, isLoading = false }) => {
  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  
  const [formData, setFormData] = useState({
    employee_id: '',
    date: getTodayDate(),
    status: 'Present'
  });

  const [errors, setErrors] = useState({});

  // Fetch employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'employee_id' ? parseInt(value) : value
    }));
    
    // Clear error when user makes changes
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.employee_id) {
      newErrors.employee_id = 'Please select an employee';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  const employeeOptions = employees.map(emp => ({
    value: emp.id,
    label: `${emp.full_name} (${emp.employee_id})`
  }));

  const statusOptions = Object.values(ATTENDANCE_STATUS).map(status => ({
    value: status,
    label: status
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Employee"
        name="employee_id"
        value={formData.employee_id}
        onChange={handleChange}
        options={employeeOptions}
        required
        error={errors.employee_id}
        disabled={isLoading || loadingEmployees}
        placeholder={loadingEmployees ? "Loading employees..." : "Select employee"}
      />

      <Input
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        error={errors.date}
        disabled={isLoading}
        max={getTodayDate()} // Can't mark future attendance
      />

      <Select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={statusOptions}
        required
        error={errors.status}
        disabled={isLoading}
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading || loadingEmployees}
          fullWidth
        >
          {isLoading ? 'Marking Attendance...' : 'Mark Attendance'}
        </Button>
        
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default AttendanceForm;