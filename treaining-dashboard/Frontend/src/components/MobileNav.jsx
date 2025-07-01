import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, PlusCircle, BookOpenCheck, User } from "lucide-react";
import "../styles/MobileNav.css";

const MobileNav = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <nav className="mobile-nav">
      {user.role === "instructor" && (
        <>
          <Link to="/instructor/dashboard">
            <Home className="icon" />
          </Link>
          <Link to="/instructor/create">
            <PlusCircle className="icon" />
          </Link>
          <Link to="/instructor/progress">
            <BookOpenCheck className="icon" />
          </Link>
        </>
      )}

      {user.role === "trainee" && (
        <>
          <Link to="/trainee/dashboard">
            <Home className="icon" />
          </Link>
          <Link to="/trainee/my-modules">
            <BookOpenCheck className="icon" />
          </Link>
        </>
      )}

      <Link to="/profile">
        <User className="icon" />
      </Link>
    </nav>
  );
};

export default MobileNav;
