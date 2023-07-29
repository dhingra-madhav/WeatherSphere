import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ICON_MAP from "../data/iconMap";
import "./DisplayWeather.css";

const DisplayWeather = ({ coordinates }) => {
  // EXTRACTING LAT & LONG
  const { latitude, longitude } = coordinates;

  // SETTING WEATHER DATA AS STATE VARIABLE
  const [weatherData, setWeatherData] = useState({});

  // HANDLING API
  useEffect(() => {
    const response = axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=relativehumidity_2m&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_probability_max,windspeed_10m_max&current_weather=true&timezone=auto`
    );

    response.then((req) => {
      if (req.status === 200) {
        setWeatherData(req.data);
      } else
        alert("Unable to fetch weather data. Please refresh and try again.");
    });
  }, []);

  // CONVERTING SUNSET TIME TO 12 HOUR FORMAT
  function convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(":").map(Number);
    let hours12 = hours % 12 || 12;
    hours12 = (hours12 >= 1 && hours12 <= 9) ? "0"+hours12 : hours12; 
    return `${hours12}:${minutes.toString().padStart(2, "0")}`;
  }

  // EXTRACTING CURRENT & DAILY WEATHER
  const { current_weather: current, daily } = weatherData;

  // LOADING
  if (!(current && daily)) {
    return (
      <div className="bg-blue-300 h-screen text-3xl text-blue-950 font-semibold flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // DISPLAYING WEATHER
  return (
    <div className="bg-blue-300 text-blue-950 font-semibold">
      {/* CURRENT WEATHER */}
      <header className="flex items-center justify-evenly px-20 py-16 gap-6">
        {/* CURRENT WEATHER ICON */}
        <img
          className="h-[150px]"
          src={`../public/icons/${ICON_MAP.get(current.weathercode)}.svg`}
          alt=""
        />

        {/* CURRENT TEMP */}
        <p className="text-5xl">{current.temperature}&deg;</p>

        {/* CURRENT WEATHER CARDS */}
        <div className="flex gap-20 flex-wrap text-lg">
          {/* DAY/NIGHT */}
          <div className="cards gap-3 py-3.5 px-6">
            <img
              className="h-[50px]"
              src={`../public/icons/${current.is_day ? "sun" : "moon"}.svg`}
              alt=""
            />
            <p>{current.is_day ? "DAY" : "NIGHT"}</p>
          </div>
          {/* WIND */}
          <div className="cards py-8 px-3">
            <span>WIND</span>
            {current.windspeed} km/h
          </div>
          {/* SUNRISE */}
          <div className="cards py-8 px-3">
            <span>SUNRISE</span>
            {daily.sunrise[0].slice(daily.sunrise[0].indexOf("T") + 1)} AM
          </div>
          {/* SUNSET */}
          <div className="cards py-8 px-3">
            <span>SUNSET</span>
            {convertTo12HourFormat(
              daily.sunset[0].slice(daily.sunset[0].indexOf("T") + 1)
            )} PM
          </div>
        </div>
      </header>

      {/* DAILY WEATHER */}
      <div className="text-lg">
        {/* DAILY WEATHER ROWS */}
        {daily.time.map((date) => (
          <div
            key={date}
            className={`${
              daily.time.indexOf(date) % 2 === 0 ? "bg-blue-200" : "bg-blue-300"
            } flex justify-around items-center px-10 py-4`}
          >
            {/* DAILY DATE */}
            <p>
              {daily.time[daily.time.indexOf(date)]
                .split("-")
                .reverse()
                .join("-")}
            </p>

            {/* DAILY WEATHER ICON */}
            <img
              className="h-[50px]"
              src={`../public/icons/${ICON_MAP.get(
                daily.weathercode[daily.time.indexOf(date)]
              )}.svg`}
              alt=""
            />

            {/* DAILY WEATHER VARIABLES */}

            {/* DAILY MIN TEMP */}
            <div className="flex flex-col text-center">
              <span>MIN TEMP</span>
              {daily.temperature_2m_min[daily.time.indexOf(date)]}&deg;
            </div>

            {/* DAILY MAX TEMP */}
            <div className="flex flex-col text-center">
              <span>MAX TEMP</span>
              {daily.temperature_2m_max[daily.time.indexOf(date)]}&deg;
            </div>

            {/* DAILY WIND */}
            <div className="flex flex-col text-center">
              <span>WIND</span>
              {daily.windspeed_10m_max[daily.time.indexOf(date)]} km/h
            </div>

            {/* DAILY PRECIP */}
            <div className="flex flex-col text-center">
              <span>PRECIP</span>
              {daily.precipitation_probability_max[daily.time.indexOf(date)]}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

DisplayWeather.propTypes = {
  coordinates: PropTypes.object,
};

export default DisplayWeather;
