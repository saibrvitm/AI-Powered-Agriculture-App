import React, { useState, useEffect } from "react";
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
  const [loading, setLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false); // Track weather loading state

  // Fetch Monthly Weather Data from OpenWeatherMap API
  const fetchMonthlyWeatherData = async (lat, lon) => {
    setWeatherLoading(true); // Start loading weather data
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // 30 days ago
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const endDate = new Date().toISOString().split("T")[0]; // Today's date
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${formattedStartDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

      const response = await axios.get(url);
      const data = response.data;

      // Calculate average temperature and rainfall
      const temperatures = data.daily.temperature_2m_max;
      const rainfall = data.daily.precipitation_sum;

      const avgTemp = temperatures.reduce((a, b) => a + b, 0) / temperatures.length;
      const avgRainfall = rainfall.reduce((a, b) => a + b, 0) / rainfall.length;

      setWeatherData({
        averageTemperature: avgTemp,
        averageRainfall: avgRainfall,
      });
    } catch (error) {
      console.error("Error fetching monthly weather data:", error);
      setWeatherData({ averageTemperature: 0, averageRainfall: 0 }); // Default values in case of error
    } finally {
      setWeatherLoading(false); // End loading weather data
    }
  };

  // Handle form submission to filter crops based on soil parameters and weather data
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setLoading(true);

    // Fetch the monthly weather data when the form is submitted
    await fetchMonthlyWeatherData(coordinates[0], coordinates[1]); // Ensure data is fetched before proceeding
  
    // Check if the weather data is valid before making the request
    if (!weatherData?.averageTemperature || !weatherData?.averageRainfall) {
      console.error("Weather data is invalid");
      setLoading(false);
      return;
    }
  
    const WData = {
      temperature: weatherData.averageTemperature,
      humidity: 34, // Assuming you have a humidity value (You can modify this to use a better value)
      N: nitrogen,
      P: phosphorus,
      K: potassium,
      ph: ph,
      rainfall: weatherData.averageRainfall,
    };
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/crop/", WData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      // Set the filtered crops as recommendations
      setRecommendations(response.data.predicted_crop ? [response.data.predicted_crop] : []);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendations([]); // Clear recommendations on error
    }
  
    setLoading(false);
  };

  useEffect(() => {
    // This effect will run once the weather data has changed or is fully loaded
    if (weatherData.averageTemperature && weatherData.averageRainfall) {
      // Only trigger the crop recommendation after the weather data is available
      console.log("Weather data loaded:", weatherData);
    }
  }, [weatherData]);

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

        {weatherLoading ? (
          <p>Loading weather data...</p> // Display a loading message until weather data is fetched
        ) : (
          <p>
            {weatherData.averageTemperature
              ? "Average Temperature: " + weatherData.averageTemperature.toFixed(2) + " °C"
              : " "}
          </p>
        )}
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
        <button type="submit" className="submit-button" disabled={loading || weatherLoading}>
          {loading ? "Finding Crops..." : "Find Crops"}
        </button>
      </form>

      <div className="recommendations">
        <h3>Recommended Crops:</h3>
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((crop, index) => (
              <li key={index}>
                <strong>{crop}</strong> - Best suited for the given soil
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
