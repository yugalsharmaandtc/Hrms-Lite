/**
 * Employee List Component
 * Purpose: Display grid of employee cards
 * Why: Responsive grid layout
 */
import React from 'react';
import EmployeeCard from './EmployeeCard';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';

const EmployeeList = ({ 
  employees, 
  onDelete, 
  isLoading = false,
  showStats = false 
}) => {
  if (isLoading) {
    return <LoadingSpinner message="Loading employees..." />;
  }

  if (!employees || employees.length === 0) {
    return (
      <EmptyState
        icon="👥"
        title="No employees found"
        description="Start by adding your first employee to the system."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onDelete={onDelete}
          showStats={showStats}
        />
      ))}
    </div>
  );
};

export default EmployeeList;