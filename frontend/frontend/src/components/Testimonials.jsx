import React from "react";
import "./Testimonials.css";

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      quote:
        "The Crop Selector has transformed the way I farm. It's intuitive and highly accurate!",
    },
    {
      name: "Jane Smith",
      quote:
        "Thanks to Smart Farming Solutions, my farm is now more sustainable than ever.",
    },
  ];

  return (
    <div className="testimonials-section">
      <h2>What Our Users Say</h2>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p className="quote">“{testimonial.quote}”</p>
            <p className="author">- {testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
