import { ZodError, ZodIssue, ZodSchema } from 'zod';
import { NextFunction, Response } from 'express';
import { ErrorResponse, TypedRequestBody } from '../types/global';

type validateFunction = <T>(
  schema: ZodSchema
) => (
  req: TypedRequestBody<T>,
  res: Response<ErrorResponse>,
  next: NextFunction
) => Promise<void>;

export const validate: validateFunction =
  <T>(schema: ZodSchema) =>
  async (
    req: TypedRequestBody<T>,
    res: Response<ErrorResponse>,
    next: NextFunction
  ): Promise<void> => {
    try {
      await schema.parseAsync({
        ...req.body,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: 'Validation error',
          details: error.errors.map((err: ZodIssue) => err.message).join(),
        });
      } else {
        res.status(400).json({ error: 'Internal server error' });
      }
    }
  };
