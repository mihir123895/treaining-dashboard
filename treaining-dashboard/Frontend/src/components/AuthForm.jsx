import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import "../styles/AuthForm.css";

const AuthForm = ({ type = "login", onSubmit }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "trainee",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{type === "login" ? "Login" : "Register"}</h2>

        {type === "register" && (
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        {type === "register" && (
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="trainee">Trainee</option>
            <option value="instructor">Instructor</option>
          </select>
        )}

        <button type="submit">{type === "login" ? "Login" : "Register"}</button>

        {/* 👉 Auth navigation links */}
        <div className="auth-links" style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          {type === "login" && (
            <>
              <p>
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
              <p>
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
            </>
          )}

          {type === "register" && (
            <p>
              Already have an account? <Link to="/">Login</Link>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
