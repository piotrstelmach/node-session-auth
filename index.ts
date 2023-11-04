import express, {Express, Request, Response, Application} from 'express';
import dotenv from 'dotenv';
import {redisClient} from "./config";
import RedisStore from "connect-redis";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

redisClient.connect().then(() => console.log('Redis connected!')).catch(console.error)
app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
