import React, { useEffect, useState } from "react";
import { getWeatherByCoordinates } from "../../config/weatherApi";
import css from "./WeatherWidget.module.css";

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  if (error) {
    return <div className={css.weatherWidget}>Error: {error}</div>;
  }

  if (!weather) {
    return <div className={css.weatherWidget}>Loading...</div>;
  }

  const iconUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className={`${css.wrapper} ${isCollapsed ? css.collapsed : ""}`}>
      <div className={css.weatherWidget}>
        <button onClick={toggleCollapse} className={css.toggleButton}>
          {isCollapsed ? "<" : ">"}
        </button>
        {!isCollapsed && (
          <>
            <img src={iconUrl} className={css.weatherIcon} alt="Weather Icon" />
            <div className={css.dataContainer}>
              <p>{weather.name}</p>
              <p>{weather.main.temp}°C</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WeatherWidget;
