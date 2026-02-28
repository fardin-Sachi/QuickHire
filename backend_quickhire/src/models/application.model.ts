import { Schema, model } from "mongoose";
import { IApplication } from "../types/application.type.js";

const ApplicationSchema = new Schema<IApplication>({
    job_id: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    resume_link: {
        type: String,
        required: true
    },
    cover_note: {
        type: String
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export const Application = model<IApplication>("Application", ApplicationSchema);