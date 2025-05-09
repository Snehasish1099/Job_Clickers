import { Router } from "express";
import { createJob, updateJob, getAllJobs, getJobById, deleteJob } from "../controllers/jobController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { isEmployer } from "../middlewares/employerMiddleware.js";

const router = Router();

router.post("/", authMiddleware, isEmployer, createJob);
router.put("/:jobId", authMiddleware, isEmployer, updateJob);
router.put("/:jobId", authMiddleware, isEmployer, updateJob);
router.get("/", authMiddleware, getAllJobs);
router.get("/:id", authMiddleware, getJobById);
router.delete("/:id", authMiddleware, isEmployer, deleteJob);

export default router;
