import { Request, Response, NextFunction } from 'express';
import { checkSession } from '../services/user/session';

export const validateUserSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sessionID = req.cookies.sessionID;
  const userID = req.cookies.userId;

  if (!sessionID || !userID) {
    res.redirect('/');
    return;
  }

  if (!(await checkSession(userID, sessionID))) {
    res.redirect('/');
    return;
  }
  next();
};
