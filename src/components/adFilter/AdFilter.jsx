import React from "react";
import "./AdFilter.css"; // Import the stylesheet for AdFilter component

const AdFilter = ({
  categoryFilter,
  setCategoryFilter,
  subcategoryFilter,
  setSubcategoryFilter,
  statusFilter,
  setStatusFilter,
  addressFilter,
  setAddressFilter,
  categories,
  subcategories,
}) => {
  // Function to clear all filters
  const clearFilters = () => {
    setCategoryFilter("");
    setSubcategoryFilter("");
    setStatusFilter("");
    setAddressFilter("");
  };

  return (
    <div className="ad-filter-container">
      {/* Category Filter */}
      <div className="filter-item">
        <label className="filter-label">Category</label>
        <select
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setSubcategoryFilter(""); // Reset subcategory filter when category changes
          }}
          className="filter-select"
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Filter */}
      {categoryFilter && (
        <div className="filter-item">
          <label className="filter-label">Subcategory</label>
          <select
            value={subcategoryFilter}
            onChange={(e) => setSubcategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory, index) => (
              <option key={index} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Status Filter */}
      <div className="filter-item">
        <label className="filter-label">Status</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Address Filter */}
      <div className="filter-item">
        <label className="filter-label">Address</label>
        <input
          type="text"
          value={addressFilter}
          onChange={(e) => setAddressFilter(e.target.value)}
          placeholder="Search by address"
          className="filter-input"
        />
      </div>

      {/* Clear Filters Button */}
      <div className="filter-item">
        <button className="clear-filter-btn" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default AdFilter;
