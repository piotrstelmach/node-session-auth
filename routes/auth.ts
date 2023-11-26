import express, { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { validateRequestBody } from '../middleware/validateRequestBody';
import {
  UserLoginInput,
  userLoginInputSchema,
  UserRegisterInput,
  userRegisterInputSchema,
} from '../schema/validation/user.schema';
import { checkUserExists } from '../middleware/checkUserExists';
import { publicRoute } from '../utils/routes';
import { RequestMethods } from '../types/global';

const authController: AuthController = new AuthController();
const router: Router = express.Router();

publicRoute({
  router: router,
  path: '/register',
  method: RequestMethods.POST,
  middlewares: [
    validateRequestBody<UserRegisterInput>(userRegisterInputSchema),
    checkUserExists,
  ],
  controller: authController.register,
});

publicRoute({
  router: router,
  path: '/login',
  method: RequestMethods.POST,
  middlewares: [validateRequestBody<UserLoginInput>(userLoginInputSchema)],
  controller: authController.login,
});

publicRoute({
  router: router,
  path: '/logout',
  method: RequestMethods.POST,
  middlewares: [],
  controller: authController.logout,
});

export { router as authRouter };
