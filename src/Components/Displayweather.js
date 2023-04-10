import React, { useEffect, useState } from "react";
import { BsFillPinMapFill } from "react-icons/bs";
import "./Displayweather.css";

export default function Displayweather({ data }) {
  const [weatherdetails, setweather] = useState();
  const keys = "1f21a75b8d8e62a9f9b2eb89e1664d25";
  const latitude = data[0].latitude;
  const longitude = data[0].longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${keys}&units=metric`;
  useEffect(() => {
    if (data && data.length > 0) {
      fetchweather();
    }
  }, [data]);
  const fetchweather = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setweather(data));
  };
  const handleCityClick = () => {
    if (weatherdetails) {
      const { name } = weatherdetails;
      window.open(`https://www.google.com/maps/place/${name}`);
    }
  };

  return (
    <div>
      {weatherdetails && (
        <div className="weather">
          <div className="top">
            <div>
              <p className="city" onClick={handleCityClick}>
                {weatherdetails?.name}
                <BsFillPinMapFill />
              </p>
              <p className="weather-description">
                {weatherdetails?.weather[0]?.description}
              </p>
            </div>
            <img
              alt="weather"
              className="weather-icon"
              src={require(`./icons/${weatherdetails?.weather[0]?.icon}.png`)}
            />
          </div>
          <div className="bottom">
            <p className="temperature">
              {Math.round(weatherdetails?.main?.temp)}°C
            </p>
            <div className="details">
              <div className="parameter-row">
                <span className="parameter-label">Details</span>
              </div>
              <br />
              <div className="parameter-row">
                <span className="parameter-label">Feels like</span>
                <span className="parameter-value det">
                  {Math.round(weatherdetails?.main?.feels_like)}°C
                </span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Wind</span>
                <span className="parameter-value">
                  {weatherdetails?.wind?.speed} m/s
                </span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Humidity</span>
                <span className="parameter-value">
                  {weatherdetails?.main?.humidity}%
                </span>
              </div>
              <div className="parameter-row">
                <span className="parameter-label">Pressure</span>
                <span className="parameter-value">
                  {weatherdetails?.main?.pressure} hPa
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
