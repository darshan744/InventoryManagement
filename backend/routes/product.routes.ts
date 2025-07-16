import { Router } from "express";
import {
  getUserProducts,
  createProduct,
} from "../controllers/product.controller";
const router = Router();

router.get("/products", getUserProducts);
router.post("/products", createProduct);
