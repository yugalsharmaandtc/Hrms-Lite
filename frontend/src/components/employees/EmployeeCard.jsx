/**
 * Employee Card Component
 * Purpose: Display individual employee info
 * Why: Reusable, clean card design
 */
import React from 'react';
import Button from '../common/Button';

const EmployeeCard = ({ employee, onDelete, showStats = false }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${employee.full_name}?`)) {
      onDelete(employee.id);
    }
  };

  return (
    <div className="card p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-xl font-semibold text-primary-700">
                {employee.full_name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {employee.full_name}
              </h3>
              <p className="text-sm text-gray-500">{employee.employee_id}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">📧</span>
              <span className="text-gray-700">{employee.email}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">🏢</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {employee.department}
              </span>
            </div>

            {showStats && employee.total_present_days !== undefined && (
              <div className="flex items-center gap-2 text-sm mt-3 pt-3 border-t">
                <span className="text-gray-500">📊</span>
                <span className="text-gray-700 font-medium">
                  Present Days: {employee.total_present_days}
                </span>
              </div>
            )}
          </div>
        </div>

        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default EmployeeCard;