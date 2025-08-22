import React from "react";
import "./AuthLayout.css";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <div className="auth-body">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
