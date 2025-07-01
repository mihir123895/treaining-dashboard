import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loadingUser } = useAuth();

  if (loadingUser) return <Spinner />;

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
