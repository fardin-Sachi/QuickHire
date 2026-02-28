import { Document, Types } from "mongoose";

// Interface for MongoDB document
export interface IApplication extends Document {
  _id: Types.ObjectId;
  job_id: Types.ObjectId;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
  created_at: Date;
  updated_at?: Date;
};

export type ApplicationResponse = Omit<IApplication, "_id" | "__v"> & { id: string };