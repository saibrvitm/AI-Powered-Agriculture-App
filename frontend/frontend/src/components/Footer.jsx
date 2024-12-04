import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Smart Farming Solutions</h3>
          <p>
            Transforming agriculture with AI-powered tools for sustainability
            and resilience.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#tools">Our Tools</a>
            </li>
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@smartfarming.com</p>
          <p>Phone: +1 800-123-4567</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">
              🌐
            </a>
            <a href="#" aria-label="Twitter">
              🐦
            </a>
            <a href="#" aria-label="LinkedIn">
              🔗
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 Smart Farming Solutions. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
