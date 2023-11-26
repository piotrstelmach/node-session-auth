import {
  ControllerHandler,
  ControllerTypedHandler,
  ErrorResponse,
  TypedRequestBody,
} from '../types/global';
import {
  UserLoginInput,
  UserRegisterInput,
} from '../schema/validation/user.schema';
import { Response, Request } from 'express';
import { User } from '@prisma/client';
import { createUser } from '../services/user/createUser';
import { CreateUserError } from '../errors/auth';
import { findUser } from '../services/user/findUser';
import { decryptPassword } from '../utils/password';
import { clearSession, createSession } from '../services/user/session';

interface UserCreateResponse {
  id: number;
  name: string;
  email: string;
}

interface UserLoginResponse {
  id: number;
}

export class AuthController {
  register: ControllerTypedHandler<
    UserRegisterInput,
    UserCreateResponse | ErrorResponse,
    void
  > = async (
    req: TypedRequestBody<UserRegisterInput>,
    res: Response<UserCreateResponse | ErrorResponse>
  ): Promise<void> => {
    try {
      const newUser: User = await createUser(req.body);
      const { sessionId } = await createSession(newUser.id);

      res.cookie('sessionID', sessionId, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000),
      });

      res.cookie('userId', newUser.id);

      res.status(200).send({
        id: newUser.id,
        name: newUser.name ?? '',
        email: newUser.email,
      });
      return;
    } catch (e) {
      if (e instanceof CreateUserError) {
        res.status(400).send({ error: e.message });
        return;
      }
    }
  };

  login: ControllerTypedHandler<
    UserLoginInput,
    UserLoginResponse | ErrorResponse,
    void
  > = async (
    req: TypedRequestBody<UserLoginInput>,
    res: Response<UserLoginResponse | ErrorResponse>
  ): Promise<void> => {
    const { email, password } = req.body;

    try {
      const user: User | null = await findUser(email);
      if (!user) {
        res.status(404).json({
          error: 'User not found',
        });
        return;
      }
      const passwordDecrypt = await decryptPassword(user.password, password);
      if (passwordDecrypt) {
        const { sessionId } = await createSession(user.id);
        res.cookie('sessionID', sessionId, {
          httpOnly: true,
          expires: new Date(Date.now() + 60 * 60 * 1000),
          secure: false,
        });
        res.cookie('userId', user.id);
        res.redirect('/');
        return;
      }
    } catch (error) {
      res.status(500).json({
        error: 'Internal server error',
      });
      return;
    }
  };

  logout: ControllerHandler = async (req: Request, res: Response) => {
    const userID = req.cookies.userId;
    res.clearCookie('sessionID');
    res.clearCookie('userId');
    await clearSession(userID);

    res.redirect('/');
    return;
  };
}
