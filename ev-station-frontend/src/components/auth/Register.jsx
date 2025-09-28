import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../css/register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER"); // default role
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      const res = await api.post("/auth/register", { firstName, lastName, email, phone, password, role });
      console.log("Register response:", res.data);

      const { role: userRole, message } = res.data;

      if (userRole === "PENDING_HOST") {
        setSuccessMsg(message || "Your host registration is pending admin approval.");
        return;
      }

      setSuccessMsg(message || "Registration successful! Please login.");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-card">
      <h2>Register</h2>

      {error && <p className="register-error">{error}</p>}
      {successMsg && <p className="register-success">{successMsg}</p>}

      <form onSubmit={handleSubmit}>
        <div className="register-input-container">
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder=" " required />
          <label>First Name</label>
        </div>

        <div className="register-input-container">
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder=" " required />
          <label>Last Name</label>
        </div>

        <div className="register-input-container">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder=" " required />
          <label>Email</label>
        </div>

        <div className="register-input-container">
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder=" " required />
          <label>Phone Number</label>
        </div>

        <div className="register-input-container">
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder=" " required />
          <label>Password</label>
        </div>

        {/* Role select */}
        <div className="register-input-container">
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="USER">User</option>
            <option value="HOST">Host</option>
          </select>
          <label>Role</label>
        </div>

        <button type="submit" className="register-btn">Register</button>
      </form>

      <p className="register-redirect">
        Already have an account? <span className="register-link" onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
};

export default Register;
