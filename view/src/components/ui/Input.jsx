import React from 'react';

const Input = ({ className, ...props }) => (
  <input
    className={`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
    focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm 
    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
    dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
    {...props}
  />
);

export default Input;