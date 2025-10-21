// src/components/dashboard/UserDashboard.jsx
import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "../../css/DashboardLayout.css";

const UserDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar userType="user" />
      <div className="main-content">
        <Navbar username="Nayan" />
      
      </div>
    </div>
  );
};

export default UserDashboard;
