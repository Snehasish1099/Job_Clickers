import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";

const router = Router();

// Admin Routes
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
    const users = await User.find().select("-password");
    res.json(users);
});

router.get("/jobs", authMiddleware, adminMiddleware, async (req, res) => {
    const jobs = await Job.find().populate("postedBy", "name email");
    res.json(jobs);
});

router.get("/applications", authMiddleware, adminMiddleware, async (req, res) => {
    const applications = await Application.find().populate("applicantId", "name email");
    res.json(applications);
});

export default router;
