import { NextFunction, Request, Response } from "express";
import { comparePassword } from "../utils/Hash";
import AppError from "../utils/AppError";
import { getUserByEmail, createUser } from "../Database";
import { signToken, verifyToken } from "../utils/Token";

// TODO : Implement using Redis or any other storage mechanism
let refreshTokens = new Array<string>();
/**
 * @description Handles user login by verifying credentials and returning a JWT token.
 * @Route POST /api/auth/login
 * */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError("Email and password are required", 400);
    }

    const user = await getUserByEmail(email);

    // Check if user exists
    if (!user) {
      throw new AppError("User not found", 404);
    }
    // Check if password is correct
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid password", 401);
    }
    const accessToken = signToken(
      { email, id: user.id },
      {
        expiresIn: "30s", // 1 hour
      },
    );

    const refreshToken = signToken(
      { email, id: user.id },
      { expiresIn: "7d" }, // 7 days
      "refresh",
    );
    refreshTokens.push(refreshToken); // Store the refresh token in memory (or use a database)
    // Respond with success
    res
      .status(200)
      .cookie("token", accessToken, {
        expires: new Date(Date.now() + 3600000), // 1 hour
        httpOnly: true, // Prevents client-side access to the cookie
      })
      .cookie("refreshToken", refreshToken, {
        expires: new Date(Date.now() + 604800000), // 7 days
        httpOnly: true, // Prevents client-side access to the cookie
      })
      .json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
        },
      });
  } catch (error: any) {
    const er =
      error instanceof AppError
        ? error
        : new AppError("Internal server error", 500);
    next(er);
  }
};
/**
 * @description Handles user registration by creating a new user and returning a success message.
 * @Route POST /api/auth/signup
 * */
export async function signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    let { email, password, name, role } = req.body;
    if (!email || !password || !name) {
      throw new AppError("Email, password and name are required", 400);
    }
    if (await getUserByEmail(email)) {
      throw new AppError("User already exists", 409);
    }
    if (!role) {
      role = "STAFF"; // Default role if not provided
    }
    const newUser = await createUser(email, password, name, role);
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
      },
    });
  } catch (error) {
    next(
      error instanceof AppError
        ? error
        : new AppError("Internal server Error", 500),
    );
  }
}
/**
 * @description Handles user logout by clearing the authentication cookie.
 * @Route POST /api/auth/logout
 * */
export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refToken = req.cookies.refreshToken;
    if (!refToken) {
      throw new AppError("No refresh token found", 401);
    }
    refreshTokens = refreshTokens.filter((token) => token !== refToken);
    res
      .status(200)
      .clearCookie("token", { httpOnly: true })
      .clearCookie("refreshToken", { httpOnly: true })
      .json({ message: "Logout Successfull" });
  } catch (error: any) {
    next(new AppError(error.message, 500));
  }
};
/*
 * @description Handles user refresh token by verifying the refresh token and generating a new access token.
 * @Route POST /api/auth/refresh-token
 * */
export function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      throw new AppError("Refresh token is missing", 401);
    }
    if (!refreshTokens.includes(token)) {
      throw new AppError("Invalid refresh token", 401);
    }
    // Verify the refresh token and generate a new access token
    const payload: any = verifyToken(token);
    const newAccessToken = signToken({ email: payload.email, id: payload.id });
    res
      .status(200)
      .cookie("token", newAccessToken, {
        expires: new Date(Date.now() + 3600000), // 1 hour
        httpOnly: true, // Prevents client-side access to the cookie
      })
      .json({ message: "Token refreshed successfully" });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}
