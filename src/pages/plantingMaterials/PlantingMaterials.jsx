import React, { useState, useEffect } from "react";
import axios from "axios";
import AdvertisementCard from "../../components/advertisementCard/AdvertisementCard"; // Import AdvertisementCard component
import SearchBar from "../../components/searchbar/SearchBar"; // Import the SearchBar component
import AdFilter from "../../components/adFilter/AdFilter"; // Import the AdFilter component
import "./PlantingMaterials.css"; // Import the CSS file for styling

const PlantingMaterials = () => {
  // State for planting materials advertisements data
  const [plantingMaterialsAds, setPlantingMaterialsAds] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // State for filter and search
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter
  const [subcategoryFilter, setSubcategoryFilter] = useState(""); // Subcategory filter
  const [statusFilter, setStatusFilter] = useState(""); // Status filter
  const [addressFilter, setAddressFilter] = useState(""); // Address filter

  // Categories and subcategories for the filter
  const categories = ["Planting Materials"]; // Example categories
  const subcategories = ["Seeds", "Seedlings", "Tubers"]; // Example subcategories

  // Fetch planting materials advertisements on component mount
  useEffect(() => {
    const fetchPlantingMaterialsAds = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError(
            "You must be logged in to view planting materials advertisements."
          );
          setLoading(false);
          return;
        }

        // API call to fetch planting materials advertisements
        const response = await axios.get(
          "http://localhost:5001/api/advertisements/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { category: "planting materials" }, // Filter by planting materials category
          }
        );
        console.log(response.data);
        setPlantingMaterialsAds(response.data.data); // Set the fetched ads
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to fetch planting materials advertisements.");
        setLoading(false);
      }
    };

    fetchPlantingMaterialsAds(); // Fetch data when component mounts
  }, []);

  // Compute status for each advertisement based on logic
  const computeStatus = (ad) => {
    if (ad.isExpired) return "expired";
    if (ad.is_active === 1) return "active";
    if (ad.is_active === 0) return "deactivated";
    return "unknown";
  };

  // Filter advertisements based on filters and search term
  const filteredPlantingMaterialsAds = plantingMaterialsAds.filter((ad) => {
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
    return <div className="loading-message">Loading planting materials...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="planting-materials-container">
      <h1>Planting Materials Advertisements</h1>
      <p>Here you can view planting materials advertisements.</p>

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
      <div className="planting-materials-list">
        {filteredPlantingMaterialsAds.length === 0 ? (
          <div className="no-results">No planting materials ads found.</div>
        ) : (
          filteredPlantingMaterialsAds.map((ad) => (
            <AdvertisementCard key={ad.advertisement_id} ad={ad} />
          ))
        )}
      </div>
    </div>
  );
};

export default PlantingMaterials;
