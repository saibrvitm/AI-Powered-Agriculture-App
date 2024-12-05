import React from "react";
import "./Hero.css";
import img from "../images/heroimg.png";

const Hero = () => {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Revolutionizing Agriculture with AI</h1>
        <p className="hero-description">
          Empowering farmers with intelligent tools to optimize crop yields,
          conserve resources, and adapt to climate change.
        </p>
        <button className="hero-button">
          <a href="https://www.sciencedirect.com/science/article/pii/S258972172030012X" target="_blank" rel="noopener noreferrer">Learn More</a>
        </button>
      </div>
      <div className="hero-visual">
        <img src={img} alt="Farming Illustration" className="hero-image" />
      </div>
    </div>
  );
};

export default Hero;
