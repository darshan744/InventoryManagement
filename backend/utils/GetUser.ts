import { Request } from "express";
import AppError from "./AppError";

export default function getUser(req: Request) {
  const user = req.user;
  if (!user) {
    throw new AppError("User not authenticated", 400);
  }
  return user.id;
}
