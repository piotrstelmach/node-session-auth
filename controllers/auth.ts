import { ErrorResponse, TypedRequestBody } from '../types/global';
import {
  UserLoginInput,
  UserRegisterInput,
} from '../schema/validation/user.schema';
import { Response } from 'express';
import { User } from '@prisma/client';
import { createUser } from '../services/user/createUser';
import { CreateUserError } from '../errors/auth';
import { findUser } from '../services/user/findUser';
import { decryptPassword } from '../utils/password';

interface UserCreateResponse {
  id: number;
  name: string;
  email: string;
}

interface UserLoginResponse {
  id: number;
}

export class AuthController {
  async register(
    req: TypedRequestBody<UserRegisterInput>,
    res: Response<UserCreateResponse | ErrorResponse>
  ): Promise<void> {
    let newUser: User;
    try {
      newUser = await createUser(req.body);
      res.status(200).send({
        id: newUser.id,
        name: newUser.name ?? '',
        email: newUser.email,
      });
    } catch (e) {
      if (e instanceof CreateUserError) {
        res.status(400).send({ error: e.message });
      }
    }
  }

  async login(
    req: TypedRequestBody<UserLoginInput>,
    res: Response<UserLoginResponse | ErrorResponse>
  ) {
    const { email, password } = req.body;

    try {
      const user = await findUser(email);
      if (!user) {
        return res.status(404).json({
          error: 'User not found',
        });
      }
      const passwordDecrypt = await decryptPassword(user.password, password);
      if (passwordDecrypt) {
        return res.status(200).json({
          id: user.id,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'Internal server error',
      });
    }
  }
}
