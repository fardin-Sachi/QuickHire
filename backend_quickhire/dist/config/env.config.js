import dotenv from "dotenv";
import { z } from "zod";
import fs from "fs";
import path from "path";
const NODE_ENV = process.env.NODE_ENV || "development";
if (NODE_ENV !== "production") {
    const envFilePath = path.resolve(process.cwd(), ".env.dev");
    if (fs.existsSync(envFilePath)) {
        dotenv.config({ path: envFilePath });
    }
    else {
        console.warn(".env.dev not found, using system environment variables");
    }
}
else {
    dotenv.config();
}
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    PORT: z
        .string()
        .transform(Number)
        .refine((val) => val > 0 && val < 65536, {
        message: "PORT must be between 1 and 65535",
    }),
    DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
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
});
export default ENV;
