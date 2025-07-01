import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaUserCircle,
  FaChalkboardTeacher,
  FaTasks,
  FaClipboardList,
  FaUser,
  FaSignOutAlt,
  FaBook
} from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to={user?.role === "instructor" ? "/instructor/dashboard" : "/trainee/dashboard"}>
            <h2>Training  <span className="Logo">Tracker</span></h2>
          </Link>
        </div>

        <div className="nav-right desktop-menu">
          {user && (
            <>
              <span><FaUserCircle className="icon" /> {user.username}</span>
              {user.role === "instructor" && (
                <>
                  <Link to="/instructor/dashboard"><FaChalkboardTeacher className="icon" />Dashboard</Link>
                  <Link to="/instructor/create"><FaTasks className="icon" />Create Module</Link>
                  <Link to="/instructor/progress"><FaClipboardList className="icon" />All Progress</Link>
                </>
              )}
              {user.role === "trainee" && (
                <>
                  <Link to="/trainee/dashboard"><FaChalkboardTeacher className="icon" />Dashboard</Link>
                  <Link to="/trainee/my-modules"><FaBook className="icon" />My Modules</Link>
                </>
              )}
              <Link to="/profile"><FaUser className="icon profile-icon" />Profile</Link>
              
            </>
          )}
        </div>

        {user && (
          <div className="nav-right">
<button onClick={handleLogout}><FaSignOutAlt className="icon" />Logout</button>
        </div>

        )}
        
        
      </nav>
    </>
  );
};

export default Navbar;
