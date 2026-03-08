import { Request, Response } from 'express'
import { z } from 'zod'
import { prisma } from '../config/prisma.config.js';

const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  category: z.array(z.string()).min(1, "Category is required"),
  description: z.string().min(1, "Description is required")
});

// Create a new job
export const createJob = async (req: Request, res: Response) => {
  try {
    const data = jobSchema.parse(req.body);

    const job = await prisma.job.create({
      data: {
        ...data,
        category: Array.isArray(data.category) ? data.category : [data.category]
      }
    });

    res.status(201).json({ 
      success: true, 
      data: job 
    });
  } catch (err: any){
    if(err.name === 'ZodError'){
      return res.status(400).json({ 
        success: false, 
        errors: err.errors 
      });
    }
    console.error('Error creating job:', err)
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

// Get all jobs
export const getAllJobs = async (_req: Request, res: Response) => {
  try {
    const jobs = await prisma.job.findMany({
      // include: { 
      //   applications: true 
      // }
    });
    res.status(200).json({ 
      success: true, 
      data: jobs 
    });
  } catch (err){
    console.error('Error fetching jobs:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

// Get a job by ID
export const getJobById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if(isNaN(id)) 
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid job ID' 
    });

  try {
    const job = await prisma.job.findUnique({
      where: { id },
      // include: { 
      //   applications: true 
      // }
    });
    if(!job) 
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    res.status(200).json({ 
      success: true, 
      data: job 
    });
  } catch (err){
    console.error('Error fetching job:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}

// Delete a job by ID
export const deleteJobById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if(isNaN(id)) 
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid job ID' 
    });

  try {
    const job = await prisma.job.delete({ 
      where: { id } 
    });
    res.status(200).json({ 
      success: true, 
      message: 'Job deleted', 
      data: job 
    });
  } catch (err: any){
    if(err.code === 'P2025'){
      return res.status(404).json({ 
        success: false, 
        message: 'Job not found' 
      });
    }
    console.error('Error deleting job:', err);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}