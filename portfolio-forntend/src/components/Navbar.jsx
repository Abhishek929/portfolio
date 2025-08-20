import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/react.svg';

const Navbar = () => {
  const location = useLocation();

  const loggedIn = Boolean(localStorage.getItem('token'));

  let role = null;
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsed = JSON.parse(userData);
      role = parsed.role; // role should be saved in localStorage when login
    }
  } catch (err) {
    console.error("Error parsing user from localStorage", err);
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <span className="brand">
          <span className="white">F. Aidoo</span>
          <span className="gray"> &amp; </span>
          <span className="yellow">Attya</span>
        </span>
      </div>
      <div className="navbar-right">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/about-us" className={location.pathname === '/about-us' ? 'active' : ''}>About</Link>
        <Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>Our Services</Link>
        {role === "user" && (
          <Link to="/my-account" className={location.pathname === '/my-account' ? 'active' : ''}>
            My Account
          </Link>
        )}

        {role === "admin" && (
          <Link to="/admin/profile" className={location.pathname === '/admin/profile' ? 'active' : ''}>
            Admin Profile
          </Link>
        )}
        {loggedIn ? (<Link to="/logout" className={location.pathname === '/logout' ? 'active' : ''}>Log out</Link>) : (
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>)}
      </div>
    </nav>
  );
};

export default Navbar;


