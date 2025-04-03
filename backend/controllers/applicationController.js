import Application from "../models/Application.js";

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
        const applications = await Application.find().populate("applicantId", "name email");

        res.json(applications);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
