/**
 * Error handler middleware
 * Centralized error handling for Express
 */

import { Request, Response, NextFunction } from 'express'

export interface AppError extends Error {
  statusCode?: number
  isOperational?: boolean
}

/**
 * Global error handler
 */
export function errorHandler(
  error: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const statusCode = error instanceof Error && 'statusCode' in error ? error.statusCode || 500 : 500
  const message = error.message || 'Internal Server Error'

  console.error(`[${new Date().toISOString()}] ${statusCode} - ${message}`)

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  })
}

/**
 * Create a custom error
 */
export function createError(
  statusCode: number,
  message: string,
  isOperational = true
): AppError {
  const error = new Error(message) as AppError
  error.statusCode = statusCode
  error.isOperational = isOperational
  return error
}
