import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone_number: { type: String },
    password: { type: String },
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
    }],

    googleId: { type: String, unique: true, sparse: true, },
    githubId: { type: String, unique: true, sparse: true },
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
