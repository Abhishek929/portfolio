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
                {[
                    {
                        title: "New User Registered",
                        message: "John Doe just signed up.",
                        date: "Aug 18, 2025"
                     },
                     {
                        title: "Payment Received",
                        message: "₹1200 payment from Jane Smith.",
                        date: "Aug 17, 2025"
                    }
                ].map((notification, idx) => (
                    <div className="notification-card" key={idx}>
                        <div className="notification-title">{notification.title}</div>
                        <div className="notification-message">{notification.message}</div>
                        <div className="notification-date">{notification.date}</div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;