import Job from "../models/Job.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export async function createJob(req, res) {
    try {
        const job = await Job.create({ ...req.body, postedBy: req.user.userId });

        res.status(201).json(new ApiResponse(201, job, "Job Created successfully"));

    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
}

export async function updateJob(req, res) {
    try {
        const job = await Job.findOne({ _id: req.params.jobId, postedBy: req.user.userId });

        if (!job) {
            return res.status(404).json(new ApiResponse(404, null, "Job not found"));
        }

        Object.assign(job, req.body);
        await job.save();

        res.status(200).json(new ApiResponse(200, job, "Job updated successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
}

export async function getAllJobs(req, res) {
    try {
        const jobs = await Job.find().populate("postedBy", "name email phone_number role").sort({ updatedAt: -1 });
        if (!jobs?.length) {
            return res.status(404).json({ message: "No Jobs found" })
        }

        res.status(200).json(new ApiResponse(200, jobs, "Jobs found"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
}

export async function getJobById(req, res) {
    try {
        const job = await Job.findById(req.params.id).populate("postedBy", "name email phone_number role");

        if (!job) {
            return res.status(404).json(new ApiResponse(404, null, "Job not found"));
        }

        res.status(200).json(new ApiResponse(200, job, "Job found"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
}

export async function deleteJob(req, res) {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json(new ApiResponse(404, null, "Job not found"));
        }

        await job.deleteOne();
        res.status(200).json(new ApiResponse(200, null, "Job deleted successfully"));
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
}
