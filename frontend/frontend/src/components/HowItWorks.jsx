import React from "react";
import "./HowItWorks.css";

const HowItWorks = () => {
  const steps = [
    { number: "1", title: "Select a Tool", description: "Choose the tool that fits your current farming needs." },
    { number: "2", title: "Input Data", description: "Provide location and other details for accurate AI predictions." },
    { number: "3", title: "Get Insights", description: "Receive tailored recommendations and actionable insights." },
  ];

  return (
    <div className="how-it-works-section">
      <h2>How It Works</h2>
      <div className="steps-grid">
        {steps.map((step, index) => (
          <div key={index} className="step-card">
            <div className="step-number">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
