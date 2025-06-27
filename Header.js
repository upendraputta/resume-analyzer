import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo192.png'; // ✅ Import the logo

function Header() {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <h1 className="site-title">ResumeAnalyzer</h1>
      </div>
      <nav className="nav">
        <ul className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/analyze">Analyze</Link>
          <Link to="/create">Create Resume</Link>
          
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
