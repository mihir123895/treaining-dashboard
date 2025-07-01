import express from "express";
const router = express.Router();

import { forgotPassword, getAllTrainees, getAllUsers, getMyProgressStats, getUser, loginUser, registerUser, resetPassword, updateProfile } from "../Controllers/UserController.js";
import authorizeInstructor from "../middlewares/authorizeRole.js";
import authMiddleware from "../middlewares/auth.js";

// ✅ Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// ✅ Profile update (protected)
router.put("/update-profile", authMiddleware, updateProfile);

// ✅ Only instructors should call this
router.get("/all-users", authMiddleware, getAllUsers);
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  });

  router.get("/all-users",  authorizeInstructor, getAllUsers);
  // ✅ Route for trainee's progress summary
router.get("/my-progress", authMiddleware, getMyProgressStats);
router.get("/me", authMiddleware, getUser);
router.get("/trainees",authMiddleware, authorizeInstructor,  getAllTrainees);


export default router; 