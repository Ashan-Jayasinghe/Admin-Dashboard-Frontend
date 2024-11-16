import React, { useState, useEffect } from "react";
import axios from "axios";
import AdvertisementCard from "../../components/advertisementCard/AdvertisementCard"; // Import AdvertisementCard component
import SearchBar from "../../components/searchbar/SearchBar"; // Import the SearchBar component
import AdFilter from "../../components/adFilter/AdFilter"; // Import the AdFilter component
import "./Fertilizer.css"; // Import the CSS file for styling

const Fertilizer = () => {
  // State for fertilizer advertisements data
  const [fertilizerAds, setFertilizerAds] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // State for filter and search
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter
  const [subcategoryFilter, setSubcategoryFilter] = useState(""); // Subcategory filter
  const [statusFilter, setStatusFilter] = useState(""); // Status filter
  const [addressFilter, setAddressFilter] = useState(""); // Address filter

  // Categories and subcategories for the filter
  const categories = ["Fertilizer"]; // Example categories
  const subcategories = ["Organic", "Inorganic"]; // Example subcategories

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
        console.log(response.data);
        setFertilizerAds(response.data.data); // Set the fetched ads
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to fetch fertilizer advertisements.");
        setLoading(false);
      }
    };

    fetchFertilizerAds(); // Fetch data when component mounts
  }, []);

  // Compute status for each advertisement based on logic
  const computeStatus = (ad) => {
    if (ad.isExpired) return "expired";
    if (ad.is_active === 1) return "active";
    if (ad.is_active === 0) return "deactivated";
    return "unknown";
  };

  // Filter advertisements based on filters and search term
  const filteredFertilizerAds = fertilizerAds.filter((ad) => {
    const status = computeStatus(ad); // Compute status dynamically

    const matchesCategory = categoryFilter
      ? ad.category === categoryFilter
      : true;
    const matchesSubcategory = subcategoryFilter
      ? ad.subcategory === subcategoryFilter
      : true;
    const matchesStatus = statusFilter ? status === statusFilter : true;
    const matchesAddress = addressFilter
      ? ad.address.toLowerCase().includes(addressFilter.toLowerCase())
      : true;
    const matchesSearchTerm = ad.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return (
      matchesCategory &&
      matchesSubcategory &&
      matchesStatus &&
      matchesAddress &&
      matchesSearchTerm
    );
  });

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

      {/* AdFilter Component */}
      <AdFilter
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        subcategoryFilter={subcategoryFilter}
        setSubcategoryFilter={setSubcategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        addressFilter={addressFilter}
        setAddressFilter={setAddressFilter}
        categories={categories}
        subcategories={subcategories}
      />

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
