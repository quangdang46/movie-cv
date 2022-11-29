import React from 'react';

const Toggle = () => {
  return (
    <span className="mr-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-gray-700 dark:text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 6h16M4 12h16M4 18h7"
        />
      </svg>
    </span>
  );
};

export default Toggle;