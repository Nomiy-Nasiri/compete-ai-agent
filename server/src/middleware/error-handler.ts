import type { ErrorRequestHandler, NextFunction, Request, Response } from "express";

import { env } from "../config/env.js";

export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.statusCode = statusCode;
  }
}

export function notFoundHandler(_req: Request, _res: Response, next: NextFunction) {
  next(new HttpError(404, "Resource not found."));
}

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const statusCode = error instanceof HttpError ? error.statusCode : 500;
  const message =
    env.NODE_ENV === "production" && statusCode === 500
      ? "Internal server error."
      : error instanceof Error
        ? error.message
        : "Unknown error.";

  res.status(statusCode).json({
    success: false,
    error: message,
  });
};
