import express, { Router } from 'express';
import { AuthController } from '../controllers/auth';
import { validate } from '../middleware/validate';
import {
  UserLoginInput,
  userLoginInputSchema,
  UserRegisterInput,
  userRegisterInputSchema,
} from '../schema/validation/user.schema';
import { checkUserExists } from '../middleware/checkUserExists';

const authController: AuthController = new AuthController();
const router: Router = express.Router();

router.post(
  '/register',
  validate<UserRegisterInput>(userRegisterInputSchema),
  checkUserExists,
  authController.register
);

router.post(
  '/login',
  validate<UserLoginInput>(userLoginInputSchema),
  authController.login
);

export { router as authRouter };
