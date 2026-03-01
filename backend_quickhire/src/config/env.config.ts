import dotenv from 'dotenv';
import {z} from 'zod';
import fs from 'fs';
import path from 'path';

const NODE_ENV = process.env.NODE_ENV || "development";

const envFilePath = path.resolve(process.cwd(), `.env.${NODE_ENV === "production" ? "prod" : "dev"}`);
if (!fs.existsSync(envFilePath)) {
  throw new Error(`Environment file not found: ${envFilePath}`);
}

dotenv.config({ 
    path: envFilePath
});

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default(() => {
    return process.env.NODE_ENV === "production" ? "production" : "development";
  }),
  PORT: z
    .string()
    .transform(Number)
    .refine((val) => val > 0 && val < 65536, {
      message: "PORT must be a number between 1 and 65535",
    }),
  DATABASE_URL: z.string().min(1, "MONGO_URI is required"),
//   JWT_SECRET: z.string().min(1, "JWT_SECRET is required"),
});

const parsedEnv = envSchema.safeParse(process.env);
if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

const ENV = Object.freeze({
  NODE_ENV: parsedEnv.data.NODE_ENV,
  PORT: parsedEnv.data.PORT,
  DATABASE_URL: parsedEnv.data.DATABASE_URL,
//   JWT_SECRET: parsedEnv.data.JWT_SECRET,
});


export default ENV;