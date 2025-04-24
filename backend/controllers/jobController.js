import Job from "../models/Job.js";

export async function createJob(req, res) {
    try {
        const job = await Job.create({ ...req.body, postedBy: req.user.userId });

        res.status(201).json({ data: job, message: "Job Created successfully", status: 201 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateJob(req, res) {
    try {
        const job = await Job.findOne({ _id: req.params.jobId, postedBy: req.user.userId });

        if (!job) {
            return res.status(404).json({ error: "Job not found" });
        }

        Object.assign(job, req.body);
        await job.save();

        res.status(200).json({ message: "Job updated successfully", data: job, status: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getAllJobs(req, res) {
    try {
        const jobs = await Job.find().populate("postedBy", "name email phone_number");
        if (!jobs?.length) {
            return res.status(404).json({ message: "No Jobs found" })
        }

        res.status(200).json({ data: jobs, message: "Jobs found", status: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getJobById(req, res) {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ message: "Job not found", status: 404 });
        }

        res.status(200).json({ data: job, message: 'Job found', status: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteJob(req, res) {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: "Job not found", status: 404 });
        }

        await job.deleteOne();
        res.status(200).json({ message: "Job deleted successfully", status: 200 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
