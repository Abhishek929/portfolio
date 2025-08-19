import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../admin/Sidebar";
import AdminHeader from "../admin/AdminHeader";
import { useParams, useNavigate } from "react-router-dom";
import "./EditProfilePage.css";
import ProfileImage from "../assets/profile.png";

export default function EditProfilePage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    image: "",
    dob: "",
    address: "",
    phone: "",
    gender: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `https://portfolio-rosy-five-54.vercel.app/api/auth/get-user/${id}`
      );
      if (!res.ok) throw new Error("Failed to load profile");
      const data = await res.json();
      setFormData({
        firstname: data.firstname || "",
        lastname: data.lastname || "",
        email: data.email || "",
        image: data.image || "",
        dob: data.dob ? new Date(data.dob).toISOString().split("T")[0] : "",
        address: data.address || "",
        phone: data.phone || "",
        gender: data.gender || "",
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
    try {
      const res = await fetch(
        `https://portfolio-rosy-five-54.vercel.app/api/auth/update-user/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to update profile");
      toast.success("Profile updated successfully!");
      setTimeout(() => navigate(`/profile/${id}`), 2000); // redirect after update
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <p className="text-center">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="profile-dashboard flex">
        {/* Sidebar */}
        <div className="sidebar-container">
            <Sidebar />
        </div>

        {/* Main */}
        <div className="profile-main flex-1">
            <AdminHeader />
            <div className="profile-content">
                <ToastContainer />
                <div className="profile-card">
                    <h2 className="edit-profile-title">Edit Profile</h2>
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
                        <div className="profile-avatar">
                            <label htmlFor="avatarUpload" className="avatar-edit">
                              <img src={formData.image || ProfileImage } alt="Profile" className="avatar-img"/>
                            </label>

                            <input type="file" id="avatarUpload" accept="image/*" className="hidden" onChange={(e) =>
                                setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) })
                                }
                            />
                        </div>
                        <div className="edit-profile">
                            <label className="block text-sm font-medium">First Name</label>
                            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="first-name-input"/>
                        </div>

                        <div className="edit-profile">
                            <label className="block text-sm font-medium">Last Name</label>
                            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="last-name-input"/>
                        </div>

                        <div className="edit-profile">
                            <label className="block text-sm font-medium">Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="email-input" readOnly/>
                        </div>

                        <div className="edit-profile">
                            <label className="block text-sm font-medium">Phone</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="phone-input"/>
                        </div>

                        <div className="edit-profile">
                            <label className="block text-sm font-medium">Date of Birth</label>
                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="date-input"/>
                        </div>

                        <div className="edit-profile">
                            <label className="block text-sm font-medium">Gender</label>
                            <select name="gender" value={formData.gender} onChange={handleChange} className="gender-select">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>

                        <div className="edit-profile">
                            <label className="block text-sm font-medium">Address</label>
                            <textarea name="address" value={formData.address} onChange={handleChange} className="address-textarea"/>
                        </div>

                        <button type="submit" className="save-button">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}
