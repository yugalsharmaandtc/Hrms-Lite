/**
 * Empty State Component
 * Purpose: Show when no data is available
 * Why: Better UX than blank screen
 */
import React from 'react';

const EmptyState = ({ 
  icon = '📋', 
  title = 'No data found', 
  description = 'Get started by adding new items.',
  action
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-sm">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;