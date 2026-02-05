/**
 * Employee Form Component
 * Purpose: Form to add new employees
 * Why: Reusable form with validation
 */
import React, { useState } from 'react';
import Input from '../common/Input';
import Select from '../common/Select';
import Button from '../common/Button';
import { DEPARTMENTS } from '../../utils/constants';
import { isValidEmail } from '../../utils/helpers';

const EmployeeForm = ({ onSubmit, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.employee_id.trim()) {
      newErrors.employee_id = 'Employee ID is required';
    }

    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
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

  const departmentOptions = DEPARTMENTS.map(dept => ({
    value: dept,
    label: dept
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Employee ID"
        name="employee_id"
        value={formData.employee_id}
        onChange={handleChange}
        placeholder="e.g., EMP001"
        required
        error={errors.employee_id}
        disabled={isLoading}
      />

      <Input
        label="Full Name"
        name="full_name"
        value={formData.full_name}
        onChange={handleChange}
        placeholder="e.g., John Doe"
        required
        error={errors.full_name}
        disabled={isLoading}
      />

      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="e.g., john.doe@company.com"
        required
        error={errors.email}
        disabled={isLoading}
      />

      <Select
        label="Department"
        name="department"
        value={formData.department}
        onChange={handleChange}
        options={departmentOptions}
        required
        error={errors.department}
        disabled={isLoading}
        placeholder="Select department"
      />

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? 'Adding Employee...' : 'Add Employee'}
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

export default EmployeeForm;