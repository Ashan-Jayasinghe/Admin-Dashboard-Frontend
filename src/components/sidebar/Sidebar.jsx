import React, { useState } from "react";
import "./Sidebar.css";
import Button from "../button/Button";
import Avatar from "../avatar/Avatar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

import {
  FaHome,
  FaAd,
  FaLeaf,
  FaCog,
  FaUsers,
  FaChartBar,
  FaTools,
  FaBars,
  FaSignOutAlt, // Logout icon
} from "react-icons/fa";
import { FaSeedling } from "react-icons/fa";
import { FaSprayCan } from "react-icons/fa";

function Sidebar({ setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const userName = "John Doe";
  const profileImage = "profile.jpg"; // Replace with actual path
  const navigate = useNavigate(); // For programmatic navigation

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.status === "success") {
        localStorage.removeItem("token");
        toast.success("Logged out successfully");
        setIsLoggedIn(false); // Update login status
        navigate("/login"); // Redirect to login page
      } else {
        toast.error("Error logging out");
      }
    } catch (error) {
      console.error("Error during logout", error);
      toast.error("An error occurred while logging out");
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <h2 className="app-title">{isOpen ? "Govi Nena Admin" : "GN"}</h2>

      <Avatar className="profile-section" image={profileImage} name={userName} isOpen={isOpen} />

      <ul>
        <li>
          <Button icon={FaHome} text="Home" isOpen={isOpen} />
        </li>
        <li>
          <Button icon={FaAd} text="All Advertisements" isOpen={isOpen} />
        </li>
        <li>
          <Button icon={FaLeaf} text="Fertilizer" isOpen={isOpen} />
        </li>
        <li>
          <Button icon={FaTools} text="Machinery" isOpen={isOpen} />
        </li>
        <li>
          <Button icon={FaSeedling} text="Planting Materials" isOpen={isOpen} />
        </li>
        <li>
          <Button icon={FaSprayCan} text="Agro Chemicals" isOpen={isOpen} />
        </li>
        <li>
          <Button icon={FaChartBar} text="Reports" isOpen={isOpen} />
        </li>
        <li>
          <Button icon={FaUsers} text="All Users" isOpen={isOpen} />
        </li>
        <li>
          <Button icon={FaCog} text="Settings" isOpen={isOpen} />
        </li>
      </ul>

      {/* Logout Button */}
      <div className="logout-section">
        <button className="sidebar-button" onClick={handleLogout}>
          <span className="button-icon">
            <FaSignOutAlt />
          </span>
          <span className="button-text">{isOpen ? "Logout" : ""}</span>
        </button>
      </div>
    </div>
  );
}
export default Sidebar;
