import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../admin/Sidebar";
import AdminHeader from "../admin/AdminHeader";
import { useParams } from "react-router-dom";
import ProfileImage from "../assets/profile.png";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, [id]);
  console.log("id", id);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("token"); // 👈 stored after login
      console.log("user id", userId);
      if (!userId) throw new Error("User not logged in");
      console.log("user id 2", user._id);
      const res = await fetch(
        `https://portfolio-api-eight-green.vercel.app/api/auth/get-user/${user._id}`,
        {
          headers: { Authorization: `Bearer ${userId}` }
        }
      );
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
              <button className="profile-btn" onClick={() => navigate(`/admin/edit-profile/${user._id}`)}>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
