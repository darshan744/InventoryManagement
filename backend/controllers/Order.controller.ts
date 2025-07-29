import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import * as db from "../Database";
import getUser from "../utils/GetUser";
import { PaymentMethod } from "../generated/prisma";
import { AllProductResponse } from "../types/Types";

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
    console.log("Orders retrieved successfully:", orders);
    res.status(200).json({ message: "Orders retrieved", data: orders });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}

export async function orderProduct(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = getUser(req);
    const orders: Order = req.body;
    const newOrders = await db.orderProduct(
      orders.products,
      orders.paymentMethod,
      orders.price,
      userId,
    );
    res.status(201).json({
      message: "Order placed successfully",
      data: newOrders,
    });
    console.log("Order placed successfully:", newOrders);
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}

export async function storeCart(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError("User ID is required", 400);
    }
  } catch (err: any) {
    next(err instanceof AppError ? err : new AppError(err.message, 500));
  }
}

type Order = {
  products: AllProductResponse[];
  paymentMethod: PaymentMethod;
  price: number;
};

export async function getRequestedOrders(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = getUser(req);

    const requestedOrders = await db.requestedOrders(userId);
    res.json({
      message: "Requested orders retrieved successfully",
      data: requestedOrders,
    });
  } catch (err: any) {
    next(err instanceof AppError ? err : new AppError(err.message, 500));
  }
}

export async function modifyStatusOfOrderItem(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const orderItemId = req.params.id;
    const { status } = req.body;
    if (!orderItemId || !status) {
      throw new AppError("Order item ID and status are required", 400);
    }

    if (status !== "COMPLETED" && status !== "CANCELLED") {
      throw new AppError(
        "Invalid status. Must be 'ACCEPTED' or 'CANCELLED'",
        400,
      );
    }
    const updates = await db.updateOrderItemStatus(orderItemId, status);

    res.json({
      message: "Order item status updated successfully",
      data: updates,
    });
  } catch (err: any) {
    next(err instanceof AppError ? err : new AppError(err.message, 500));
  }
}
