import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import { getAllUsers, deleteUser } from "../controllers/adminController.js";
import { getAllJobs } from "../controllers/jobController.js";
import { getAllApplications } from "../controllers/applicationController.js";

const router = Router();

// Admin Routes
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

router.delete("/users/:userId", authMiddleware, adminMiddleware, deleteUser);

router.get("/jobs", authMiddleware, adminMiddleware, getAllJobs);

router.get("/applications", authMiddleware, adminMiddleware, getAllApplications);

export default router;
