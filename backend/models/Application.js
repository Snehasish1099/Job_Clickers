import { Schema, model } from "mongoose";
import User from './User.js'
import Job from './Job.js'

const ApplicationSchema = new Schema({
    jobId: { type: Schema.Types.ObjectId, ref: Job, required: true },
    applicantId: { type: Schema.Types.ObjectId, ref: User, required: true },
    resume: { type: String, required: true },
    status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" }
}, { timestamps: true });

export default model("Application", ApplicationSchema);
