import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const goals = await prisma.goal.findMany({
          include: {
            objectives: true,
          },
        });
        res.status(200).json(goals);
      } catch (error) {
        console.error('Error fetching goals:', error);
        res.status(500).json({ error: 'Failed to fetch goals' });
      }
      break;

    case 'POST':
      try {
        const newGoal = await prisma.goal.create({
          data: req.body,
        });
        res.status(201).json(newGoal);
      } catch (error) {
        console.error('Error creating goal:', error);
        res.status(500).json({ error: 'Failed to create goal' });
      }
      break;

    case 'PUT':
      try {
        const { id, ...updateData } = req.body;
        const updatedGoal = await prisma.goal.update({
          where: { id },
          data: updateData,
        });
        res.status(200).json(updatedGoal);
      } catch (error) {
        console.error('Error updating goal:', error);
        res.status(500).json({ error: 'Failed to update goal' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        await prisma.goal.delete({
          where: { id },
        });
        res.status(204).end();
      } catch (error) {
        console.error('Error deleting goal:', error);
        res.status(500).json({ error: 'Failed to delete goal' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
