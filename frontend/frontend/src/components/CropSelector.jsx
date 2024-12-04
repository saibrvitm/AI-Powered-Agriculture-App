import React, { useState } from "react";
import axios from "axios";
import "./CropSelector.css";
import MapSelector from "./MapSelector";

const CropSelector = () => {
  const [coordinates, setCoordinates] = useState([28.6139, 77.209]); // Default location: Delhi
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setPh] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  // Fetch Monthly Weather Data from OpenWeatherMap API
  const fetchMonthlyWeatherData = async (lat, lon) => {
    try {
      const API_KEY = "7627526dbcc1db6dc5c6ec2f9103e253";
      const url = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${
        Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60
      }&appid=${API_KEY}&units=metric`; // Fetch data from 30 days ago
      const response = await axios.get(url);
      console.log(response.data); // Log the full response to check for errors or missing data

      const data = response.data;

      // Calculate the monthly averages for temperature and rainfall
      let totalTemp = 0;
      let totalRainfall = 0;
      let dayCount = data.hourly.length;

      data.hourly.forEach((hour) => {
        totalTemp += hour.temp;
        if (hour.rain) totalRainfall += hour.rain["1h"] || 0; // Assuming hourly rain data exists
      });

      const avgTemp = totalTemp / dayCount;
      const avgRainfall = totalRainfall / dayCount;

      setWeatherData({
        averageTemperature: avgTemp,
        averageRainfall: avgRainfall,
      });
    } catch (error) {
      console.error("Error fetching monthly weather data:", error);
      setWeatherData({ averageTemperature: 0, averageRainfall: 0 }); // Default values in case of error
    }
  };

  // Example crop data with soil parameters N, P, K, and pH
  const cropsData = [
    {
      name: "Wheat",
      nitrogen: 20,
      phosphorus: 40,
      potassium: 30,
      ph: 6.5,
      region: "North",
    },
    {
      name: "Rice",
      nitrogen: 30,
      phosphorus: 50,
      potassium: 40,
      ph: 6.0,
      region: "East",
    },
    {
      name: "Maize",
      nitrogen: 25,
      phosphorus: 45,
      potassium: 35,
      ph: 6.3,
      region: "West",
    },
    {
      name: "Barley",
      nitrogen: 18,
      phosphorus: 35,
      potassium: 25,
      ph: 6.7,
      region: "South",
    },
  ];

  // Handle form submission to filter crops based on soil parameters and weather data
  const handleSubmit = (e) => {
    e.preventDefault();

    // Fetch the monthly weather data when the form is submitted
    fetchMonthlyWeatherData(coordinates[0], coordinates[1]);

    // Filter crops based on user inputs and weather data
    const filteredCrops = cropsData.filter((crop) => {
      const matchesNitrogen = nitrogen
        ? crop.nitrogen === parseInt(nitrogen)
        : true;
      const matchesPhosphorus = phosphorus
        ? crop.phosphorus === parseInt(phosphorus)
        : true;
      const matchesPotassium = potassium
        ? crop.potassium === parseInt(potassium)
        : true;
      const matchesPh = ph ? crop.ph === parseFloat(ph) : true;

      return (
        matchesNitrogen && matchesPhosphorus && matchesPotassium && matchesPh
      );
    });

    setRecommendations(filteredCrops);
  };

  return (
    <div className="crop-selector">
      <h2>Crop Selector Tool</h2>
      <form className="crop-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="location">Location (Select on Map):</label>
          <p>
            Latitude: {coordinates[0].toFixed(4)}, Longitude:{" "}
            {coordinates[1].toFixed(4)}
          </p>
          <MapSelector setCoordinates={setCoordinates} />
        </div>

        <p>
          Average Temperature:{" "}
          {weatherData.averageTemperature
            ? weatherData.averageTemperature.toFixed(2) + " °C"
            : "Fetching..."}
        </p>
        <div className="form-group">
          <label htmlFor="nitrogen">Nitrogen (N):</label>
          <input
            type="number"
            id="nitrogen"
            value={nitrogen}
            onChange={(e) => setNitrogen(e.target.value)}
            placeholder="Enter Nitrogen (N) content"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phosphorus">Phosphorus (P):</label>
          <input
            type="number"
            id="phosphorus"
            value={phosphorus}
            onChange={(e) => setPhosphorus(e.target.value)}
            placeholder="Enter Phosphorus (P) content"
          />
        </div>
        <div className="form-group">
          <label htmlFor="potassium">Potassium (K):</label>
          <input
            type="number"
            id="potassium"
            value={potassium}
            onChange={(e) => setPotassium(e.target.value)}
            placeholder="Enter Potassium (K) content"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ph">pH of Soil:</label>
          <input
            type="number"
            id="ph"
            value={ph}
            onChange={(e) => setPh(e.target.value)}
            placeholder="Enter pH value"
          />
        </div>
        <button type="submit" className="submit-button">
          Find Crops
        </button>
      </form>

      <div className="recommendations">
        <h3>Recommended Crops:</h3>
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((crop, index) => (
              <li key={index}>
                <strong>{crop.name}</strong> - Best suited for the given soil
                parameters.
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available. Try adjusting your inputs.</p>
        )}
      </div>
    </div>
  );
};

export default CropSelector;
