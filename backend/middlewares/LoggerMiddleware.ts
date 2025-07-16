import { Request, Response, NextFunction } from "express";
import logger from "../utils/Logger";

export default function loggerMiddleware(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  logger.info(`Request Method: ${req.method}, URL: ${req.url}`);
  next();
}
