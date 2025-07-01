import React from "react";
import "../styles/ErrorFallback.css";

const ErrorFallback = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="error-fallback">
      <h3>🚫 {message}</h3>
      <button onClick={onRetry}>Retry</button>
    </div>
  );
};

export default ErrorFallback;
