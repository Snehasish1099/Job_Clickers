import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { applyForJob, getApplications, updateApplicationStatus } from "../controllers/applicationController.js";
import upload from '../middlewares/multer.js';

const router = Router();

router.post("/:jobId/apply", authMiddleware, upload.single("resume"), applyForJob);
router.get("/:jobId", authMiddleware, getApplications);
router.put("/:applicationId/status", authMiddleware, updateApplicationStatus);

export default router;
