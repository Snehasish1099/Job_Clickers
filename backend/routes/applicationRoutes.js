import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { applyForJob, getApplicationByJobId, getApplicationsByUserId, updateApplicationStatus, } from "../controllers/applicationController.js";
import upload from '../middlewares/multer.js';

const router = Router();

router.post("/:jobId/apply", authMiddleware, upload.single("resume"), applyForJob);
router.get("/users/applied", authMiddleware, getApplicationsByUserId);
router.get("/:jobId", authMiddleware, getApplicationByJobId);
router.put("/:applicationId/status", authMiddleware, updateApplicationStatus);

export default router;
