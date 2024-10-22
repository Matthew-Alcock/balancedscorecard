import React from 'react';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;  // Optional onClick prop to make the card clickable
}

export const Card: React.FC<CardProps> = ({ children, onClick }) => {
  return (
    <div 
      className={`bg-white shadow rounded p-4 ${onClick ? 'cursor-pointer' : ''}`} 
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="border-b pb-2 mb-2">{children}</div>;
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string; // Add className prop
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className }) => {
  return <h3 className={`font-bold ${className}`}>{children}</h3>; // Apply className here
};

export const CardDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-sm text-gray-600">{children}</p>;
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="mt-2">{children}</div>;
};
