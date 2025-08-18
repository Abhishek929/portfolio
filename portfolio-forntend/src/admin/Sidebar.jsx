import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaLayerGroup,
  FaComments,
  FaBox,
  FaCog,
  FaBell,
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebar-logo"><span class="brand"><span class="white">F. Aidoo</span><span class="gray"> &amp; </span><span class="yellow">Attya</span></span></div>
      <ul className="sidebar-menu">
        <li onClick={() => navigate("/admin")}>
          <FaTachometerAlt className="sidebar-icon" />
          Dashboard
        </li>
        <li>
          <FaLayerGroup className="sidebar-icon" />
          UI Elements
        </li>
        <li onClick={() => navigate("/admin/manage-users")}>
          <FaUser className="sidebar-icon" />
          Users
        </li>
        <li onClick={() => navigate("/admin/contacts")}>
          <FaComments className="sidebar-icon" />
          Chat
        </li>
        <li>
          <FaBox className="sidebar-icon" />
          Products
        </li>
        <li onClick={() => navigate("/admin/site-settings")}>
          <FaCog className="sidebar-icon" />
          Settings
        </li>
        <li onClick={() => navigate("/admin/reports")}>Reports</li>
        // Add my account

        {/* My Account with Submenu */}
        <li
          onClick={() => setAccountOpen(!accountOpen)}
          className="cursor-pointer"
        >
          <FaUser className="sidebar-icon" />
          My Account
        </li>
        {accountOpen && (
          <ul className="submenu">
            <li onClick={() => navigate("/admin/profile")}>Profile</li>
            <li onClick={() => navigate("/admin/notifications")}>
              <FaBell className="sidebar-icon" />
              Notifications
            </li>
            <li onClick={() => navigate("/admin/account-settings")}>
              Account Settings
            </li>
            <li onClick={() => navigate("/logout")} className="text-red-500">
              Logout
            </li>
          </ul>
        )}
      </ul>
    </aside>
  );
}
