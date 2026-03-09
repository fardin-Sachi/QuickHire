import express from 'express';
import { getAllJobs, getJobById, createJob, deleteJobById, getAvailableLocations } from '../controllers/jobs.controller.js';
const router = express.Router();
router.get('/', getAllJobs);
router.get('/location-available', getAvailableLocations);
router.get('/:id', getJobById);
router.post('/', createJob);
router.delete('/:id', deleteJobById);
export { router as jobsRouter };
