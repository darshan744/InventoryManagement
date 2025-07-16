import { NextFunction, Request, Response } from "express";
import Prisma from "../PrismaClient";
import { comparePassword } from "../utils/Hash";
import AppError from "../utils/AppError";
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  Prisma.user
    .findUnique({
      where: { email: email },
    })
    .then(async (user) => {
      if (!user) {
        next(new AppError("User not found", 404));
        return;
      }

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        next(new AppError("Invalid password", 401));
        return;
      }

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    })
    .catch((_error) => {
      next(new AppError("Database error", 500));
    });
};

export const logout = async (_req: Request, res: Response) => {
  // Implement logout logic here, e.g., clearing session or token
  res.status(200).json({
    message: "Logout successful",
  });
};
