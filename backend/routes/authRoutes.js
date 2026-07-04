import { Router } from "express";
import { registerUser, loginUser, updateProfile, getProfile } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/multer.js";
import jwt from "jsonwebtoken";
import passport from "passport";
import "../config/passport.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users/:id", authMiddleware, getProfile);

router.put("/users/update/:id", authMiddleware, upload.single('resume'), updateProfile);

const generateTokenAndRedirect = (req, res) => {
  const token = jwt.sign(
    { _id: req.user._id, role: req.user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.redirect(`http://localhost:3000?token=${token}`);
};

// 🟢 Google OAuth Routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), generateTokenAndRedirect);

// 🟣 GitHub OAuth Routes
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { session: false }), generateTokenAndRedirect);

export default router;
