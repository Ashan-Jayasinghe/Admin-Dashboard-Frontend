import React, { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes, Route, Navigate } from "react-router-dom";
import Advertisements from "./pages/advertisements/Advertisements";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Users from "./pages/users/Users";
import Machinery from "./pages/machinery/Machinery";
import Fertilizer from "./pages/fertilizer/Fertilizer";
import Reports from "./pages/reports/Reports";
import AgroChemicals from "./pages/agroChemicals/AgroChemicals";
import PlantingMaterials from "./pages/plantingMaterials/PlantingMaterials";
import Login from "./pages/Login/Login";
import Signup from "./pages/signup/Signup";
import { Toaster } from "react-hot-toast";
import AnalyticsDashboard from "./pages/analyticsDashboard/AnalyticsDashboard";

// Utility to check if token is expired
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode the token payload
    return payload.exp * 1000 < Date.now(); // Check if current time is past the expiration
  } catch (e) {
    console.error("Invalid token:", e);
    return true;
  }
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("token") !== null);
    };

    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (isTokenExpired(token)) {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      }
    };

    // Set interval to periodically check token validity
    const interval = setInterval(checkToken, 1000 * 30); // Check every minute

    // Add event listener for localStorage changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      clearInterval(interval); // Clear interval on unmount
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="App">
      <Toaster position="top-right" />

      {isLoggedIn ? (
        <div className="dashboard-container">
          <Sidebar setIsLoggedIn={setIsLoggedIn} />
          <div className="main-content">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/advertisements" element={<Advertisements />} />
              <Route path="/fertilizer" element={<Fertilizer />} />
              <Route path="/machinery" element={<Machinery />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/agro-chemicals" element={<AgroChemicals />} />
              <Route
                path="/planting-materials"
                element={<PlantingMaterials />}
              />
              <Route path="/analytics" element={<AnalyticsDashboard/>}/>
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
