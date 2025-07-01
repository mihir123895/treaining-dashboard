import express from "express";
import authMiddleware from "../middlewares/auth.js";
import authorizeInstructor from "../middlewares/authorizeRole.js";
import { createModule, deleteModule, getAllModuleProgress, getMyModules, markModuleComplete } from "../Controllers/moduleController.js";
const router = express.Router();

// ✅ Instructor: Add new training module
router.post("/create", authMiddleware, authorizeInstructor, createModule);

// ✅ Instructor: Delete a module by ID
router.delete("/:id", authMiddleware, authorizeInstructor, deleteModule);

// ✅ Trainee: View only their assigned modules
router.get("/my-modules", authMiddleware, getMyModules);

// ✅ Trainee: Mark a module as completed
router.patch("/complete/:id", authMiddleware, markModuleComplete);

// ✅ Instructor: View all trainees' module progress
router.get("/all-progress", authMiddleware, authorizeInstructor, getAllModuleProgress);

export default router;