import Module from "../models/Module.js";
import User from "../models/User.js";


// ✅ Instructor: Add new training module & assign to trainee
export const createModule = async (req, res) => {
  const { title, description, assignedTo } = req.body;

  try {
    // Ensure the user you're assigning to is a trainee
    const trainee = await User.findById(assignedTo);
    if (!trainee || trainee.role !== "trainee") {
      return res.status(400).json({ message: "Assigned user must be a trainee." });
    }

   const newModule = new Module({ title, description, assignedTo });
await newModule.save();
res.status(201).json({ message: "Module created and assigned.", module: newModule });

  } catch (error) {
    res.status(500).json({ message: "Error creating module", error: error.message });
  }
};

// ✅ Instructor: Delete module
export const deleteModule = async (req, res) => {
  try {
    await Module.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Module deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting module", error: error.message });
  }
};

// ✅ Trainee: View own modules
export const getMyModules = async (req, res) => {
  try {
    const modules = await Module.find({ assignedTo: req.user.id });
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: "Error fetching modules", error: error.message });
  }
};

// ✅ Trainee: Mark module as completed
export const markModuleComplete = async (req, res) => {
  try {
    const module = await Module.findOne({ _id: req.params.id, assignedTo: req.user.id });
    if (!module) return res.status(404).json({ message: "Module not found" });

    module.isCompleted = true;
    await module.save();
    res.status(200).json({ message: "Module marked as completed" });
  } catch (error) {
    res.status(500).json({ message: "Error updating module", error: error.message });
  }
};

// ✅ Instructor: View all trainees' module progress
export const getAllModuleProgress = async (req, res) => {
  try {
    const data = await Module.find().populate("assignedTo", "username email");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error getting progress", error: error.message });
  }
};