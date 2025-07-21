import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import * as db from "../Database";
export async function getOrders(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Implement logic to fetch orders
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError("UserId is required", 400);
    }
    const orders = await db.getOrders(userId);
    if (!orders || orders.length === 0) {
      throw new AppError("No orders found", 404);
    }
    res.status(200).json({ message: "Orders retrieved", data: orders });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
    1;
  }
}

export async function orderProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      throw new AppError("Product ID and quantity are required", 400);
    }
    if (quantity <= 0) {
      throw new AppError("Quantity must be greater than zero", 400);
    }
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError("User ID is required", 400);
    }
    const order = await db.orderProduct(productId, quantity, userId);
    res.status(201).json({
      message: "Order placed Successfully",
      data: order,
    });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}
export async function orderMultipleProducts(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { orders } = req.body;
    if (!orders || !Array.isArray(orders) || orders.length === 0) {
      throw new AppError("Orders array is required and cannot be empty", 400);
    }
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError("User ID is required", 400);
    }
    const createdOrders = [] as any;
    for await (const order of orders) {
      const { productId, quantity } = order;
      if (!productId || !quantity) {
        throw new AppError(
          "Product ID and quantity are required for each order",
          400,
        );
      }
      if (quantity <= 0) {
        throw new AppError("Quantity must be greater than zero", 400);
      }
      createdOrders.push(await db.orderProduct(productId, quantity, userId));
    }
    res.status(201).json({
      message: "Orders placed successfully",
      data: createdOrders,
    });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}
