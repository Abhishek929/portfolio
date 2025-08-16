import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaLayerGroup,
  FaComments,
  FaBox
} from "react-icons/fa";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

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
        <li onClick={() => navigate("/admin/site-settings")}>Settings</li>
        <li onClick={() => navigate("/admin/reports")}>Reports</li>
      </ul>
    </aside>
  );
}
