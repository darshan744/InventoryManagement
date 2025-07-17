import Router from "express";
import { login, logout, refreshToken, signUp } from "../controllers/Auth.controller";
const router = Router();

router.post("/auth/login", login);
router.post("/auth/signup", signUp);
router.post("/auth/logout", logout);
router.post("/auth/refresh-token", refreshToken)

export default router;
