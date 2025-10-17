import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);

  const getWeather = async () => {
    if (!city) {
      alert("Please enter a city name!");
      return;
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
    );
    const info = await response.json();

    if (info.cod === 200) {
      setData({
        temp: info.main.temp,
        humidity: info.main.humidity,
        condition: info.weather[0].main,
      });
    } else {
      alert("City not found!");
      setData(null);
    }
  };

  return (
    <div className="container">
      <h2>🌤️ React Weather App</h2>
      <div className="input-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {data && (
        <div className="weather-card">
          <h3>Weather in {city}</h3>
          <p>🌡️ Temperature: {data.temp} °C</p>
          <p>💧 Humidity: {data.humidity}%</p>
          <p>☁️ Condition: {data.condition}</p>
        </div>
      )}
    </div>
  );
}

export default App;
