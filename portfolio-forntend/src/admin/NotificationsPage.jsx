import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPage.css";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import './NotificationsPage.css';

const NotificationsPage = () => {
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
    <div className="admin-notifications">
      {/* Sidebar */}
      <div className="sidebar-container">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="main-content">
        <AdminHeader />
        <div className="notification-content">
            <h1>Notifications Page</h1>

            <div className="notifications-list">
                <div className="notification-card">
                    <div className="notification-title">New User Registered</div>
                    <div className="notification-message">John Doe just signed up.</div>
                    <div className="notification-date">Aug 18, 2025</div>
                </div>

                <div className="notification-card">
                    <div className="notification-title">Payment Received</div>
                    <div className="notification-message">₹1200 payment from Jane Smith.</div>
                    <div className="notification-date">Aug 17, 2025</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;