import express, { Router } from 'express';
import { DashboardController } from '../controllers/dashboard';
import { protectedRoute } from '../utils/routes';
import { RequestMethods } from '../types/global';

const dashboardController: DashboardController = new DashboardController();
const router: Router = express.Router();

protectedRoute({
  router: router,
  path: '/',
  method: RequestMethods.GET,
  middlewares: [],
  controller: dashboardController.index,
});

export { router as dashboardRouter };
