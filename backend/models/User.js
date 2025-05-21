import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["jobseeker", "employer", "admin"], required: true },

    resume: { type: String },
    certifications: [{ type: String }],
    skills: [{ type: String }],
    location: { type: String },
    headline: { type: String },

    work_experience: [{
        job_title: String,
        company: String,
        start_date: Date,
        end_date: Date,
        description: String
    }],

    education: [{
        institution: String,
        degree: String,
        start_year: Number,
        end_year: Number
    }]
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;