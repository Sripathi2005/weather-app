import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const api_key = "e951f0f51b6cb05d8f7f4e5be5c2a591";

  const getWeather = () => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${api_key}`)
      .then(response => response.json())
      .then(data => setWeatherData(data))
      .catch(error => console.error("Error fetching weather data:", error));
  };



  return (
    <div className="app-container">
  <h1>Weather App</h1>
  <input
        type="text"
        placeholder="Enter Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    
  <button style={{marginTop: '12px'}} onClick={getWeather}>Get Weather</button>

  {weatherData && weatherData.city ? (
    <div className="weather-card">
      <h2>Weather in {weatherData.city.name}</h2>
      <img
        className="weather-icon"
        src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`}
        alt={weatherData.list[0].weather[0].description}
      />
      <p>Temperature: {(weatherData.list[0].main.temp - 273.15).toFixed(2)} °C</p>
      <p>Humidity: {weatherData.list[0].main.humidity} %</p>
      <p>Condition: {weatherData.list[0].weather[0].main}</p>
      <p>Description: {weatherData.list[0].weather[0].description}</p>
      <p>Wind Speed: {weatherData.list[0].wind.speed} m/s</p>
      <p>Cloudiness: {weatherData.list[0].clouds.all} %</p>
      <p>Pressure: {weatherData.list[0].main.pressure} hPa</p>
      <p>Feels Like: {(weatherData.list[0].main.feels_like - 273.15).toFixed(2)} °C</p>
      <p>Visibility: {weatherData.list[0].visibility} meters</p>
      <p>Data Time: {new Date(weatherData.list[0].dt * 1000).toLocaleString()}</p>
    </div>
  ) : (
    <p style={{ color: "#fff" }}>No data available</p>
  )}
</div>

)};

export default App;
