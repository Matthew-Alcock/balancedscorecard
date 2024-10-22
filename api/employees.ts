import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const employees = await prisma.employee.findMany();
        res.status(200).json(employees);
      } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Failed to fetch employees' });
      }
      break;

    case 'POST':
      try {
        const newEmployee = await prisma.employee.create({
          data: req.body,
        });
        res.status(201).json(newEmployee);
      } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Failed to create employee' });
      }
      break;

    case 'PUT':
      try {
        const { id, ...updateData } = req.body;
        const updatedEmployee = await prisma.employee.update({
          where: { id },
          data: updateData,
        });
        res.status(200).json(updatedEmployee);
      } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Failed to update employee' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        await prisma.employee.delete({
          where: { id },
        });
        res.status(204).end();
      } catch (error) {
        console.error('Error deleting employee:', error);
        res.status(500).json({ error: 'Failed to delete employee' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
