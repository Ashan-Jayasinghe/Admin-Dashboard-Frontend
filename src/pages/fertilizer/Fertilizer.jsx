import React, { useState, useEffect } from "react";
import axios from "axios";
import AdvertisementCard from "../../components/advertisementCard/AdvertisementCard"; // Import AdvertisementCard component
import SearchBar from "../../components/searchbar/SearchBar"; // Import the SearchBar component
import "./Fertilizer.css"; // Import the CSS file for styling

const Fertilizer = () => {
  // State for fertilizer advertisements data
  const [fertilizerAds, setFertilizerAds] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [searchTerm, setSearchTerm] = useState(""); // Search term state

  // Fetch fertilizer advertisements on component mount
  useEffect(() => {
    const fetchFertilizerAds = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You must be logged in to view fertilizer advertisements.");
          setLoading(false);
          return;
        }

        // API call to fetch fertilizer advertisements
        const response = await axios.get(
          "http://localhost:5001/api/advertisements/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { category: "fertilizer" }, // Filter by fertilizer category
          }
        );
console.log(response.data)
        setFertilizerAds(response.data.data); // Set the fetched ads
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to fetch fertilizer advertisements.");
        setLoading(false);
      }
    };

    fetchFertilizerAds(); // Fetch data when component mounts
  }, []);

  // Filter advertisements based on search term
  const filteredFertilizerAds = fertilizerAds.filter((ad) =>
    ad.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading-message">Loading fertilizers...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="fertilizer-container">
      <h1>Fertilizer Advertisements</h1>
      <p>Here you can view fertilizer advertisements.</p>

      {/* Search Bar Component */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Displaying advertisements as cards */}
      <div className="fertilizer-list">
        {filteredFertilizerAds.length === 0 ? (
          <div className="no-results">No fertilizer ads found.</div>
        ) : (
          filteredFertilizerAds.map((ad) => (
            <AdvertisementCard key={ad.advertisement_id} ad={ad} />
          ))
        )}
      </div>
    </div>
  );
};

export default Fertilizer;
