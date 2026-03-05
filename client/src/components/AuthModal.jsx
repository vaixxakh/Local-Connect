import { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("login");

  if (!isOpen) return null;

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <span className="close-btn" onClick={onClose}>✕</span>

        {/* HEADER */}
        <div className="auth-header">
          <button
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>

          <button
            className={activeTab === "register" ? "active" : ""}
            onClick={() => setActiveTab("register")}
          >
            Sign Up
          </button>
        </div>

        {/* CONTENT */}
        <div className="auth-content">
          {activeTab === "login" ? (
            <Login onClose={onClose} setActiveTab={setActiveTab} />
          ) : (
            <Register onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;