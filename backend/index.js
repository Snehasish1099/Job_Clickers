import dotenv from "dotenv";
import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import connectDB from "./db/connectDB.js";

dotenv.config();

const app = express();
app.use(json());
app.use(cors());

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

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
