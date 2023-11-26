import { validateUserSession } from '../middleware/validateUserSession';
import { IRoute } from '../types/routes';

export const publicRoute = <T, R, U>({
  router,
  path,
  method,
  middlewares,
  controller,
}: IRoute<T, R, U>) => {
  router[method](path, ...middlewares, controller);
};

export const protectedRoute = <T, R, U>({
  router,
  path,
  method,
  middlewares,
  controller,
}: IRoute<T, R, U>) => {
  router[method](path, validateUserSession, ...middlewares, controller);
};
