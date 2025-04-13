import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import connectDB from "./db/connectDB.js";
import passport from "passport";
import session from "express-session";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(
    session({
        secret: process.env.SESSION_SECRET || "session-secret",
        resave: false,
        saveUninitialized: false,
    })
);

// 🔐 Passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

const port = process.env.PORT || 8000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(port, () => {
            console.log(`Server is running at port: ${port}`);
        });
    } catch (err) {
        console.error("MONGO DB connection failed!!!", err);
        process.exit(1);
    }
};

startServer();
