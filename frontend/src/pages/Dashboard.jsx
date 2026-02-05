import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import employeeService from '../services/employeeService';
import attendanceService from '../services/attendanceService';
import { getErrorMessage } from '../utils/helpers';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalAttendanceRecords: 0,
    presentToday: 0,
    absentToday: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch employees
      const employees = await employeeService.getAllEmployees();
      
      // Fetch all attendance records
      const allAttendance = await attendanceService.getAttendanceRecords();
      
      // Get today's date
      const today = new Date().toISOString().split('T')[0];
      
      // Filter today's attendance
      const todayAttendance = allAttendance.filter(
        record => record.date === today
      );
      
      const presentToday = todayAttendance.filter(
        record => record.status === 'Present'
      ).length;
      
      const absentToday = todayAttendance.filter(
        record => record.status === 'Absent'
      ).length;
      
      setStats({
        totalEmployees: employees.length,
        totalAttendanceRecords: allAttendance.length,
        presentToday,
        absentToday
      });
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchDashboardData} />;
  }

  const statCards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      icon: '👥',
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Attendance Records',
      value: stats.totalAttendanceRecords,
      icon: '📊',
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Present Today',
      value: stats.presentToday,
      icon: '✅',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      title: 'Absent Today',
      value: stats.absentToday,
      icon: '❌',
      color: 'bg-red-500',
      textColor: 'text-red-600'
    }
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Overview of your HR management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className={`text-3xl font-bold ${stat.textColor}`}>
                  {stat.value}
                </p>
              </div>
              <div className={`w-16 h-16 ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center`}>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/employees"
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all"
          >
            <span className="text-2xl mr-3">👥</span>
            <div>
              <p className="font-medium text-gray-900">Manage Employees</p>
              <p className="text-sm text-gray-600">Add, view, or delete employees</p>
            </div>
          </a>
          
          <a
            href="/attendance"
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all"
          >
            <span className="text-2xl mr-3">📅</span>
            <div>
              <p className="font-medium text-gray-900">Mark Attendance</p>
              <p className="text-sm text-gray-600">Record daily attendance</p>
            </div>
          </a>
          
          <a
            href="/attendance"
            className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all"
          >
            <span className="text-2xl mr-3">📊</span>
            <div>
              <p className="font-medium text-gray-900">View Reports</p>
              <p className="text-sm text-gray-600">Check attendance records</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;