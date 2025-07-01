import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ import
import "../styles/AuthForm.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅

  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/forgot-password`,
        { email }
      );
      setMessage(res.data.message || "OTP sent to your email.");

      // ✅ Navigate to /reset-password with email as state
      setTimeout(() => {
        navigate("/reset-password", { state: { email } });
      }, 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSendOTP}>
        <h2>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Send OTP</button>
        {message && <p style={{ marginTop: "1rem" }}>{message}</p>}
        <p><a href="/login">Return to login page</a></p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
