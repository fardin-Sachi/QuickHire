import express from 'express';
import { jobsRouter } from './jobs.route.js';
import { applicationRouter } from './application.route.js';
const router = express.Router();
router.use('/jobs', jobsRouter);
router.use('/applications', applicationRouter);
export { router as indexRouer };
