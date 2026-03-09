import express, {Request, Response} from "express";
import { indexRouer } from "./routes/index.route.js";
import {startServer} from './lib/startServer.js'
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(express.json());

//health check
app.get('/health',(req: Request, res: Response) => {
    res.send("Hey!");
});

app.use('/api', indexRouer);




startServer();