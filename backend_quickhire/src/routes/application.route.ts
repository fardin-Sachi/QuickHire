import express, { Router, Request, Response } from 'express';
import { 
    createApplication, 
    getAllApplications, 
    getApplicationById,
    getResumeLinkByApplicationId
} from '../controllers/application.controller.js';

const router: Router = express.Router();

router.post('/', createApplication);

router.get('/', getAllApplications);

router.get('/resume/:id', getResumeLinkByApplicationId);

router.get('/:id', getApplicationById);


export {router as applicationRouter};