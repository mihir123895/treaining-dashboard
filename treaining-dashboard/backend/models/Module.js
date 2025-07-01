import mongoose from "mongoose";


const moduleSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, default: "" },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Module = mongoose.model("Module", moduleSchema);
export default Module;
