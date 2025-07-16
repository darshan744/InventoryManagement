import { Request, Response, NextFunction } from "express";
import logger from "../utils/Logger";

export default function loggerMiddleware(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  logger.info({
    method: req.method,
    url: req.originalUrl,
  });
  next();
}
