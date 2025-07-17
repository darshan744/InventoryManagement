import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import * as db from "../Database";
import { Product } from "../generated/prisma";

export async function getUserProducts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id; // Assuming user ID is stored in req.user
    if (!userId) {
      throw new AppError("User ID is required", 400);
    }
    const products = await db.getProducts(userId);

    if (!products || products.length === 0) {
      throw new AppError("No products found for this user", 404);
    }
    res.status(200).json({
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}
export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { name, quantity, threshold, unit, category }: Product = req.body;
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError("User ID is required", 400);
    }

    if (!name || !quantity || !threshold || !unit || !category) {
      throw new AppError("All product fields are required", 400);
    }
    const product = await db.createProduct(
      name,
      quantity,
      threshold,
      unit,
      category,
      userId,
    );
    res.status(201).json({ message: "Products Retrieved", data: product });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}
