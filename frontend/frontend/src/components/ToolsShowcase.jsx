import React from "react";
import "./ToolsShowcase.css";

const ToolsShowcase = () => {
  const tools = [
    {
      title: "Crop Selector",
      description:
        "Identify the most suitable crops for your region using AI insights.",
      icon: "🌾",
    },
    {
      title: "Farm Calendar",
      description:
        "Plan and optimize your farming schedule with intelligent recommendations.",
      icon: "📅",
    },
    {
      title: "Water Advisor",
      description:
        "Conserve water and optimize irrigation for sustainable farming.",
      icon: "💧",
    },
    {
      title: "Climate Risk Analyzer",
      description:
        "Stay ahead of climate challenges with risk analysis and mitigation strategies.",
      icon: "🌍",
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
          <div key={index} className="tool-card">
            <div className="tool-icon">{tool.icon}</div>
            <h3 className="tool-title">{tool.title}</h3>
            <p className="tool-description">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolsShowcase;
