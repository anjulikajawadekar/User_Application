import React, { useState } from "react";
import { useDispatch } from "react-redux";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    setQuery(e.target.value);
    // Dispatch a filter action here
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search users by name or email"
      className="p-2 border rounded w-full"
    />
  );
};

export default SearchBar;
