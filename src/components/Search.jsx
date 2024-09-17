import React, { useState } from "react";
import axios from "axios";

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://cms.samespace.com/items/songs/search?query=${query}`
      );
      onSearchResults(response.data.songs);
    } catch (error) {
      console.error("Error fetching songs", error);
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for songs or artists"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
