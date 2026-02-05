import React, { useState, useEffect } from 'react';
import AttendanceList from '../components/attendance/AttendanceList';
import AttendanceForm from '../components/attendance/AttendanceForm';
import AttendanceFilter from '../components/attendance/AttendanceFilter';
import Button from '../components/common/Button';
import ErrorMessage from '../components/common/ErrorMessage';
import attendanceService from '../services/attendanceService';
import { getErrorMessage } from '../utils/helpers';

const Attendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async (filters = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await attendanceService.getAttendanceRecords(filters);
      setAttendanceRecords(data);
    } catch (err) {
      console.error('Failed to fetch attendance records:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAttendance = async (attendanceData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await attendanceService.markAttendance(attendanceData);
      setSuccessMessage('Attendance marked successfully!');
      setShowForm(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      
      // Refresh attendance list
      fetchAttendanceRecords(activeFilters);
    } catch (err) {
      console.error('Failed to mark attendance:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    fetchAttendanceRecords(filters);
  };

  const handleResetFilters = () => {
    setActiveFilters({});
    fetchAttendanceRecords();
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
            <p className="mt-2 text-gray-600">
              Track and manage daily employee attendance
            </p>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant={showFilter ? "primary" : "outline"}
              onClick={() => setShowFilter(!showFilter)}
              size="md"
            >
              {showFilter ? 'Hide Filters' : '🔍 Filter'}
            </Button>
            
            <Button
              variant="primary"
              onClick={() => setShowForm(!showForm)}
              size="md"
            >
              {showForm ? 'Cancel' : '+ Mark Attendance'}
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
        <ErrorMessage message={error} onRetry={() => fetchAttendanceRecords(activeFilters)} />
      )}

      {/* Attendance Filter (BONUS) */}
      {showFilter && (
        <AttendanceFilter
          onFilter={handleApplyFilters}
          onReset={handleResetFilters}
        />
      )}

      {/* Mark Attendance Form */}
      {showForm && (
        <div className="card p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Mark Attendance
          </h2>
          <AttendanceForm
            onSubmit={handleMarkAttendance}
            onCancel={() => setShowForm(false)}
            isLoading={isSubmitting}
          />
        </div>
      )}

      {/* Active Filters Badge */}
      {Object.keys(activeFilters).length > 0 && (
        <div className="mb-4 flex items-center gap-2 text-sm">
          <span className="text-gray-600">Active filters:</span>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-800">
            {Object.keys(activeFilters).length} filter(s) applied
          </span>
        </div>
      )}

      {/* Attendance List */}
      <AttendanceList
        attendanceRecords={attendanceRecords}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Attendance;