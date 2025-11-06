import React from 'react';

const Button = ({ className, disabled, children, ...props }) => (
  <button
    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
    bg-blue-600 hover:bg-blue-700 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
    dark:bg-blue-500 dark:hover:bg-blue-600 
    dark:focus:ring-offset-gray-900
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

export default Button;