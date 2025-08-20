import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Auth.css";

const SignupForm = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const API_BASE = "https://portfolio-backend-olive-five.vercel.app";
      const res = await fetch(`${API_BASE}/api/auth/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Signup successful! Redirecting...", {
          position: "top-right",
        });
        setTimeout(() => navigate("/login"), 2000); // Redirect after 2s
      } else {
        toast.error(data.message || "Signup failed", { position: "top-right" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error", { position: "top-right" });
    }
  };

  return (
    <div>
        <Navbar/>
        <ToastContainer />
        <div className="auth-container">
          <div className="auth-box">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" value={form.firstname} onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                <button type="submit">Sign Up</button>
                <p className="switch-auth">Already have an account? <a href="/login">Login</a></p>
            </form>
            </div>
        </div>
    </div>
  );
};

export default SignupForm;
