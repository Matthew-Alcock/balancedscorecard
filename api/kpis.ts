import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const kpis = await prisma.kpi.findMany();
        res.status(200).json(kpis);
      } catch (error) {
        console.error('Error fetching KPIs:', error);
        res.status(500).json({ error: 'Failed to fetch KPIs' });
      }
      break;

    case 'POST':
      try {
        const newKpi = await prisma.kpi.create({
          data: req.body,
        });
        res.status(201).json(newKpi);
      } catch (error) {
        console.error('Error creating KPI:', error);
        res.status(500).json({ error: 'Failed to create KPI' });
      }
      break;

    case 'PUT':
      try {
        const { id, ...updateData } = req.body;
        const updatedKpi = await prisma.kpi.update({
          where: { id },
          data: updateData,
        });
        res.status(200).json(updatedKpi);
      } catch (error) {
        console.error('Error updating KPI:', error);
        res.status(500).json({ error: 'Failed to update KPI' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.body;
        await prisma.kpi.delete({
          where: { id },
        });
        res.status(204).end();
      } catch (error) {
        console.error('Error deleting KPI:', error);
        res.status(500).json({ error: 'Failed to delete KPI' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
