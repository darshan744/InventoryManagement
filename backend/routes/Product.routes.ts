import { Router } from "express";
import {
  getUserProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../controllers/Product.controller";
import upload from "../utils/Multer";
const router = Router();

router.get("/products", getUserProducts);
router.get("/products/all", getAllProducts);
router.post("/product", upload.single("productImage"), createProduct);
router.patch("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
