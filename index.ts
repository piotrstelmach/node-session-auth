import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { prismaClient, redisClient } from './config';
import { authRouter } from './routes/auth';
import cookieParser from 'cookie-parser';
import { dashboardRouter } from './routes/dashboard';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

redisClient
  .connect()
  .then(() => console.log('Redis connected!'))
  .catch(console.error);

prismaClient
  .$connect()
  .then(() => console.log('Prisma connected!'))
  .catch(console.error);

app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
