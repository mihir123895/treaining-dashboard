import React from "react";
import axios from "axios";
import AuthForm from "../components/AuthForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // ✅ Import context

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth(); // ✅ Set user globally

  const handleRegister = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        data,
        { withCredentials: true }
      );

      toast.success(res.data.message);

      // ✅ Set user directly in context
      setUser(res.data.user);

      // ✅ Navigate based on role
      const role = res.data.user.role;
      if (role === "instructor") {
        navigate("/instructor/dashboard");
      } else {
        navigate("/trainee/dashboard");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
};

export default RegisterPage;
