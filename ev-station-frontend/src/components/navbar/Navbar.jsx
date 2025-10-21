import React from "react";
import { FaBell, FaUserCircle, FaSearch } from "react-icons/fa";
import "./Navbar.css";

const Navbar = ({ username }) => {
  return (
    <div className="navbar">
      <div className="search-bar">
        <FaSearch className="search-icon"/>
        <input type="text" placeholder="Search chargers or hosts..." />
      </div>
      <div className="navbar-right">
        <FaBell className="icon"/>
        <div className="profile">
          <FaUserCircle className="icon"/>
          <span className="username">{username}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
