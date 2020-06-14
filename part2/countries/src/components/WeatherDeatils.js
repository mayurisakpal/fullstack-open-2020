import React, { useState, useEffect } from "react";
import axios from "axios";

const WEATHER_API = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "http://api.weatherstack.com/current",
};

function WeatherDetails(props) {
  const [weather, setWeather] = useState({});
  const { city } = props;
  useEffect(() => {
    axios
      .get(
        `${WEATHER_API.base}?access_key=${
          WEATHER_API.key
        }&query=${city.toLowerCase()}`
      )
      .then((response) => setWeather(response.data.current));
  }, []);

  return (
    Object.keys(weather).length > 0 && (
      <>
        <h3>Weather in {city}</h3>
        <p>
          <strong>Temprature:</strong> {weather.temperature} Celcius
        </p>
        <img
          src={weather.weather_icons[0]}
          alt={weather.description}
          windth="100"
        />
        <p>
          <strong>Wind</strong>: {weather.wind_speed} mph, direction{" "}
          {weather.wind_dir}
        </p>
      </>
    )
  );
}

export default WeatherDetails;
