import { useState, useEffect } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import "./AuthModal.css";

const AuthModal = ({ isOpen, onClose, initialTab = "login", initialRole = "finder" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div
        className="auth-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close-btn" onClick={onClose}>✕</span>

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

        <div className="auth-content">
          {activeTab === "login" ? (
            <Login onClose={onClose} setActiveTab={setActiveTab} />
          ) : (
            <Register onClose={onClose} initialRole={initialRole} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;