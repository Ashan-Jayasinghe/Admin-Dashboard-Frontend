// src/components/Avatar.js

import React from 'react';
import './Avatar.css';

function Avatar({ image, name, isOpen }) {
  return (
    isOpen && (
      <div className="profile-section">
        <img src={image} alt="Profile" className="profile-image" />
        <p className="user-name">{name}</p>
      </div>
    )
  );
}

export default Avatar;