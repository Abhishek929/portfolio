import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHeader.css";

const AdminHeader = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Get user data from localStorage (or context)
        const storedUser = JSON.parse(localStorage.getItem("user"))
        const token = localStorage.getItem("token")

        if (!token || !storedUser) {
            navigate("/login"); // Not logged in
            return;
        }

        setUser(storedUser);
    }, [navigate])

    return (
        <header className="admin-header">
            <h1>Admin Dashboard</h1>
            {user && <span className="welcome-text">Welcome, {user.username}!</span>}
            <button
                className="logout-btn"
                onClick={() => {
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/login");
                }}
            >
                Logout
            </button>
        </header>
    );
 
}

export default AdminHeader;