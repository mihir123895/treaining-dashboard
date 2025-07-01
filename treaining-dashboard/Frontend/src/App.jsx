import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import ProtectedRoute from "./utils/ProtectedRoute";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

// Instructor
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CreateModulePage from "./pages/instructor/CreateModulePage";
import AllProgressPage from "./pages/instructor/AllProgressPage";

// Trainee
import TraineeDashboard from "./pages/trainee/TraineeDashboard";
import MyModulesPage from "./pages/trainee/MyModulesPage";

const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Navbar />

        <Routes>
          {/* ✅ Public Routes — OUTSIDE main-content */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* ✅ Protected & Dashboard Routes — INSIDE main-content */}
          <Route
            path="*"
            element={
              <div className="main-content">
                <Routes>
                  {/* Shared */}
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute allowedRoles={["trainee", "instructor"]}>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Instructor */}
                  <Route
                    path="/instructor/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["instructor"]}>
                        <InstructorDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/instructor/create"
                    element={
                      <ProtectedRoute allowedRoles={["instructor"]}>
                        <CreateModulePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/instructor/progress"
                    element={
                      <ProtectedRoute allowedRoles={["instructor"]}>
                        <AllProgressPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* Trainee */}
                  <Route
                    path="/trainee/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["trainee"]}>
                        <TraineeDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/trainee/my-modules"
                    element={
                      <ProtectedRoute allowedRoles={["trainee"]}>
                        <MyModulesPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404 */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>
            }
          />
        </Routes>

        <MobileNav />
      </Router>
    </AuthProvider>
  );
};

export default App;
