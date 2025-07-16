import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { comparePassword } from "../utils/Hash";
import AppError from "../utils/AppError";
import { getUserByEmail } from "../Database";
import environtments from "../environtments";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new AppError("Email and password are required", 400));
    return;
  }
  getUserByEmail(email)
    .then(async (user) => {
      // Check if user exists
      if (!user) {
        next(new AppError("User not found", 404));
        return;
      }
      // Check if password is correct
      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) {
        next(new AppError("Invalid password", 401));
        return;
      }

      const encryptedToken = jwt.sign(email, environtments.jwtKey as string, {
        expiresIn: "1h",
      });
      // Respond with success
      res
        .status(200)
        .cookie("token", encryptedToken, {
          expires: new Date(Date.now() + 3600000), // 1 hour
        })
        .json({
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
  res.status(200).json({
    message: "Logout successful",
  });
};
