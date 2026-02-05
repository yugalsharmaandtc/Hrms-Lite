/**
 * Attendance Filter Component (BONUS)
 * Purpose: Filter attendance by employee and date range
 * Why: Makes large datasets manageable
 */
import React, { useState, useEffect } from 'react';
import Select from '../common/Select';
import Input from '../common/Input';
import Button from '../common/Button';
import employeeService from '../../services/employeeService';

const AttendanceFilter = ({ onFilter, onReset }) => {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({
    employee_id: '',
    start_date: '',
    end_date: ''
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await employeeService.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: name === 'employee_id' ? (value ? parseInt(value) : '') : value
    }));
  };

  const handleApplyFilters = () => {
    // Remove empty filters
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== '')
    );
    onFilter(activeFilters);
  };

  const handleReset = () => {
    setFilters({
      employee_id: '',
      start_date: '',
      end_date: ''
    });
    onReset();
  };

  const employeeOptions = employees.map(emp => ({
    value: emp.id,
    label: `${emp.full_name} (${emp.employee_id})`
  }));

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="card p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Attendance</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Employee"
          name="employee_id"
          value={filters.employee_id}
          onChange={handleChange}
          options={employeeOptions}
          placeholder="All employees"
        />

        <Input
          label="Start Date"
          type="date"
          name="start_date"
          value={filters.start_date}
          onChange={handleChange}
        />

        <Input
          label="End Date"
          type="date"
          name="end_date"
          value={filters.end_date}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-3 mt-4">
        <Button
          variant="primary"
          onClick={handleApplyFilters}
          size="sm"
        >
          Apply Filters
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="secondary"
            onClick={handleReset}
            size="sm"
          >
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};

export default AttendanceFilter;