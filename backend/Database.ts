import { Product, UnitType } from "./generated/prisma";
import Prisma from "./PrismaClient";
import { hashPassword } from "./utils/Hash";

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
export async function getAllProducts(userId: string) {
  return await Prisma.product.findMany({
    where: {
      quantity: { gt: 0 },
      userId: { not: userId },
    },
    include: {
      user: {
        select: {
          name: true,
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
  price : number
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
      price
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
      userId: userId,
    },
  });
}
export async function orderProduct(
  productId: string,
  quantity: number,
  userId: string,
) {
  if (!productId || !quantity || !userId) {
    throw new Error("Product ID, quantity, and user ID are required");
  }
  return await Prisma.order.create({
    data: {
      productId,
      quantity,
      userId,
    },
  });
}
