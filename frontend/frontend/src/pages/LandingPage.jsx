import React from "react";
import Hero from "../components/Hero";
import ToolsShowcase from "../components/ToolsShowcase";
import AboutUs from "../components/AboutUs";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";


const LandingPage = () => {
  return (
    <div>
      <Hero />
      <ToolsShowcase />
      <AboutUs />
      <HowItWorks />
      <Testimonials />
    </div>
  );
};

export default LandingPage;
