import { Router } from "express";
import multer, { diskStorage } from "multer";
import authMiddleware from "../middlewares/authMiddleware.js";
import { applyForJob, getApplications } from "../controllers/applicationController.js";

const router = Router();

// Resume Upload Setup
const storage = diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

router.post("/:jobId", authMiddleware, upload.single("resume"), applyForJob);
router.get("/", authMiddleware, getApplications);

export default router;
