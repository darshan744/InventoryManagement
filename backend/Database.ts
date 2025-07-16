import Prisma from "./PrismaClient";


export const getUserByEmail = async (email : string) => {
  return await Prisma.user.findUnique({
    where: { email: email },
  });
}
