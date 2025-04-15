import { hash, compare } from "bcryptjs";
import User from "../models/User.js";

import jwt from "jsonwebtoken";
const { sign } = jwt;


export async function registerUser(req, res) {
    console.log("register: req.body", req.body);
    const { name, email, phone_number, password, role } = req.body;
    try {
        if (!email && !phone_number) {
            return res.status(400).json({ error: "Email or phone number is required" });
        }

        if (!role || !["jobseeker", "employer"].includes(role)) {
            return res.status(400).json({ error: "Invalid role. Choose 'jobseeker' or 'employer'." });
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { phone_number }],
        });

        if (existingUser) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await hash(password, 10);

        const user = await User.create({ name, email, phone_number, password: hashedPassword, role });

        res.status(201).json({ msg: "User registered successfully", user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, phone_number, password } = req.body;
        const user = await User.findOne({
            $or: [{ email }, { phone_number }],
        });

        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        const token = sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ token, user: user, status: 200 });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function getProfile(req, res) {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ msg: "User not found" })
        }
        res.status(200).json({ user: user, message: "User found" })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateProfile(req, res) {
    try {
        const { name, email, phone_number, password } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        if (name) {
            user.name = name;
        }
        if (email) {
            user.email = email;
        }
        if (phone_number) {
            user.phone_number = phone_number;
        }
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json({ msg: "Profile updated successfully", user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
