import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Make sure this exists
import "../styles/NotFound.css";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // assumes context gives you user object

  const handleRedirect = () => {
    if (user?.role === "instructor") {
      navigate("/instructor/dashboard");
    } else if (user?.role === "trainee") {
      navigate("/trainee/dashboard");
    } else {
      navigate("/"); // fallback to login
    }
  };

  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <button className="back-home" onClick={handleRedirect}>
        Go back to Dashboard
      </button>
    </div>
  );
};

export default NotFoundPage;
