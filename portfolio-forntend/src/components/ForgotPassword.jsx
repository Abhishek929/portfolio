import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await fetch("https://portfolio-api-eight-green.vercel.app/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Password reset link sent to your email");
      } else {
        toast.error(data.message || "Error sending reset link");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className="login-container">
        <div className="login-box">
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
