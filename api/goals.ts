import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const goals = await prisma.goal.findMany({
          where: {
            // Add filters based on req.query if necessary
          },
          include: {
            objectives: true,
          },
        });
        res.status(200).json(goals);
        break;
      case 'POST':
        const newGoal = await prisma.goal.create({
          data: req.body,
        });
        res.status(201).json(newGoal);
        break;
      case 'PUT':
        // Implement updating a goal here
        const updatedGoal = await prisma.goal.update({
          where: { id: req.body.id },
          data: req.body,
        });
        res.status(200).json(updatedGoal);
        break;
      case 'DELETE':
        // Implement deleting a goal here
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
