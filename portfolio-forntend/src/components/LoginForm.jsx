import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../components/Navbar';
import './Login.css';
const LoginForm = () => {
    const [form, setForm] = useState({ identifier: "", password: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await fetch("https://portfolio-rosy-five-54.vercel.app/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("You are now logged in!", { autoClose: 2000 });
                // Save token and user
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirect after 2 seconds
                setTimeout(() => {
                    if (data.user.role === "admin") {
                        navigate("/admin");
                    } else {
                        navigate("/");
                    }
                }, 2000);
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error logging in");
        }
    };

  return (
    <div>
        <Navbar/>
        <ToastContainer/>
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input name="identifier" type="text" placeholder="Email/Username" value={form.identifier} onChange={handleChange} required />
                    <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
                    <p className="forgot-text"><Link to="/forgot-password">Forgot password?</Link></p>
                    <button type="submit">Login</button>
                    <p className="signup-text"> Don't have an account? <a href="/sign-up">Sign up</a></p>
                </form>
            </div>
        </div>
    </div>
  );
};

export default LoginForm;
