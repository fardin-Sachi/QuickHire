import { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../config/prisma.config.js'

const applicationSchema = z.object({
  jobId: z.number(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  resume_link: z.string().url("Resume link must be a valid URL"),
  cover_note: z.string().optional()
})

export const createApplication = async (req: Request, res: Response) => {
  try {
    const data = applicationSchema.parse(req.body)

    const application = await prisma.application.create({
      data
    })

    return res.status(201).json({ success: true, data: application })
  } catch (err: any){
    if(err.name === 'ZodError'){
      return res.status(400).json({ success: false, errors: err.errors })
    }
    console.error('Error creating application:', err)
    return res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

// Get all applications
export const getAllApplications = async (_req: Request, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      include: { job: true }
    })
    res.status(200).json({ success: true, data: applications })
  } catch (err){
    console.error('Error fetching applications:', err)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

// Get a single application by ID
export const getApplicationById = async (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if(isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid ID' })

  try {
    const application = await prisma.application.findUnique({
      where: { id },
      include: { job: true }
    })
    if(!application) return res.status(404).json({ success: false, message: 'Application not found' })
    res.status(200).json({ success: true, data: application })
  } catch (err){
    console.error('Error fetching application:', err)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}