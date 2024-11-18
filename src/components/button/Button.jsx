// src/components/Button.js

import React from "react";
import "./Button.css";
import { useNavigate } from "react-router-dom";

function Button({ icon: Icon, text, isOpen }) {
  const navigate = useNavigate();

  const handleClick = () => {
    switch (text) {
      case "Home":
        navigate("/home");
        break;
        case "Analytics":
          navigate("/analytics");
          break;
      case "All Advertisements":
        navigate("/advertisements");
        break;
      case "Fertilizer":
        navigate("/fertilizer");
        break;
      case "Machinery":
        navigate("/machinery");
        break;
      case "Reports":
        navigate("/reports");
        break;
      case "All Users":
        navigate("/users");
        break;
      case "Planting Materials":
        navigate("/planting-materials");
        break;
      case "Agro Chemicals":
        navigate("/agro-chemicals");
        break;
      case "Settings":
        navigate("/settings");
        break;
      default:
        break;
    }
  };

  return (
    <button className="sidebar-button" onClick={handleClick}>
      <Icon className="button-icon" />
      {isOpen && <span className="button-text">{text}</span>}
    </button>
  );
}

export default Button;
