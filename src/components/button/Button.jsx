// src/components/Button.js

import React from "react";
import "./Button.css";

function Button({ icon: Icon, text, isOpen }) {
  return (
    <button className="sidebar-button">
      <Icon className="button-icon" />
      {isOpen && <span className="button-text">{text}</span>}
    </button>
  );
}

export default Button;
