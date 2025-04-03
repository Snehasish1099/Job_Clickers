import Application from "../models/Application.js";
import Job from "../models/Job.js"

export async function applyForJob(req, res) {
    try {
        const application = await Application.create({
            jobId: req.params.jobId,
            applicantId: req.user.userId,
            resume: req.file.path
        });

        res.json({ msg: "Application submitted successfully", application });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getApplications(req, res) {
    try {
        const job = await Job.findOne({ _id: req.params.jobId, postedBy: req.user.userId });

        if (!job) {
            return res.status(403).json({ error: "Not authorized" });
        }

        const applications = await Application.find({ jobId: req.params.jobId }).populate("applicantId", "name email phone_number");

        res.json(applications);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateApplicationStatus(req, res) {
    try {
        const application = await Application.findById(req.params.applicationId);
        if (!application) {
            return res.status(404).json({ error: "Application not found" });
        }

        const job = await Job.findById(application.jobId);
        if (!job || job.postedBy.toString() !== req.user.userId) {
            return res.status(403).json({ error: "Not authorized" });
        }

        application.status = req.body.status;
        await application.save();
        res.json({ message: "Application status updated successfully", application });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}