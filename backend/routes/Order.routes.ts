import { Router } from "express";
import {
  getOrders,
  orderProduct,
} from "../controllers/Order.controller";

const router = Router();

router.get("/orders", getOrders);
router.post("/order", orderProduct);
export default router;
