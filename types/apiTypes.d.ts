// types/index.d.ts

// Type representing an Employee
export interface Employee {
    id: string;                   // Unique identifier for the employee
    name: string;                 // Name of the employee
    email: string;                // Email address of the employee
    divisionId: string;          // Reference to the division the employee belongs to
    goals?: Goal[];               // List of goals associated with the employee
  }
  
  // Type representing a Division
  export interface Division {
    id: string;                  // Unique identifier for the division
    name: string;                // Name of the division
    description?: string;        // Description of the division
    employees?: Employee[];      // List of employees in the division
  }
  
  // Type representing a Goal
  export interface Goal {
  id: string;
  title: string;
  description?: string;
  ownerId: string; // This is used to reference the employee who owns the goal
  objectives?: string[]; // Assuming objectives is an array of strings
  kpis?: KPI[]; // Optional relation to KPIs
  progress: Int;      // Assuming progress is an integer percentage

  // Add any other necessary fields
}
  
  // Type representing a KPI (Key Performance Indicator)
  export interface KPI {
    id: string;                  // Unique identifier for the KPI
    goalId: string;              // Reference to the associated goal
    name: string;                // Name of the KPI
    targetValue: number;         // Target value for the KPI
    actualValue?: number;        // Actual value achieved for the KPI
    status?: 'On Track' | 'At Risk' | 'Off Track'; // Status of the KPI
  }
  
  // Type representing an Objective
  export interface Objective {
    id: string;                  // Unique identifier for the objective
    goalId: string;              // Reference to the associated goal
    title: string;               // Title of the objective
    description?: string;        // Description of the objective
    completionStatus: boolean;   // Indicates if the objective is complete
  }
  
  // Type representing a notification message for feedback
  export interface Notification {
    id: string;                  // Unique identifier for the notification
    message: string;             // The notification message
    type: 'success' | 'error' | 'info'; // Type of notification
    timestamp: Date;             // When the notification was created
  }
  
  // Additional types can be added as needed
  