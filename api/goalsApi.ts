// app/api/goalsApi.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// API handler function
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        // Fetch goals, including KPIs and objectives associated with each goal
        const goals = await prisma.goal.findMany({
          include: {
            kpis: true,        // Fetch KPIs associated with each goal
            objectives: true,  // Fetch objectives associated with each goal
          },
        });
        res.status(200).json(goals);
        break;

      case 'POST':
        // Create a new goal
        const newGoal = await prisma.goal.create({
          data: req.body,
        });
        res.status(201).json(newGoal);
        break;

      case 'PUT':
        // Update an existing goal
        const updatedGoal = await prisma.goal.update({
          where: { id: req.body.id },
          data: req.body,
        });
        res.status(200).json(updatedGoal);
        break;

      case 'DELETE':
        // Delete a goal
        await prisma.goal.delete({
          where: { id: req.query.id },
        });
        res.status(204).end(); // No content
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error in API handler:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Helper functions to fetch goals, employees, and KPIs
export async function fetchGoals() {
  const response = await fetch('/api/goals');
  if (!response.ok) {
    throw new Error('Failed to fetch goals');
  }
  return response.json();
}

export async function fetchEmployees() {
  const response = await fetch('/api/employees'); // Assuming you have an employee API
  if (!response.ok) {
    throw new Error('Failed to fetch employees');
  }
  return response.json();
}

export async function fetchKPIs() {
  const response = await fetch('/api/kpis'); // Assuming you have a KPI API
  if (!response.ok) {
    throw new Error('Failed to fetch KPIs');
  }
  return response.json();
}
