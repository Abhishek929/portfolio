import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

const AdminPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage (or context)
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!token || !storedUser) {
      navigate("/login"); // Not logged in
      return;
    }

    // Only allow admins
    if (storedUser.role !== "admin") {
      alert("Access denied: Admins only.");
      navigate("/");
      return;
    }

    
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar-container">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="admin-main">
        <AdminHeader />
        <div className="admin-content">
          <h2>Welcome to the Admin Dashboard</h2>
          <p>Select an option from the sidebar to begin.</p>
        </div>
      </div>
    </div>
  );

};

export default AdminPage;
