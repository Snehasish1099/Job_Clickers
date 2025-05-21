import Application from "../models/Application.js";
import Job from "../models/Job.js"

export async function applyForJob(req, res) {
    try {
        const alreadyApplied = await Application.findOne({
            jobId: req.params.jobId,
            applicantId: req.user.userId
        });

        if (alreadyApplied) {
            return res.status(400).json({ status: 400, message: "You have already applied to this job." });
        }

        const application = await Application.create({
            jobId: req.params.jobId,
            applicantId: req.user.userId,
            resume: req.file.path
        });

        res.status(201).json({ status: 201, message: "Application submitted successfully", data: application });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get All Applications (Only Admin)
export async function getAllApplications(req, res) {
    try {
        const applications = await Application.find().populate("applicantId", "name email phone_number");
        if (!applications.length) {
            return res.status(404).json({ message: "Applications not found" })
        }
        res.status(200).json({ status: 200, data: applications, message: "Applications found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get applications by jobid (Only Employer)
export async function getApplicationByJobId(req, res) {
    try {
        const job = await Job.findOne({ _id: req.params.jobId, postedBy: req.user.userId });

        if (!job) {
            return res.status(403).json({ error: "Not authorized" });
        }

        const applications = await Application.find({ jobId: req.params.jobId }).populate("applicantId", "name email phone_number");
        if (!applications.length) {
            return res.status(404).json({ status: 404, data: applications, message: "Applications not found" })
        }

        res.status(200).json({ status: 200, data: applications, message: "Applications found" });

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

        res.status(200).json({ status: 200, message: "Application status updated successfully", data: application });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getApplicationsByUserId(req, res) {
    try {
        const applications = await Application.find({ applicantId: req.user.userId }).populate("jobId", "title company location");

        res.status(200).json({ status: 200, data: applications, message: "Your applications fetched successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}