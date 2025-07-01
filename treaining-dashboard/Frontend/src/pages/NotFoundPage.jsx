import React from "react";
import { Link } from "react-router-dom";
import "../styles/NotFound.css"; 

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! Page not found.</p>
      <Link to="/" className="back-home">Go back to Home</Link>
    </div>
  );
};

export default NotFoundPage;
