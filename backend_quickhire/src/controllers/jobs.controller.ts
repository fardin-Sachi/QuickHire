import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../config/prisma.config.js";
import { Prisma } from "@prisma/client";

const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  category: z.array(z.string()).min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
});

// Create a new job
export const createJob = async (req: Request, res: Response) => {
  try {
    const data = jobSchema.parse(req.body);

    const job = await prisma.job.create({
      data: {
        ...data,
        category: Array.isArray(data.category)
          ? data.category
          : [data.category],
      },
    });

    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        success: false,
        errors: err.errors,
      });
    }
    console.error("Error creating job:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all jobs
export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search?.toString().trim() || "";
    const locationFilter = req.query.location?.toString().trim() || "";

    if (page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive numbers",
      });
    }

    const skip = (page - 1) * limit;

    // Build conditions
    const andConditions: Prisma.JobWhereInput[] = [];

    if (search) {
      andConditions.push({
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
          { location: { contains: search, mode: "insensitive" } },
        ],
      });
    }

    if (locationFilter) {
      andConditions.push({
        location: { equals: locationFilter, mode: "insensitive" },
      });
    }

    // Final where clause
    const where: Prisma.JobWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: "desc" },
      }),
      prisma.job.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: jobs,
      pagination: { total, page, limit, totalPages },
    });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Get a job by ID
export const getJobById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json({
      success: false,
      message: "Invalid job ID",
    });

  try {
    const job = await prisma.job.findUnique({
      where: { id },
      // include: {
      //   applications: true
      // }
    });
    if (!job)
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (err) {
    console.error("Error fetching job:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export const getJobsByCategory = async (req: Request, res: Response) => {
  try {
    const categoryQuery = req.query.category?.toString().trim();

    if(!categoryQuery) {
      return res.status(400).json({
        success: false,
        message: "At least one category is required",
      });
    }

    // Split comma-separated string into array
    const categories = categoryQuery
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if(page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive numbers",
      });
    }

    const skip = (page - 1) * limit;

    const where: Prisma.JobWhereInput = {
      category: { hasSome: categories },
    };

    const [jobs, total] = await Promise.all([
      prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { id: "desc" },
      }),
      prisma.job.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: jobs,
      pagination: { total, page, limit, totalPages },
    });
  } catch (err) {
    console.error("Error fetching jobs by category:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

// Get available location for all the jobs
export const getAvailableLocations = async (req: Request, res: Response) => {
  try {
    const locations = await prisma.job.findMany({
      distinct: ["location"],
      select: { location: true },
    });
    const locationList = locations.map((l) => l.location);
    res.status(200).json({ success: true, data: locationList });
  } catch (err) {
    console.error("Error fetching locations:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Get all unique categories across jobs
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if(page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive numbers",
      });
    }

    const jobs = await prisma.job.findMany({
      select: { category: true },
    });

    // Flatten + unique
    const uniqueCategories = [
      ...new Set(jobs.flatMap((job) => job.category)),
    ];

    const total = uniqueCategories.length;
    const totalPages = Math.ceil(total / limit);

    const start = (page - 1) * limit;
    const paginatedCategories = uniqueCategories.slice(start, start + limit);

    res.status(200).json({
      success: true,
      data: paginatedCategories,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Delete a job by ID
export const deleteJobById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json({
      success: false,
      message: "Invalid job ID",
    });

  try {
    const job = await prisma.job.delete({
      where: { id },
    });
    res.status(204).json({
      success: true,
      message: "Job deleted",
      data: [],
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }
    console.error("Error deleting job:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}