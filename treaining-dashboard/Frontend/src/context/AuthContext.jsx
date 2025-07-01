import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/me`,
        { withCredentials: true }
      );
      setUser(res.data);
    } catch (err) {
      console.error("Auth fetch failed:", err);
    } finally {
      setLoadingUser(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
    } catch (err) {
      toast.success(err?.response?.data?.message || err.message || "Logout Successful");
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loadingUser, logout, setUser,fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
