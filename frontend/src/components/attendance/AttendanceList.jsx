/**
 * Attendance List Component
 * Purpose: Display attendance records in table format
 * Why: Tabular data is best for records with multiple columns
 */
import React from 'react';
import LoadingSpinner from '../common/LoadingSpinner';
import EmptyState from '../common/EmptyState';
import { formatDate, getStatusColor } from '../../utils/helpers';

const AttendanceList = ({ attendanceRecords, isLoading = false }) => {
  if (isLoading) {
    return <LoadingSpinner message="Loading attendance records..." />;
  }

  if (!attendanceRecords || attendanceRecords.length === 0) {
    return (
      <EmptyState
        icon="📅"
        title="No attendance records found"
        description="Start by marking attendance for employees."
      />
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendanceRecords.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(record.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {record.employee_name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {record.employee_code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                    {record.status === 'Present' ? '✓' : '✗'} {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Record count */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Showing {attendanceRecords.length} record{attendanceRecords.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
};

export default AttendanceList;