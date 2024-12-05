import React from "react";
import "./Avatar.css";

function Avatar(props) {
  return (
    props.isOpen && (
      <div className="profile-section-avatar">
        <img src={props.image} alt="Profile" className="profile-image" />
        <p className="user-name">{props.name}</p>
      </div>
    )
  );
}

export default Avatar;
