import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Home from "./components/Home";
import DisplayWeather from "./components/DisplayWeather";

const App = () => {
  // SETTING COORDS AS STATE VARIABLE
  const [coordinates, setCoordinates] = useState(null);

  // USENAVIGATE
  const navigate = useNavigate();

  // SETTING COORDS VALUE AND NAVIGATING TO /weather
  const handleCoordinatesUpdate = (lat, long) => {
    setCoordinates({ latitude: lat, longitude: long });
    navigate("/weather");
  };

  // ADDING ROUTES TO EACH COMPONENT
  return (
    <Routes>

      {/* ROUTE TO HOME COMPONENT */}
      <Route
        path="/"
        element={<Home onCoordinatesUpdate={handleCoordinatesUpdate} />}
      />

      {/* ROUTE TO DISPLAY WEATHER COMPONENT */}
      {coordinates && (
        <Route
          path="/weather"
          element={<DisplayWeather coordinates={coordinates} />}
        />
      )}

      {/* REDIRECTING TO HOME IN CASE OF ANY OTHER ROUTES */}
      <Route path="*" element={<Navigate to="/" />} />
      
    </Routes>
  );
};

export default App;
