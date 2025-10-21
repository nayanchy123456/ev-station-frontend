import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "../../css/DashboardLayout.css";

const HostDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar userType="host" />
      <div className="main-content">
        <Navbar username="Nayan" />
        <div className="dashboard-cards">
          <div className="card">Card 1</div>
          <div className="card">Card 2</div>
          <div className="card">Card 3</div>
          <div className="card">Card 4</div>
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
