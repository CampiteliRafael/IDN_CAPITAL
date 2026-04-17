import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import {
  DomainError,
  UserAlreadyExistsError,
  UserNotFoundError,
  InvalidCredentialsError,
  InvalidTokenError,
} from '../../domain/errors/index.js';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', error);

  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: {
        message: 'Validation error',
        code: 'VALIDATION_ERROR',
        details: error.issues.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      },
    });
    return;
  }

  if (error instanceof UserAlreadyExistsError) {
    res.status(409).json({
      success: false,
      error: {
        message: error.message,
        code: 'USER_ALREADY_EXISTS',
      },
    });
    return;
  }

  if (error instanceof UserNotFoundError || error instanceof InvalidCredentialsError) {
    res.status(401).json({
      success: false,
      error: {
        message: error.message,
        code: 'INVALID_CREDENTIALS',
      },
    });
    return;
  }

  if (error instanceof InvalidTokenError) {
    res.status(401).json({
      success: false,
      error: {
        message: error.message,
        code: 'INVALID_TOKEN',
      },
    });
    return;
  }

  if (error instanceof DomainError) {
    res.status(400).json({
      success: false,
      error: {
        message: error.message,
        code: 'DOMAIN_ERROR',
      },
    });
    return;
  }

  res.status(500).json({
    success: false,
    error: {
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR',
    },
  });
};
