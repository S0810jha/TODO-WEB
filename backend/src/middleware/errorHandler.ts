import { Request, Response, NextFunction } from 'express';
import { logError } from '../utils/logger';
import { AuthRequest } from './auth';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userId = (req as AuthRequest).user?.userId;
  const endpoint = req.path;
  const method = req.method;

  logError('error', err.message, err, userId, endpoint, method);

  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
};

