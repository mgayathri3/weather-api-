import React, { useState, useEffect } from "react";
import "./App.css";


export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("London");

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a8fd86d413f7baebf673f560d829aeca&units=metric`);
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
      }
    } catch (err) {
      console.error(err);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const newCity = e.target.city.value.trim();
    if (newCity) {
      setCity(newCity);
      fetchWeather(newCity);
    }
  };

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>
      <form onSubmit={handleSearch}>
        <input name="city" placeholder="Enter city" />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : weather && weather.main && weather.weather ? (
        <div className="card">
          <h2>{weather.name}</h2>
          <p>{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].description}</p>
          <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>City not found or data unavailable.</p>
      )}
    </div>
  );
}
