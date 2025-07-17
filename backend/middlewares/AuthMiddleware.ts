import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import environtments from "../environtments";
import AppError from "../utils/AppError";
/**
 * @description Middleware to authenticate user requests using JWT.
 * It checks for the presence of a token in cookies and verifies it.
 * If the token is valid, it attaches the user information to the request object.
 * If the token is missing or invalid, it throws an error.
 */
export default function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  // Verfication of token
  try {
    // Simulate authentication check
    const token = req.cookies.token;
    if (!token) {
      throw new AppError("Authentication token is missing", 401);
    }
    const payload = jwt.verify(token, environtments.jwtKey as string);
    req.user = JSON.parse(JSON.stringify(payload));
    next();
  } catch (error: any) {
    next(
      error instanceof AppError
        ? error
        : new AppError(error.message, 401),
    );
  }
}
