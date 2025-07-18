import { Router } from "express";
import {
  getUserProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/Product.controller";
const router = Router();

router.get("/products", getUserProducts);
router.post("/product", createProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
