import React from "react";
import axios from "axios";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
    const { fetchCurrentUser } = useAuth(); // 👈 use it

 const handleLogin = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`,
        data,
        { withCredentials: true }
      );

      toast.success(res.data.message);

      // ✅ Wait a little before fetching user
      setTimeout(async () => {
        await fetchCurrentUser(); // 👈 fetch from backend
        const role = res.data.user.role;
        if (role === "instructor") {
          navigate("/instructor/dashboard");
        } else {
          navigate("/trainee/dashboard");
        }
      }, 300);

    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} />;
};

export default LoginPage;
