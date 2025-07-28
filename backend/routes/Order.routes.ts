import { Router } from "express";
import {
  getOrders,
  getRequestedOrders,
  orderProduct,
} from "../controllers/Order.controller";

const router = Router();

router.get("/orders", getOrders);
router.post("/order", orderProduct);
router.get("/request", getRequestedOrders);
export default router;
