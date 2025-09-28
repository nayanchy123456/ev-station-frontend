import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("Login response:", res.data);

      const { token, role, message, email: userEmail, firstName, lastName, phone, createdAt } = res.data;

      // Block pending hosts
      if (role === "PENDING_HOST") {
        setError(message || "Your host registration is pending approval by admin.");
        return;
      }

      if (!token) {
        setError("Login failed: no token returned.");
        return;
      }

      // Save token + user info
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ role, email: userEmail, firstName, lastName, phone, createdAt })
      );

      // Redirect based on role
      if (role === "ADMIN") navigate("/admin-dashboard");
      else if (role === "HOST") navigate("/host-dashboard");
      else navigate("/user-dashboard");

    } catch (err) {
      console.error("Login error:", err);
      if (err.response?.status === 403) {
        setError(err.response.data.message || "Pending host approval.");
      } else {
        setError(err.response?.data?.message || "Invalid email or password");
      }
    }
  };

  return (
    <div className="login-card">
      <h2>Login</h2>
      {error && <p className="login-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="login-input-container">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " required />
          <label>Email</label>
        </div>

        <div className="login-input-container">
          <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " required />
          <label>Password</label>
          <span className="login-icon" onClick={() => setShowPassword(prev => !prev)} style={{ cursor: "pointer" }}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button type="submit" className="login-btn">Login</button>
      </form>

      <p className="login-redirect">
        Don't have an account? <span className="login-link" onClick={() => navigate("/register")}>Register</span>
      </p>
    </div>
  );
};

export default Login;
