import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError";
import * as db from "../Database";
import logger from "../utils/Logger";
import { Product } from "../generated/prisma";

export function getUserProducts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id; // Assuming user ID is stored in req.user
    if (!userId) {
      next(new AppError("User ID is required", 400));
      return;
    }
    db.getProducts(userId)
      .then((products) => {
        if (!products || products.length === 0) {
          next(new AppError("No products found for this user", 404));
          return;
        }
        res.status(200).json({
          message: "Products retrieved successfully",
          data: products,
        });
      })
      .catch((error) => {
        logger.error("Error retrieving products:", error);
        next(new AppError("Database error while retrieving products", 500));
      });
  } catch (error: any) {
    next(new AppError(error.message, 500));
  }
}

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { name, quantity, threshold, unit, category }: Product = req.body;
  const userId = req.user?.id;
  if (!userId) {
    next(new AppError("User ID is required", 400));
    return;
  }

  if (!name || !quantity || !threshold || !unit || !category) {
    next(new AppError("All product fields are required", 400));
    return;
  }
  try {
    const product = await db.createProduct(
      name,
      quantity,
      threshold,
      unit,
      category,
      userId,
    );
    res.status(201).json({ data: product });
  } catch (error: any) {
    next(new AppError(error.message, 500));
  }
}
