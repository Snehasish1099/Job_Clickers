import { hash, compare } from "bcryptjs";
import User from "../models/User.js";
import path from 'path';

import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.js";
const { sign } = jwt;


export async function registerUser(req, res) {
    console.log("register: req.body", req.body);
    const { name, email, phone_number, password, role } = req.body;
    try {
        if (!email && !phone_number) {
            return res.status(400).json(new ApiResponse(400, null, "Email or phone number is required"));
        }

        if (!role || !["jobseeker", "employer"].includes(role)) {
            return res.status(400).json(new ApiResponse(400, null, "Invalid role. Choose 'jobseeker' or 'employer'."));
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { phone_number }],
        });

        if (existingUser) {
            return res.status(400).json(new ApiResponse(400, null, "User exists already"));
        }

        const hashedPassword = await hash(password, 10);

        const user = await User.create({ name, email, phone_number, password: hashedPassword, role });

        res.status(201).json(new ApiResponse(201, user, "User registered successfully"));

    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
}

export async function loginUser(req, res) {
    try {
        const { email, phone_number, password } = req.body;
        const user = await User.findOne({
            $or: [{ email }, { phone_number }],
        });

        if (!user) {
            return res.status(400).json(new ApiResponse(400, null, "Invalid Credentials"));
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(new ApiResponse(400, null, "Invalid password"))
        }

        const token = sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        // res.status(200).json({ token, user: user, status: 200, message: 'Login Successful' });
        res.status(200).json(new ApiResponse(200, { token, user: user }, 'Login Successful'));

    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
}

export async function getProfile(req, res) {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json(new ApiResponse(404, null, "User not found"))
        }

        res.status(200).json(new ApiResponse(200, user, "User Found"))
    } catch (error) {
        res.status(500).json(new ApiResponse(500, null, error.message));
    }
}

//Might need furthur modifications later on
export async function updateProfile(req, res) {
    try {
        const { name, email, phone_number, password, education, work_experience, location, headline, skills, certifications } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found", status: 404 });
        }

        if (name) {
            user.name = name;
        }
        // if (email) {
        //     user.email = email;
        // }
        // if (phone_number) {
        //     user.phone_number = phone_number;
        // }
        // if (password) {
        //     user.password = await bcrypt.hash(password, 10);
        // }

        if (location) {
            user.location = location;
        }
        if (headline) {
            user.headline = headline;
        }
        if (education) {
            user.education = JSON.parse(education);
        }
        if (work_experience) {
            user.work_experience = JSON.parse(work_experience);
        }
        if (skills) {
            user.skills = JSON.parse(skills);
        }
        if (certifications) {
            user.certifications = JSON.parse(certifications);
        }

        if (req.file) {
            const resumeFilePath = path.join('uploads', req.file.filename);
            user.resume = resumeFilePath;
        }

        await user.save();
        res.status(200).json({ message: "Profile updated successfully", data: user, status: 200 });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
