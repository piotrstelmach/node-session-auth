import { Response, NextFunction } from 'express';
import { ErrorResponse, TypedRequestBody } from '../types/global';
import { UserRegisterInput } from '../schema/validation/user.schema';
import { findUser } from '../services/user/findUser';
import { User } from '@prisma/client';

type CheckUserExistsMiddleware = (
  req: TypedRequestBody<UserRegisterInput>,
  res: Response<ErrorResponse>,
  next: NextFunction
) => Promise<void>;

export const checkUserExists: CheckUserExistsMiddleware = async (
  req: TypedRequestBody<UserRegisterInput>,
  res: Response<ErrorResponse>,
  next: NextFunction
): Promise<void> => {
  try {
    const user: User | null = await findUser(req.body.email);
    if (user) {
      res.status(409).json({ error: 'User already exists' });
    }
    next();
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
