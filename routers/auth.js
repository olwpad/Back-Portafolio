import { Router } from "express";
import { login, register, logout,checkToken } from "../controllers/authController.js";
import { verificarToken } from "../middleware/validations.js";

const router = Router();

router.post("/login", login);
router.post("/account", register);
router.post("/logout", logout);
router.get("/checkToken", verificarToken, checkToken);
export default router;
