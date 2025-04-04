import { Schema, model } from "mongoose";
import User from './User.js'

const JobSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    postedBy: { type: Schema.Types.ObjectId, ref: User, required: true },
}, { timestamps: true });

export default model("Job", JobSchema);
