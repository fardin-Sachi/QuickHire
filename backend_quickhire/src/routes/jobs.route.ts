import express, { Router, Request, Response } from 'express';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {});

router.get('/:id', (req: Request, res: Response) => {});

router.post('/', (req: Request, res: Response) => {});

router.delete('/:id', (req: Request, res: Response) => {});


export {router as jobsRouter};