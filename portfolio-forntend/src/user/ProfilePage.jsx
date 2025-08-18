import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProfilePage.css";
import Sidebar from "../admin/Sidebar";
import AdminHeader from "../admin/AdminHeader";
import { useParams } from 'react-router-dom';
import ProfileImage from "../assets/profile.png"; 

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams()

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("token"); // 👈 stored after login
      if (!userId) throw new Error("User not logged in");

      const res = await fetch(`https://portfolio-api-eight-green.vercel.app/api/auth/get-user/68a033983649e637905583b5`);
      if (!res.ok) throw new Error("Failed to load profile");

      const data = await res.json();
      setUser(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="profile-dashboard">
      {/* Sidebar */}
      <div className="sidebar-container">
        <Sidebar />
      </div>
      {/* Main area */}
      <div className="profile-main">
        <AdminHeader />
        <div className="profile-content">
          <ToastContainer />
          <div className="profile-card">
            <div className="flex flex-col items-center">
              <img src={user.image || ProfileImage } alt="Profile" />
              <h2 className="profile-username">
                {user.username || "User Name"}
              </h2>
              <p className="user-email">{user.email}</p>
            </div>

            <div className="mt-6 border rounded-xl overflow-hidden">
              <div className="details-header">Personal details</div>
              <div className="details-row">
                <span className="details-label">Full Name:</span>
                <span className="details-value">{user.firstname} {user.lastname}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Date of Birth:</span>
                <span className="details-value">{user.dob ? new Date(user.dob).toLocaleDateString() : "-"}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Gender:</span>
                <span className="details-value">{user.gender || "-"}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Nationality:</span>
                <span className="details-value">{user.nationality || "-"}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Address:</span>
                <span className="details-value">{user.address || "-"}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Phone Number:</span>
                <span className="details-value">{user.phone || "-"}</span>
              </div>
              <div className="details-row">
                <span className="details-label">Email:</span>
                <span className="details-value">{user.email}</span>
              </div>
            </div>

            <div className="text-center">
              <button className="profile-btn" onClick={() => toast.info("Edit profile coming soon...")}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
