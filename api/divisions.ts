import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const divisions = await prisma.division.findMany();
        res.status(200).json(divisions);
      } catch (error) {
        console.error('Error fetching divisions:', error);
        res.status(500).json({ error: 'Failed to fetch divisions' });
      }
      break;

    case 'POST':
      try {
        const newDivision = await prisma.division.create({
          data: req.body,
        });
        res.status(201).json(newDivision);
      } catch (error) {
        console.error('Error creating division:', error);
        res.status(500).json({ error: 'Failed to create division' });
      }
      break;

    case 'PUT':
      try {
        const { id, ...updateData } = req.body;
        const updatedDivision = await prisma.division.update({
          where: { id },
          data: updateData,
        });
        res.status(200).json(updatedDivision);
      } catch (error) {
        console.error('Error updating division:', error);
        res.status(500).json({ error: 'Failed to update division' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        await prisma.division.delete({
          where: { id },
        });
        res.status(204).end();
      } catch (error) {
        console.error('Error deleting division:', error);
        res.status(500).json({ error: 'Failed to delete division' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
