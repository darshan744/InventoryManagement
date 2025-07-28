import { Product, UnitType } from "./generated/prisma";
import Prisma from "./PrismaClient";
import { hashPassword } from "./utils/Hash";
import { PaymentMethod } from "./generated/prisma/index";
import { AllProductResponse } from "./types/Types";
export const getUserByEmail = async (email: string) => {
  return await Prisma.user.findUnique({
    where: { email: email },
  });
};

export const createUser = async (
  email: string,
  password: string,
  name: string,
  role: "ADMIN" | "STAFF" = "STAFF",
) => {
  return await Prisma.user.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
      role,
    },
  });
};
export async function getAllProducts(
  userId: string,
): Promise<AllProductResponse[]> {
  return await Prisma.product.findMany({
    where: {
      quantity: { gt: 0 },
      userId: { not: userId },
    },
    include: {
      user: {
        select: {
          name: true,
          id: true,
        },
      },
    },
    omit: {
      userId: true,
    },
  });
}
export async function getProductsForUser(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const product = await Prisma.product.findMany({
    where: { userId },
  });

  return product;
}
export async function createProduct(
  name: string,
  quantity: number,
  threshold: number,
  unit: UnitType,
  category: string,
  image: string | null,
  userId: string,
  description: string,
  price: number,
) {
  return await Prisma.product.create({
    data: {
      name,
      quantity,
      threshold,
      unit,
      category,
      userId,
      image,
      description,
      price,
    },
  });
}

export async function updateProduct(productId: string, product: Product) {
  if (!productId) {
    throw new Error("Product ID is required");
  }
  return await Prisma.product.update({
    where: { id: productId },
    data: product,
  });
}

export async function deleteProduct(productId: string) {
  if (!productId) {
    throw new Error("Product ID is required");
  }
  return await Prisma.product.delete({
    where: { id: productId },
  });
}

export async function getOrders(userId: string) {
  return await Prisma.order.findMany({
    where: {
      buyerId: userId,
    },
    include: {
      OrderItem: {
        select: {
          quantity: true,
          productPrice: true,
          status: true,
          product: {
            select: {
              name: true,
              image: true,
              description: true,
            },
          },
        },
      },
    },
  });
}

export async function orderProduct(
  products: AllProductResponse[],
  paymentMethod: PaymentMethod,
  totalPrice: number,
  userId: string,
) {
  return Prisma.$transaction(async (tx) => {
    for (const product of products) {
      const productData = await tx.product.findFirst({
        where: { id: product.id },
      });
      if (!productData) {
        throw new Error(`Product with ID ${product.id} not found`);
      }

      if (productData.quantity < product.quantity) {
        throw new Error(
          `Insufficient stock for product ${product.name}. Available: ${productData.quantity}, Requested: ${product.quantity}`,
        );
      }

      await tx.product.update({
        where: { id: product.id },
        data: {
          quantity: {
            decrement: product.quantity,
          },
        },
      });
    }
    return await Prisma.order.create({
      data: {
        OrderItem: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
              productPrice: product.price,
              sellerId: product.user.id,
            })),
          },
        },
        paymentMethod,
        price: totalPrice,
        buyerId: userId,
      },
    });
  });
}

export async function requestedOrders(sellerId: string) {
  return await Prisma.orderItem.findMany({
    where: {
      sellerId,
    },
    include: {
      product: {
        select: {
          description: true,
          name: true,
          image: true,
        },
      },
    },
  });
}

export async function updateOrderItemStatus(
  orderItemId: string,
  status: "COMPLETED" | "CANCELLED",
) {
  return Prisma.$transaction(async (tx) => {
    const orderItem = await tx.orderItem.findUnique({
      where: { id: orderItemId },
      include: {
        product: true,
      },
    });
    if (!orderItem) {
      throw new Error(`Order item with ID ${orderItemId} not found`);
    }
    const order = await tx.order.findUnique({
      where: { id: orderItem.orderId },
    });
    if (!order) {
      throw new Error(`Order with ID ${orderItem.orderId} not found`);
    }
    if (orderItem.status === "COMPLETED" || orderItem.status === "CANCELLED") {
      throw new Error(
        `Order item with ID ${orderItemId} is already ${orderItem.status}`,
      );
    }
    if (orderItem.product.quantity < orderItem.quantity) {
      throw new Error(
        `Insufficient stock for product ${orderItem.product.name}. Available: ${orderItem.product.quantity}, Requested: ${orderItem.quantity}`,
      );
    }
    const select = { id: true, status: true };
    if (status === "COMPLETED") {
      const product = orderItem.product;
      const { id, userId, lastRestocked, ...rest } = product;
      await tx.product.create({
        data: { ...rest, quantity: orderItem.quantity, userId: order.buyerId },
      });
      return await tx.orderItem.update({
        where: { id: orderItemId },
        data: {
          status: status,
        },
        select,
      });
    }
    return await tx.orderItem.update({
      where: { id: orderItemId },
      data: {
        status: status,
        product: {
          update: {
            quantity: {
              increment: orderItem.quantity,
            },
          },
        },
      },
      select,
    });
  });
}
