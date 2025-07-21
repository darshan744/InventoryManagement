import { Router } from "express";
import {
  getUserProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/Product.controller";
const router = Router();

router.get("/products", getUserProducts);
router.get("/products/all", getAllProducts);
router.post("/product", createProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
