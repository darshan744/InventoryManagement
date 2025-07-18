import { Router } from "express";
import {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/Order.controller";

const router = Router();

router.get("/orders", getOrders);
router.post("/order", createOrder);
router.patch("/order/:id", updateOrder);
router.delete("/order/:id", deleteOrder);

export default router;
