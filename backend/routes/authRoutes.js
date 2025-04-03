import { Router } from "express";
import { registerUser, loginUser, updateProfile } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", authMiddleware, updateProfile);

export default router;
