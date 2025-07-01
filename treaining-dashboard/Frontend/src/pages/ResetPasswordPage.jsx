import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

const ResetPasswordPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-fill email if passed from ForgotPasswordPage
  useEffect(() => {
    if (location.state?.email) {
      setFormData((prev) => ({ ...prev, email: location.state.email }));
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`,
        formData
      );
      setMessage(res.data.message || "Password reset successful.");

      // Redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleReset}>
        <h2>Reset Password</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="otp"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={handleChange}
          required
        />
        <input
          name="newPassword"
          type="password"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Password</button>
        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
      </form>
    </div>
  );
};

export default ResetPasswordPage;
