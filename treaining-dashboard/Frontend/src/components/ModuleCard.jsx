import React from "react";
import axios from "axios";
import "../styles/ModuleCard.css";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const ModuleCard = ({ data, showComplete = false }) => {

  // ...inside the component:
const { user } = useAuth();

  const handleComplete = async () => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/modules/complete/${data._id}`,
        {},
        { withCredentials: true }
      );
      window.location.reload(); // simple refresh for demo
    } catch (error) {
      toast.error("Failed to mark as complete",error);
    }
  };

  const handleDelete = async () => {
  if (!window.confirm("Are you sure you want to delete this module?")) return;
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/api/modules/${data._id}`,
      { withCredentials: true }
    );
    window.location.reload();
  } catch (err) {
    toast.error("Failed to delete",err);
  }
};


  return (
    <div className={`module-card ${data.isCompleted ? "completed" : ""}`}>
      <h4>{data.title}</h4>
      <p>{data.description}</p>
      {showComplete && !data.isCompleted && (
        <button onClick={handleComplete}>Mark as Completed</button>
      )}
      {showComplete && data.isCompleted && <span className="done-label">✅ Completed</span>}

      { user?.role === "instructor" && (
  <button className="delete-btn" onClick={handleDelete}>🗑️ Delete</button>
)}

    </div>
  );
};

export default ModuleCard;
