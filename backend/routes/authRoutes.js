import { Router } from "express";
import { registerUser, loginUser, updateProfile, getProfile } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/:id", authMiddleware, getProfile);

router.put("/profile", authMiddleware, updateProfile);

export default router;
