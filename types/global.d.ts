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
