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

export const getProducts = async (userId: string) => {
  return await Prisma.product.findMany({
    where: {
      userId: userId,
    },
  });
};

export const createProduct = async (
  name: string,
  quantity: number,
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
