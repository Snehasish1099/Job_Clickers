import { Router } from "express";
import { registerUser, loginUser, updateProfile } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import passport from "passport";
import "../config/passport.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/profile", authMiddleware, updateProfile);

const generateTokenAndRedirect = (req, res) => {
    const token = jwt.sign(
      { userId: req.user._id, role: req.user.role },
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
