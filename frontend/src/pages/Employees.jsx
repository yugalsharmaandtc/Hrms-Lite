/**
 * Employees Page
 * Purpose: Employee management interface
 * Why: Core requirement - add, view, delete employees
 */
import React, { useState, useEffect } from 'react';
import EmployeeList from '../components/employees/EmployeeList';
import EmployeeForm from '../components/employees/EmployeeForm';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import employeeService from '../services/employeeService';
import { getErrorMessage } from '../utils/helpers';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, [showStats]);

  const fetchEmployees = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = showStats 
        ? await employeeService.getEmployeesWithStats()
        : await employeeService.getAllEmployees();
      
      setEmployees(data);
    } catch (err) {
      console.error('Failed to fetch employees:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateEmployee = async (employeeData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await employeeService.createEmployee(employeeData);
      setSuccessMessage('Employee added successfully!');
      setShowForm(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh employee list
      fetchEmployees();
    } catch (err) {
      console.error('Failed to create employee:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEmployee = async (employeeId) => {
    setError(null);
    
    try {
      await employeeService.deleteEmployee(employeeId);
      setSuccessMessage('Employee deleted successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh employee list
      fetchEmployees();
    } catch (err) {
      console.error('Failed to delete employee:', err);
      setError(getErrorMessage(err));
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
            <p className="mt-2 text-gray-600">
              Manage your organization's employee records
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant={showStats ? "primary" : "outline"}
              onClick={() => setShowStats(!showStats)}
              size="md"
            >
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </Button>
            
            <Button
              variant="primary"
              onClick={() => setShowForm(!showForm)}
              size="md"
            >
              {showForm ? 'Cancel' : '+ Add Employee'}
            </Button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-green-500 mr-3">✓</span>
            <p className="text-green-800 font-medium">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <ErrorMessage message={error} onRetry={fetchEmployees} />
      )}

      {/* Add Employee Form */}
      {showForm && (
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Add New Employee
          </h2>
          <EmployeeForm
            onSubmit={handleCreateEmployee}
            onCancel={() => setShowForm(false)}
            isLoading={isSubmitting}
          />
        </div>
      )}

      {/* Employee List */}
      <EmployeeList
        employees={employees}
        onDelete={handleDeleteEmployee}
        isLoading={isLoading}
        showStats={showStats}
      />
    </div>
  );
};

export default Employees;