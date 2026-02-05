/**
 * Navigation Bar Component
 * Purpose: Top navigation with links
 * Why: Consistent navigation across pages
 */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/employees', label: 'Employees', icon: '👥' },
    { path: '/attendance', label: 'Attendance', icon: '📅' },
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-2xl">🏢</span>
                <span className="text-xl font-bold text-gray-900">HRMS Lite</span>
              </Link>
            </div>
            
            {/* Navigation Links */}
            <div className="hidden sm:ml-10 sm:flex sm:space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium transition-colors
                    ${isActive(item.path)
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Right side - can add user menu later */}
          <div className="flex items-center">
            <span className="text-sm text-gray-600">Admin</span>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="sm:hidden border-t border-gray-200">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex-1 flex flex-col items-center py-2 text-xs font-medium
                ${isActive(item.path)
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600'
                }
              `}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;