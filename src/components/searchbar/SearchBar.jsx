import React, { useState } from "react";
import { useDebounce } from "use-debounce"; // Import useDebounce hook
import './SearchBar.css'; // Import your styles

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [input, setInput] = useState(searchTerm); // Local state to handle input field
  const [debouncedInput] = useDebounce(input, 500); // Debounced value with 500ms delay

  // Handle input change
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Sync the debounced input with the parent component's search term
  React.useEffect(() => {
    setSearchTerm(debouncedInput);
  }, [debouncedInput, setSearchTerm]);

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        value={input}
        onChange={handleInputChange}
        placeholder="Search advertisements"
      />
      {input && (
        <button className="clear-search" onClick={() => setInput("")}>
          Clear
        </button>
      )}
    </div>
  );
};

export default SearchBar;
