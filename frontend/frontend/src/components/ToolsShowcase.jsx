import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./ToolsShowcase.css";

const ToolsShowcase = () => {
  const tools = [
    {
      title: "Crop Selector",
      description:
        "Identify the most suitable crops for your region using AI insights.",
      icon: "🌾",
      link: "/crop-selector", // Corrected the spelling of "selector"
    },
    {
      title: "Water Advisor",
      description:
        "Conserve water and optimize irrigation for sustainable farming.",
      icon: "💧",
      link: "/water-advisor", // Added link for Water Advisor
    },
    {
      title: "Farm Calendar",
      description:
        "Plan and optimize your farming schedule with intelligent recommendations.",
      icon: "📅",
      link: "/farm-calendar", // Added link for Farm Calendar
    },
  ];

  return (
    <div className="tools-showcase">
      <h2 className="tools-title">What We Offer</h2>
      <p className="tools-subtitle">
        Explore our AI-powered tools designed to revolutionize your farming
        practices.
      </p>
      <div className="tools-grid">
        {tools.map((tool, index) => (
          <Link to={tool.link} key={index} className="tool-card">
            {" "}
            {/* Wrap the card in a Link */}
            <div className="tool-icon">{tool.icon}</div>
            <h3 className="tool-title">{tool.title}</h3>
            <p className="tool-description">{tool.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ToolsShowcase;
