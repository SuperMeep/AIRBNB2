import React, { useState } from "react";

function SearchFilter({ onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="searchField">
      <input
        className="searchBar"
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default SearchFilter;
