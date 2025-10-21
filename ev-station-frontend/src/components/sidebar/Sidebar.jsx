import React, { useState } from "react";
import { FaUser, FaMapMarkerAlt, FaBolt, FaCalendarAlt, FaMoneyBillWave, FaBell, FaStar, FaMoon, FaFilm, FaExclamationTriangle, FaComments, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ userType }) => {
  const [collapsed, setCollapsed] = useState(false);

  const menus = {
    user: [
      { name: "Profile", icon: <FaUser /> },
      { name: "Search Chargers", icon: <FaMapMarkerAlt /> },
      { name: "Charger Details", icon: <FaBolt /> },
      { name: "Book a Slot", icon: <FaCalendarAlt /> },
      { name: "Booking Calendar", icon: <FaCalendarAlt /> },
      { name: "Upcoming Bookings", icon: <FaCalendarAlt /> },
      { name: "Booking History", icon: <FaCalendarAlt /> },
      { name: "Notifications", icon: <FaBell /> },
      { name: "Reviews & Ratings", icon: <FaStar /> },
      { name: "Dark Mode", icon: <FaMoon /> },
      { name: "Video Tutorials", icon: <FaFilm /> },
      { name: "Report Charger Issue", icon: <FaExclamationTriangle /> },
      { name: "Chat with Hosts", icon: <FaComments /> },
      { name: "Email/SMS Notifications", icon: <FaEnvelope /> },
    ],
    host: [
      { name: "Profile", icon: <FaUser /> },
      { name: "Search Chargers", icon: <FaMapMarkerAlt /> },
      { name: "Charger Details", icon: <FaBolt /> },
      { name: "My Chargers", icon: <FaBolt /> },
      { name: "Manage Listings", icon: <FaCalendarAlt /> },
      { name: "Notifications", icon: <FaBell /> },
      { name: "Analytics Dashboard", icon: <FaStar /> },
      { name: "Reviews & Ratings", icon: <FaStar /> },
      { name: "Dark Mode", icon: <FaMoon /> },
      { name: "Advertisement Management", icon: <FaFilm /> },
      { name: "Chat with Users", icon: <FaComments /> },
      { name: "Email/SMS Notifications", icon: <FaEnvelope /> },
    ],
    admin: [
      { name: "Profile", icon: <FaUser /> },
      { name: "Dashboard Overview", icon: <FaBolt /> },
      { name: "Wallet/Balance System", icon: <FaMoneyBillWave /> },
      { name: "Notifications", icon: <FaBell /> },
      { name: "Admin Panel", icon: <FaBolt /> },
      { name: "Analytics Dashboard", icon: <FaStar /> },
      { name: "Dark Mode", icon: <FaMoon /> },
      { name: "Advertisement Management", icon: <FaFilm /> },
      { name: "Email/SMS Notifications", icon: <FaEnvelope /> },
    ],
  };

  const handleLogout = () => {
    // TODO: implement logout logic
    alert("Logged out!");
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        <h2>{!collapsed && "ChargeHub"}</h2>
        <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "=" : "X"}
        </button>
      </div>

      <ul className="menu-list">
        {menus[userType].map((menu, idx) => (
          <li key={idx} className="menu-item" title={collapsed ? menu.name : ""}>
            <span className="icon">{menu.icon}</span>
            {!collapsed && <span className="text">{menu.name}</span>}
          </li>
        ))}
      </ul>

      {/* Logout at bottom */}
      <div className="logout-section">
        <li className="menu-item logout" onClick={handleLogout} title={collapsed ? "Logout" : ""}>
          <span className="icon"><FaSignOutAlt /></span>
          {!collapsed && <span className="text">Logout</span>}
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
