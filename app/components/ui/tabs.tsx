import React, { useState, ReactNode, ReactElement } from 'react';

// Tabs Component
export const Tabs: React.FC<{ defaultValue: string; children: ReactNode }> = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      <div className="flex border-b">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Pass activeTab and setActiveTab to TabsTrigger
            return React.cloneElement(child, { activeTab, setActiveTab });
          }
          return null;
        })}
      </div>
      <div>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === TabsContent) {
            // Pass activeTab to TabsContent
            return React.cloneElement(child, { activeTab });
          }
          return null;
        })}
      </div>
    </div>
  );
};

export const TabsList: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex">{children}</div>;
};

interface TabsTriggerProps {
  value: string;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  children: ReactNode;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, activeTab, setActiveTab }) => {
  return (
    <button
      className={`py-2 px-4 ${activeTab === value ? 'border-b-2 border-blue-500' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  activeTab: string;
  children: ReactNode;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, activeTab, children }) => {
  return activeTab === value ? <div className="pt-4">{children}</div> : null;
};
