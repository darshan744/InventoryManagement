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
) => {
  return await Prisma.user.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
      role: "STAFF",
    },
  });
};
