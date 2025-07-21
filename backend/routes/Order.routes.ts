import { Router } from "express";
import {
  getOrders,
  orderMultipleProducts,
  orderProduct,
} from "../controllers/Order.controller";

const router = Router();

router.get("/orders", getOrders);
router.post("/order", orderProduct);
router.post("/orders", orderMultipleProducts);
export default router;
