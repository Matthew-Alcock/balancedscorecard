import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // Fetch goals (company, division, or employee level based on query params)
      const goals = await prisma.goal.findMany({
        where: {
          // Add filters based on req.query
        },
        include: {
          objectives: true,
        },
      })
      res.status(200).json(goals)
      break
    case 'POST':
      // Create a new goal
      const newGoal = await prisma.goal.create({
        data: req.body,
      })
      res.status(201).json(newGoal)
      break
    // Implement PUT and DELETE methods as well
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}