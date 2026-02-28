import mongoose, { Schema, model, Types } from 'mongoose';
import {IJob} from '../types/job.type.js';


const JobSchema = new Schema<IJob>({
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  }, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

export const Job = model<IJob>("Job", JobSchema);