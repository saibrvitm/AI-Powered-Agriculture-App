import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CropSelector.css";
import MapSelector from "./MapSelector";
import { Line, Bar } from "react-chartjs-2"; // Charts for trends
import "chart.js/auto"; // Automatically register required components

const CropSelector = () => {
  const [coordinates, setCoordinates] = useState([28.6139, 77.209]); // Default location: Delhi
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setPh] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [dailyWeather, setDailyWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weatherLoading, setWeatherLoading] = useState(false);

  // Function to fetch Monthly Weather Data when location changes
  const fetchMonthlyWeatherData = async (lat, lon) => {
    setWeatherLoading(true);
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // 30 days ago
      const formattedStartDate = startDate.toISOString().split("T")[0];
      const endDate = new Date().toISOString().split("T")[0]; // Today's date
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${formattedStartDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`;

      const response = await axios.get(url);
      const data = response.data;

      const { temperature_2m_max, temperature_2m_min, precipitation_sum, time } =
        data.daily;

      // Calculate average temperature and rainfall
      const avgTemp =
        temperature_2m_max.reduce((a, b) => a + b, 0) / temperature_2m_max.length;
      const avgRainfall =
        precipitation_sum.reduce((a, b) => a + b, 0) / precipitation_sum.length;

      setWeatherData({
        averageTemperature: avgTemp,
        averageRainfall: avgRainfall,
      });

      setDailyWeather({
        dates: time,
        maxTemperatures: temperature_2m_max,
        minTemperatures: temperature_2m_min,
        rainfall: precipitation_sum,
      });
    } catch (error) {
      console.error("Error fetching monthly weather data:", error);
      setWeatherData({ averageTemperature: 0, averageRainfall: 0 });
      setDailyWeather([]);
    } finally {
      setWeatherLoading(false);
    }
  };

  // Fetch weather data when location changes
  useEffect(() => {
    if (coordinates && coordinates.length === 2) {
      fetchMonthlyWeatherData(coordinates[0], coordinates[1]);
    }
  }, [coordinates]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!weatherData?.averageTemperature || !weatherData?.averageRainfall) {
      alert("Please choose a valid location on the map to fetch weather data.");
      return;
    }
    if (!nitrogen || !phosphorus || !potassium || !ph) {
      alert("Please fill in all the fields.");
      return;
    }
    setLoading(true);

    if (!weatherData?.averageTemperature || !weatherData?.averageRainfall) {
      console.error("Weather data is invalid or not loaded.");
      setLoading(false);
      return;
    }

    const WData = {
      temperature: weatherData.averageTemperature,
      N: nitrogen,
      P: phosphorus,
      K: potassium,
      ph: ph,
      rainfall: weatherData.averageRainfall,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/crop/",
        WData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setRecommendations(
        response.data.predicted_crop
          ? [
              {
                crop: response.data.predicted_crop,
                nitrogen: nitrogen,
                phosphorus: phosphorus,
                potassium: potassium,
              },
            ]
          : []
      );
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendations([]);
    }

    setLoading(false);
  };

  const resetForm = () => {
    setNitrogen("");
    setPhosphorus("");
    setPotassium("");
    setPh("");
    setRecommendations([]);
    setWeatherData({});
    setDailyWeather([]);
  };

  // Function to classify the pH value
  const classifyPh = (phValue) => {
    if (phValue < 4.5) return "Very Acidic";
    if (phValue >= 4.5 && phValue < 5.5) return "Acidic";
    if (phValue >= 5.5 && phValue < 6.5) return "Neutral";
    if (phValue >= 6.5 && phValue < 7.5) return "Slightly Alkaline";
    if (phValue >= 7.5) return "Alkaline";
    return "";
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

        {weatherLoading ? (
          <p>Loading weather data...</p>
        ) : (
          <p>
            Average Temperature:{" "}
            {weatherData.averageTemperature?.toFixed(2)} °C
            <br />
            Average Rainfall: {weatherData.averageRainfall?.toFixed(2)} mm
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
          <div className="slider-container" style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <input
              type="number"
              id="ph"
              value={ph}
              onChange={(e) => setPh(e.target.value)}
              placeholder="Enter pH value"
            />
            {ph && (
              <span className="ph-indicator">
                ({classifyPh(Number(ph))})
              </span>
            )}
          </div>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Finding Crops..." : "Find Crops"}
        </button>
        <button
          type="button"
          className="reset-button"
          onClick={resetForm}
          disabled={loading}
        >
          Reset
        </button>
      </form>

      <div className="recommendations">
        <strong>Recommended Crops:</strong>
        {recommendations.length > 0 ? (
          <ul className="crop-list">
            {recommendations.map((rec, index) => (
              <li key={index}>
                <h3>{rec.crop}</h3>
                <p>GS = Growth Success</p>
                <strong>Nutrient Values:</strong>
                <p>- Nitrogen: {rec.nitrogen}</p>
                <p>- Phosphorus: {rec.phosphorus}</p>
                <p>- Potassium: {rec.potassium}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available. Try adjusting your inputs.</p>
        )}
      </div>

      {dailyWeather.dates && (
        <div className="weather-trends">
          <h3>Weather Trends</h3>
          <Line
            data={{
              labels: dailyWeather.dates,
              datasets: [
                {
                  label: "Max Temperature (°C)",
                  data: dailyWeather.maxTemperatures,
                  borderColor: "red",
                  fill: false,
                },
                {
                  label: "Min Temperature (°C)",
                  data: dailyWeather.minTemperatures,
                  borderColor: "blue",
                  fill: false,
                },
              ],
            }}
          />
          <Bar
            data={{
              labels: dailyWeather.dates,
              datasets: [
                {
                  label: "Rainfall (mm)",
                  data: dailyWeather.rainfall,
                  backgroundColor: "rgba(75,192,192,0.4)",
                },
              ],
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CropSelector;
