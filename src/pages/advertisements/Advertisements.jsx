import React, { useState, useEffect } from "react";
import axios from "axios";
import AdvertisementCard from "../../components/advertisementCard/AdvertisementCard"; // Import the AdvertisementCard component
import "./Advertisements.css"; // Import the CSS file

const Advertisements = () => {
  // State to hold advertisements data
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to track error state

  // Fetch advertisements when the component mounts
  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

        if (!token) {
          setError("You must be logged in to view advertisements.");
          setLoading(false);
          return;
        }

        // Send GET request to fetch advertisements with Authorization header
        const response = await axios.get(
          "http://localhost:5001/api/advertisements/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAdvertisements(response.data.data); // Set the fetched advertisements in state
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to fetch advertisements");
        setLoading(false); // Stop loading
      }
    };

    fetchAdvertisements(); // Call the function to fetch data
  }, []);

  if (loading) {
    return <div className="loading-message">Loading advertisements...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="advertisements-container">
      <h1>Advertisements</h1>
      <p>Here you can manage all advertisements.</p>

      <div className="advertisements-list">
        {advertisements.map((ad) => (
          <AdvertisementCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
};

export default Advertisements;
