import express from 'express';

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}

export interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

export interface TypedRequestParams<T> extends Express.Request {
  params: T;
}

export interface TypedRequestQuery<T> extends Express.Request {
  query: T;
}

export interface ErrorResponse {
  error: string;
  details?: string | string[];
}

export const enum RequestMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export type ControllerHandler = (
  req: express.Request,
  res: express.Response
) => void | Promise;

export type ControllerTypedHandler<T, R, U> = (
  req: TypedRequestBody<T>,
  res: express.Response<R>
) => Promise<U>;
