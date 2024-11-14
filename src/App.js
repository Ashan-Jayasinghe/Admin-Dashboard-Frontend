import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import Advertisements from "./pages/advertisements/Advertisements";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import Users from "./pages/users/Users";
import Machinery from "./pages/machinery/Machinery";
import Fertilizer from "./pages/fertilizer/Fertilizer";
import Reports from "./pages/reports/Reports";
import AgroChemicals from "./pages/agroChemicals/AgroChemicals";
import PlantingMaterials from "./pages/plantingMaterials/PlantingMaterials";
function App() {
  return (
    <div className="App">
      <Sidebar />
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
          <Route path="/planting-materials" element={<PlantingMaterials />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
