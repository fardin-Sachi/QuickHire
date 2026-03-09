import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../config/prisma.config.js";

const applicationSchema = z.object({
  jobId: z.coerce.number(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  resume_link: z.string().url("Resume link must be a valid URL"),
  cover_note: z.string().optional(),
});

export const createApplication = async (req: Request, res: Response) => {
  try {
    const data = applicationSchema.parse(req.body);

    const existing = await prisma.application.findFirst({
      where: {
        email: data.email,
        jobId: data.jobId,
      },
    });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "You already applied to this job",
      });
    }

    const application = await prisma.application.create({
      data,
    });

    return res.status(201).json({
      success: true,
      data: application,
    });
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        success: false,
        errors: err.errors,
      });
    }
    console.error("Error creating application:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get all applications
export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    if(page < 1 || limit < 1){
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive numbers",
      });
    }

    const skip = (page - 1) * limit;

    const [applications, total] = await Promise.all([
      prisma.application.findMany({
        skip,
        take: limit,
        orderBy: {
          id: "desc",
        },
        // include: {
        //   job: {
        //     select: {
        //       id: true,
        //       title: true,
        //       company: true
        //     }
        //   }
        // }
      }),
      prisma.application.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      data: applications,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get a single application by ID
export const getApplicationById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id))
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
    });

  try {
    const application = await prisma.application.findUnique({
      where: {
        id,
      },
      // include: {
      //   job: true
      // }
    });
    if (!application)
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (err) {
    console.error("Error fetching application:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get resume link by application ID
export const getResumeLinkByApplicationId = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }

  try {
    const application = await prisma.application.findUnique({
      where: { id },
      select: { resume_link: true, name: true },
    });

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (!application.resume_link) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Option 1: Redirect directly to resume link (simplest)
    return res.redirect(application.resume_link);

    /* Option 2 (Alternative): Return downloadable JSON link instead */
    // return res.status(200).json({
    //   success: true,
    //   downloadUrl: application.resume_link
    // });
  } catch (err) {
    console.error("Error fetching resume link:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
