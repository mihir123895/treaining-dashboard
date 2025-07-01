import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
  import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";

import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import CreateModulePage from "./pages/instructor/CreateModulePage";
import AllProgressPage from "./pages/instructor/AllProgressPage";

import TraineeDashboard from "./pages/trainee/TraineeDashboard";
import MyModulesPage from "./pages/trainee/MyModulesPage";
import MobileNav from "./components/MobileNav";
import NotFoundPage from "./pages/NotFoundPage";



const App = () => {
  return (
    <AuthProvider>
      <ToastContainer />
      <Router>
        <Navbar />

        <div className="main-content">
          
        <Routes>
          <Route path="*" element={<NotFoundPage />} />

          {/* Public */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />

          {/* Shared */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["trainee", "instructor"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Instructor Routes */}
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

          {/* Trainee Routes */}
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

          {/* Default fallback */}
          <Route path="*" element={<Spinner />} />
        </Routes>
  
</div>

        <MobileNav />
      </Router>
    </AuthProvider>
  );
};

export default App;
