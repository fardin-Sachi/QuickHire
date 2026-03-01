import express, { Router, Request, Response } from 'express';
import { getAllJobs, getJobById, createJob, deleteJobById } from '../controllers/jobs.controller.js';

const router: Router = express.Router();

router.get('/', getAllJobs);

router.get('/:id', getJobById);

router.post('/', createJob);

router.delete('/:id', deleteJobById);


export {router as jobsRouter};