import React, { useState, useEffect } from "react";
import axios from "axios";
import AdvertisementCard from "../../components/advertisementCard/AdvertisementCard"; // Import the AdvertisementCard component
import SearchBar from "../../components/searchbar/SearchBar"; // Import the SearchBar component
import AdFilter from "../../components/adFilter/AdFilter"; // Import the AdFilter component
import "./Advertisements.css"; // Import the CSS file

const Advertisements = () => {
  // State to hold advertisements data
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(null); // State to track error state
  const [searchTerm, setSearchTerm] = useState(""); // State to track the search term
  const [filteredAds, setFilteredAds] = useState([]); // State to hold filtered advertisements

  // Filter states for category, subcategory, status, and address
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [addressFilter, setAddressFilter] = useState("");

  // State to hold all categories and subcategories
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

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
        setFilteredAds(response.data.data); // Initialize filtered ads
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to fetch advertisements");
        setLoading(false); // Stop loading
      }
    };

    fetchAdvertisements(); // Call the function to fetch data
  }, []);

  // Compute status for each advertisement based on logic
  const computeStatus = (ad) => {
    if (ad.isExpired) return "expired";
    if (ad.is_active === 1) return "active";
    if (ad.is_active === 0) return "deactivated";
    return "unknown";
  };

  // Fetch categories and subcategories from the advertisements
  useEffect(() => {
    const uniqueCategories = [
      ...new Set(advertisements.map((ad) => ad.category)),
    ];
    setCategories(uniqueCategories); // Set unique categories

    // Filter subcategories based on selected category
    const filteredSubcategories = advertisements
      .filter((ad) => ad.category === categoryFilter)
      .map((ad) => ad.subcategory);
    setSubcategories([...new Set(filteredSubcategories)]); // Set unique subcategories for the selected category
  }, [advertisements, categoryFilter]);

  // Filter advertisements whenever the search term or filter criteria changes
  useEffect(() => {
    const filtered = advertisements.filter((ad) => {
      const status = computeStatus(ad); // Compute status dynamically

      const matchesSearch =
        ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ad.subcategory.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "" || ad.category === categoryFilter;
      const matchesSubcategory =
        subcategoryFilter === "" || ad.subcategory === subcategoryFilter;
      const matchesStatus = statusFilter ? status === statusFilter : true;
      const matchesAddress =
        addressFilter === "" ||
        ad.address.toLowerCase().includes(addressFilter.toLowerCase());

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubcategory &&
        matchesStatus &&
        matchesAddress
      );
    });

    setFilteredAds(filtered); // Update filtered ads
  }, [
    searchTerm,
    categoryFilter,
    subcategoryFilter,
    statusFilter,
    addressFilter,
    advertisements,
  ]);

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

      {/* Search Bar Component */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Filter Options */}
      <AdFilter
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        subcategoryFilter={subcategoryFilter}
        setSubcategoryFilter={setSubcategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        addressFilter={addressFilter}
        setAddressFilter={setAddressFilter}
        categories={categories} // Pass the categories
        subcategories={subcategories} // Pass the filtered subcategories
      />

      {/* Displaying filtered advertisements */}
      <div className="advertisements-list">
        {filteredAds.length === 0 ? (
          <div className="no-results">No advertisements found</div>
        ) : (
          filteredAds.map((ad) => (
            <AdvertisementCard key={ad.advertisement_id} ad={ad} />
          ))
        )}
      </div>
    </div>
  );
};

export default Advertisements;
