import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../components/Navbar';
import "./AccountPage.css";

export default function AccountPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user data on mount
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      // ✅ get userId from localStorage / auth context
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User not logged in");

      const res = await fetch(
        `https://portfolio-rosy-five-54.vercel.app/api/auth/get-user/${userId}`
      );
      if (!res.ok) throw new Error("Failed to fetch user data");
      const data = await res.json();

      setFormData({
        username: data.username,
        email: data.email,
        password: "", // never show real password, only allow reset
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userId = localStorage.getItem("userId");
      const res = await fetch(
        `https://portfolio-rosy-five-54.vercel.app/api/auth/update-user/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update account");

      toast.success("Account updated successfully", { position: "top-right" });
    } catch (err) {
      setError(err.message);
      toast.error("Error: " + err.message, { position: "top-right" });
    }
  };

  return (
    <div className="account-page">
        <Navbar/>
        <ToastContainer />
        <div className="account-container">
          <h2>My Account</h2>

          {loading && <p>Loading account...</p>}
          {error && <p className="error-text">{error}</p>}

          {!loading && (
            <form className="account-form" onSubmit={handleSubmit}>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <label>New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
              />

              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </form>
          )}
        </div>
    </div>
  );
}
