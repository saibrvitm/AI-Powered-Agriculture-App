import React, { useState } from "react";
import axios from "axios";
import "./WaterAdvisor.css";

const WaterAdvisor = () => {
  const [formData, setFormData] = useState({
    Soil_Type: "",
    Irrigation_Type: "",
    Water_Scarcity: "",
    Crop_Name: "",
    Rainfall_Requirement: "",
    Temperature_Requirement: "",
    Yield: "",
    Crop_Cycle_Duration: "",
  });

  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/water_use",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPredictions(response.data); // Save predictions to state
    } catch (error) {
      console.error("Error predicting water use:", error);
      alert("Failed to fetch predictions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="water-advisor">
      <h2>Water Advisor</h2>

      <form className="water-form" onSubmit={handleSubmit}>
        {/* Input Fields */}
        <div className="form-group">
          <label htmlFor="Soil_Type">Soil Type:</label>
          <select name="Soil_Type" onChange={handleChange} required>
            <option value="">Select Soil Type</option>
            <option value="Sandy">Sandy</option>
            <option value="Clay">Clay</option>
            <option value="Loam">Loam</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="Irrigation_Type">Irrigation Type:</label>
          <select name="Irrigation_Type" onChange={handleChange} required>
            <option value="">Select Irrigation Type</option>
            <option value="Drip">Drip</option>
            <option value="Sprinkler">Sprinkler</option>
            <option value="Surface">Surface</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="Water_Scarcity">Water Scarcity Level:</label>
          <select name="Water_Scarcity" onChange={handleChange} required>
            <option value="">Select Water Scarcity</option>
            <option value="Low">Low</option>
            <option value="Moderate">Moderate</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="Crop_Name">Crop Name:</label>
          <input
            type="text"
            name="Crop_Name"
            onChange={handleChange}
            placeholder="Enter Crop Name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Rainfall_Requirement">
            Rainfall Requirement (mm/year):
          </label>
          <input
            type="number"
            name="Rainfall_Requirement"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Temperature_Requirement">
            Temperature Requirement (°C):
          </label>
          <input
            type="number"
            name="Temperature_Requirement"
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Yield">Yield (kg):</label>
          <input type="number" name="Yield" onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="Crop_Cycle_Duration">
            Crop Cycle Duration (days):
          </label>
          <input
            type="number"
            name="Crop_Cycle_Duration"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Calculating..." : "Submit"}
        </button>
      </form>

      {/* Display Predictions */}
      {predictions && (
        <div className="predictions">
          <h3>Predictions:</h3>
          <p>
            <strong>Predicted Water Use:</strong>{" "}
            {predictions.predicted_water_use}
          </p>
          <p>
            <strong>Predicted Temperature Requirement:</strong>{" "}
            {predictions.predicted_temperature_requirement}
          </p>
          <p>
            <strong>Predicted Rainfall Requirement:</strong>{" "}
            {predictions.predicted_rainfall_requirement}
          </p>
        </div>
      )}
    </div>
  );
};

export default WaterAdvisor;
