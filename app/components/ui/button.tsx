import React from 'react';

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => {
  return (
    <button className="bg-blue-500 text-white py-2 px-4 rounded" {...props}>
      {children}
    </button>
  );
};
