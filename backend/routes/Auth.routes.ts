import Router from "express";
import { login, logout, signUp } from "../controllers/Auth.controller";
const router = Router();

router.post("/auth/login", login);
router.post("/auth/signup", signUp);
router.post("/auth/logout", logout);

export default router;
