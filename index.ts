import express, {Express, Request, Response, Application} from 'express';
import dotenv from 'dotenv';
import {prismaClient, redisClient} from "./config";
import RedisStore from "connect-redis";
import session from "express-session";
import {globalConfig} from "./config";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

redisClient.connect().then(() => console.log('Redis connected!')).catch(console.error)

const redisStore = new RedisStore({client: redisClient, prefix: 'sessions:'})

app.use(session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: globalConfig.REDIS_SECRET,
}));

prismaClient.$connect().then(() => console.log('Prisma connected!')).catch(console.error)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
