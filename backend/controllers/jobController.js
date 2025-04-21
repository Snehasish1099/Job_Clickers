import Job from "../models/Job.js";

export async function createJob(req, res) {
    try {
        const job = await Job.create({ ...req.body, postedBy: req.user.userId });

        res.status(201).json({ data: job, message: "Job Created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateJob(req, res) {
    try {
        const job = await Job.findOne({ _id: req.params.jobId, postedBy: req.user.userId });

        if (!job) {
            return res.status(404).json({ error: "Job not found or not authorized" });
        }

        Object.assign(job, req.body);
        await job.save();

        res.status(200).json({ message: "Job updated successfully", data: job });
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

        res.status(200).json({ data: jobs, message: "Jobs found" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getJobById(req, res) {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ msg: "Job not found" });
        }

        res.status(200).json({ data: job, message: 'Job found' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function deleteJob(req, res) {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ msg: "Job not found" });
        }

        await job.deleteOne();
        res.status(200).json({ msg: "Job deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
