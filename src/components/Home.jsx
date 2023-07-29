import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Home = ({ onCoordinatesUpdate }) => {
  // SETTING LAT & LONG AS STATE VARIABLES
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // HANDLING ON CLICK OF GET WEATHER BUTTON
  const handleGetWeather = () => {
    // IF LAT & LONG IS NOT OF TYPE "NUMBER"
    if (typeof latitude !== "number" || typeof longitude !== "number") {
      alert("Please enter valid latitude and longitude values");
    } else onCoordinatesUpdate(latitude, longitude);
  };

  // GETTING CURRENT LOCATION COORDS
  function getCurrentPosition() {
    // ACCESSING CURRENT LOCATION
    navigator.geolocation.getCurrentPosition(positionSuccess, positionError);

    // IF LOCATION ACCESS IS ENABLED, SET CURRENT COORDS
    function positionSuccess({ coords }) {
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
      onCoordinatesUpdate(coords.latitude, coords.longitude);
    }

    // IF LOCATION ACCESS IS DISABLED
    function positionError() {
      alert("Please allow us to access your current location.");
    }
  }

  // DISPLAYING HOME PAGE
  return (
    <div className="h-screen">
      {/* WEATHER SPHERE WEB APP TITLE */}
      <p className="text-center pt-10 text-7xl font-bold text-rose-800">
        WeatherSphere
      </p>

      {/* GETTING LAT & LONG VALUES */}
      <div className="flex flex-col items-center mt-20">
        {/* FROM USER */}

        {/* ENTER LAT & LONG VALUES */}
        <p className="text-2xl">Enter Latitude and Longitude values</p>

        <div className="flex flex-wrap gap-7 h-[40px] mt-6">
          {/* LAT INPUT */}
          <input
            type="number"
            min={0}
            className="rounded-xl px-10 bg-gray-100"
            placeholder="Latitude"
            onChange={(e) => setLatitude(Number(e.target.value))}
          />

          {/* LONG INPUT */}
          <input
            type="number"
            min={0}
            className="rounded-xl px-10 bg-gray-100"
            placeholder="Longitude"
            onChange={(e) => setLongitude(Number(e.target.value))}
          />

          {/* GET WEATHER BUTTON */}
          <button
            onClick={handleGetWeather}
            className="bg-[rgba(127,57,251,0.5)] text-white text-lg px-10"
          >
            Get Weather
          </button>
        </div>

        {/* OR */}
        <p className="text-xl font-medium my-10">OR</p>

        {/* FROM USER'S LOCATION */}

        {/* GET WEATHER BUTTON */}
        <button
          onClick={getCurrentPosition}
          className="text-2xl bg-red-300 text-white px-14 py-2"
        >
          Get weather for current location
        </button>
      </div>

      <Link to="https://github.com/dhingra-madhav" target="_blank"><p className="text-center mt-36">Built with 💖 by Madhav Dhingra</p></Link>
    </div>
  );
};

Home.propTypes = {
  onCoordinatesUpdate: PropTypes.func,
};

export default Home;
