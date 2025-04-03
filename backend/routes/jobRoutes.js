import { Router } from "express";
import { createJob, getAllJobs, getJobById, deleteJob } from "../controllers/jobController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createJob);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.delete("/:id", authMiddleware, deleteJob);

export default router;
