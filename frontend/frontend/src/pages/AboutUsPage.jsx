import React from "react";
import "./AboutUsPage.css";
import AboutUs from "../components/AboutUs";

const AboutUsPage = () => {
  return (
    <div className="about-us-container">
      <AboutUs />
      <p>
        Welcome to our comprehensive platform for sustainable agriculture! This
        project combines multiple tools, including the Water Advisor and Crop
        Selector, to assist farmers and stakeholders in making informed
        decisions. With a focus on precision and data-driven insights, we aim to
        enhance productivity and sustainability in farming practices.
      </p>

      <p>
        Our vision is to bridge technology and agriculture, providing practical
        solutions for efficient water management, crop selection, and resource
        optimization. By empowering users with actionable data, we strive to
        contribute to a future of resilient and sustainable agriculture.
      </p>
      <h2>Meet the Creators</h2>
      <ul>
        <li>
          <strong>Manish Gupta</strong>
        </li>
        <li>
          <strong>Sai Bhuwan</strong>
        </li>
        <li>
          <strong>Hrishit Rai</strong>
        </li>
      </ul>
      <p>
        This platform represents our commitment to addressing key challenges in
        agriculture using innovation and simplicity. We hope it becomes a
        valuable resource for farmers and agricultural communities worldwide.
      </p>
    </div>
  );
};

export default AboutUsPage;
