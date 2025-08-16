import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/react.svg';

const Navbar = () => {
  const location = useLocation();

  const loggedIn = Boolean(localStorage.getItem('token'));

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
        <Link to="/userspage" className={location.pathname === '/userspage' ? 'active' : ''}>Users Page</Link>
        {loggedIn ? (<Link to="/logout" className={location.pathname === '/logout' ? 'active' : ''}>Log out</Link>) : (
            <Link to="/login" className={location.pathname === '/login' ? 'active' : ''}>Login</Link>)}
      </div>
    </nav>
  );
};

export default Navbar;


