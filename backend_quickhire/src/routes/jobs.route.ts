import express, { Router, Request, Response } from 'express';
import { 
    getAllJobs, 
    getJobById, 
    createJob, 
    deleteJobById, 
    getAvailableLocations,
    getAllCategories,
    getJobsByCategory
} from '../controllers/jobs.controller.js';

const router: Router = express.Router();

router.get('/', getAllJobs);

router.get('/location-available', getAvailableLocations);

router.get('/categories', getAllCategories);

router.get('/categories/:category', getJobsByCategory);

router.get('/:id', getJobById);

router.post('/', createJob);

router.delete('/:id', deleteJobById);


export {router as jobsRouter};