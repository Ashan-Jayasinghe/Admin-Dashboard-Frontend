import React from "react";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <h1>Welcome to the Dashboard</h1>
        <p>Your main content goes here.</p>
      </div>
    </div>
  );
}

export default App;
