import { ControllerHandler } from '../types/global';
import { Request, Response } from 'express';

export class DashboardController {
  index: ControllerHandler = (req: Request, res: Response) => {
    res.send('Welcome to protected Dashboard');
    return;
  };
}
