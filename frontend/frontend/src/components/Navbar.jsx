import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          Smart Farming
        </a>
        <div className="navbar-links">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/tools" className="nav-link">
            Tools
          </a>
          <a href="/about" className="nav-link">
            About Us
          </a>
          <a href="/contact" className="nav-link">
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
