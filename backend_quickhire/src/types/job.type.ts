import { Document, Schema, Types } from "mongoose";

export interface IJob extends Document {
    _id: Types.ObjectId;
    title: string;
    company: string;
    location: string;
    category: string;
    description: string;
    created_at: Schema.Types.Date;
    updated_at?: Date;
};

export type JobResponse = Omit<IJob, "_id" | "__v"> & { id: string };