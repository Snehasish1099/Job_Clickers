import { Router } from "express";
import { registerUser, loginUser, updateProfile, getProfile } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from '../middlewares/multer.js';

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/:id", authMiddleware, getProfile);

router.put("/users/update/:id", authMiddleware, upload.single('resume'), updateProfile);

export default router;
