import { Router } from "express";
import multer from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";
import { applyForJob, getApplications, updateApplicationStatus } from "../controllers/applicationController.js";

const router = Router();

const upload = multer({ dest: "uploads/" });

router.post("/:jobId/apply", authMiddleware, upload.single("resume"), applyForJob);
router.get("/:jobId", authMiddleware, getApplications);
router.put("/:applicationId/status", authMiddleware, updateApplicationStatus);

export default router;
