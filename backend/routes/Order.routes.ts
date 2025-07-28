import { Router } from "express";
import {
  getOrders,
  getRequestedOrders,
  modifyStatusOfOrderItem,
  orderProduct,
} from "../controllers/Order.controller";

const router = Router();

router.get("/orders", getOrders);
router.post("/order", orderProduct);
router.get("/request", getRequestedOrders);
router.patch("/request/:id", modifyStatusOfOrderItem);
export default router;
