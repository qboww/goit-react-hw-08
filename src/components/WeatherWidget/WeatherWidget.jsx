// WeatherWidget.js
import React, { useEffect, useState } from "react";
import { getWeatherByCoordinates } from "../../config/weatherApi";
import css from "./WeatherWidget.module.css";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const weatherData = await getWeatherByCoordinates(
              latitude,
              longitude,
            );
            setWeather(weatherData);
          } catch (error) {
            setError("Failed to fetch weather data");
          }
        },
        (error) => {
          setError("Failed to retrieve your location");
        },
      );
    } else {
      setError("Geolocation is not supported by your browser");
    }
  }, []);

  const getWeatherAdvice = () => {
    if (!weather) return "";

    const temp = weather.main.temp;
    const description = weather.weather[0].description;

    if (description.includes("rain")) {
      return "It's raining. You should take an umbrella :D";
    } else if (temp < 10) {
      return "It's cold outside. Wear a jacket ;)";
    } else if (temp > 25) {
      return "The weather is nice. Go for a walk!";
    } else {
      return "The weather is moderate. Dress comfortably <3";
    }
  };

  if (error) {
    return <div className="weather-widget">Error: {error}</div>;
  }

  if (!weather) {
    return <div className="weather-widget">Loading...</div>;
  }

  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="sub-card">
      <h2 className="component-title">Current Weather</h2>
      <div className={css.weatherWidget}>
        <img src={iconUrl} className={css.weatherIcon} alt="Weather Icon" />
        <div className={css.dataContainer}>
          <p>Location: {weather.name}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </div>
      </div>
      <p className={css.advice}>{getWeatherAdvice()}</p>
    </div>
  );
};

export default WeatherWidget;
