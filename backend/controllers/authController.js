import { hash, compare } from "bcryptjs";
import User from "../models/User.js";

import jwt from "jsonwebtoken";
const { sign } = jwt;


export async function registerUser(req, res) {
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const hashedPassword = await hash(password, 10);

        user = await User.create({ name, email, password: hashedPassword, role });

        res.status(201).json({ msg: "User registered successfully", user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function loginUser(req, res) {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }

        const token = sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({ token, role: user.role });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export async function updateProfile(req, res) {
    try {
        const { name, email, password } = req.body;
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
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json({ msg: "Profile updated successfully", user });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
