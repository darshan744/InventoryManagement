import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import * as db from "../Database";
import { OrderType } from "../generated/prisma";
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

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) { }

export async function updateOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Implement logic to update an order
}

export async function deleteOrder(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Implement logic to delete an order
}
