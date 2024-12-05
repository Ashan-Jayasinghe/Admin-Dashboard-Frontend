import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import Button from "../button/Button";
import Avatar from "../avatar/Avatar";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaAd,
  FaLeaf,
  FaCog,
  FaUsers,
  FaChartBar,
  FaTools,
  FaBars,
  FaSignOutAlt,
  FaChartPie,
} from "react-icons/fa";
import { FaSeedling } from "react-icons/fa";
import { FaSprayCan } from "react-icons/fa";

function Sidebar({ setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(true);
  const [profileImage, setProfileImage] = useState(""); // State for profile image
  const [userName, setUserName] = useState(""); // State for user name
  const navigate = useNavigate();

  // Toggle sidebar open/closed
  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        const response = await axios.get(
          "http://localhost:5001/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "success") {
          setUserName(response.data.user.username);
          setProfileImage(response.data.user.image_url || "profile.jpg"); // Set default profile image if none exists
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load user data");
      }
    };

    fetchUserData();
  }, []);

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
        setIsLoggedIn(false);
        navigate("/login");
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

      <Avatar
        className="profile-section"
        image={profileImage}
        name={userName}
        isOpen={isOpen}
      />

      <ul>
        <li>
          <Button icon={FaHome} text="Home" isOpen={isOpen} />
        </li>
        <li>
          <Button icon={FaChartPie} text="Analytics" isOpen={isOpen} />
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
