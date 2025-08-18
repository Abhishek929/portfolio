import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const userId = localStorage.getItem("userId"); // 👈 stored after login
      if (!userId) throw new Error("User not logged in");

      const res = await fetch(
        `https://portfolio-api-eight-green.vercel.app/api/auth/get-user/${userId}`
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-lg w-full">
        <div className="flex flex-col items-center">
          {/* Profile image */}
          <img
            src={user.image || "https://via.placeholder.com/120"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-500"
          />
          <h2 className="text-2xl font-semibold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-sm text-gray-400">Role: {user.role}</p>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex justify-between">
            <span className="font-medium">First Name:</span>
            <span>{user.fristname || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Last Name:</span>
            <span>{user.lastname || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Phone:</span>
            <span>{user.phone || "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Date of Birth:</span>
            <span>{user.dob ? new Date(user.dob).toLocaleDateString() : "-"}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Gender:</span>
            <span>{user.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Address:</span>
            <span>{user.address || "-"}</span>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => toast.info("Edit profile coming soon...")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
