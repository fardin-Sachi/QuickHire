import express, {Request, Response} from "express";
import { indexRouer } from "./routes/index.route.js";
import {startServer} from './lib/startServer.js'

export const app = express();

app.use(express.json());

//health check
app.get('/health',(req: Request, res: Response) => {
    res.send("Hey!");
});

app.use('/api', indexRouer);




startServer();