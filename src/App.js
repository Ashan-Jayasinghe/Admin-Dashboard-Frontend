import React from "react";
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
import { Toaster } from "react-hot-toast";

const App = () => {
  const isLoggedIn = localStorage.getItem("token"); // Check if user is logged in

  return (
    <div className="App">
      <Toaster position="top-right" />

      {/* Render the Sidebar and Main Content only for logged-in users */}
      {isLoggedIn ? (
        <div className="dashboard-container">
          <Sidebar /> {/* Sidebar is always visible */}
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
              <Route path="*" element={<Navigate to="/home" />} />{" "}
              {/* Redirect to home if route not found */}
            </Routes>
          </div>
        </div>
      ) : (
        // If not logged in, only show the login page
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />{" "}
          {/* Redirect any unknown routes to login */}
        </Routes>
      )}
    </div>
  );
};

export default App;
