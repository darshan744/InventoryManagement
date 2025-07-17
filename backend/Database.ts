import { UnitType } from "./generated/prisma";
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

export async function getProducts(userId: string) {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const product = await Prisma.product.findMany({
    where: { userId },
  })

  return product;
}
export const createProduct = async (name: string, quantity: number,
  threshold: number,
  unit: UnitType,
  category: string,
  userId: string,
) => {
  return await Prisma.product.create({
    data: {
      name,
      quantity,
      threshold,
      unit,
      category,
      userId,
    },
  });
};
