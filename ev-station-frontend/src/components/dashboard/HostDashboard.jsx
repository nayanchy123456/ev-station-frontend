import React, { useEffect, useState } from "react";
import LogoutButton from "../auth/LogoutButton";
import api from "../../services/api";

const HostDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Host Dashboard</h2>
        <LogoutButton />
      </header>

      <main>
        <p>Welcome, {user?.firstName || JSON.parse(localStorage.getItem("user"))?.firstName}!</p>
        {/* Add host-specific content here */}
      </main>
    </div>
  );
};

export default HostDashboard;
