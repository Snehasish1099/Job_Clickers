import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

// Google 
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || `${profile.id}@google.com`;
        const user = await User.findOne({
          $or: [{ googleId: profile.id }, ...(email ? [{ email }] : [])],
        });

        if (user) {
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
        } else {
          await User.create({
            name: profile.displayName || profile.id,
            email,
            role: "jobseeker",
            googleId: profile.id,
          });
        }

        const savedUser = user || (await User.findOne({ googleId: profile.id }));
        done(null, savedUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

// GitHub 
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/api/auth/github/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || `${profile.username}@github.com`;
        const user = await User.findOne({
          $or: [{ githubId: profile.id }, { email }],
        });

        if (user) {
          if (!user.githubId) {
            user.githubId = profile.id;
            await user.save();
          }
        } else {
          await User.create({
            name: profile.displayName || profile.username,
            email,
            role: "jobseeker",
            githubId: profile.id,
          });
        }

        const savedUser = user || (await User.findOne({ githubId: profile.id }));
        done(null, savedUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => User.findById(id).then(user => done(null, user)));

export default passport;
