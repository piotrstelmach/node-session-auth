import {
  ControllerHandler,
  ControllerTypedHandler,
  RequestMethods,
} from './global';
import { Router, RequestHandler } from 'express';

export interface IRoute<T, R, U> {
  router: Router;
  path: string;
  method: RequestMethods;
  middlewares: Array<RequestHandler>;
  controller: ControllerTypedHandler<T, R, U> | ControllerHandler;
}
