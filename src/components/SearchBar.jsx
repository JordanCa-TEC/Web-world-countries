import React from "react";

const SearchBar = ({ value = "", onChange = () => {} }) => {
  return (
    <input
      type="text"
      placeholder="Buscar país..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search-bar"
    />
  );
};

export default SearchBar;
