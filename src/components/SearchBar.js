import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // navigate to new search results page with query
    navigate(`/search/${encodeURIComponent(query)}`);
    setQuery(""); // clear input
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-2">
      <form
        onSubmit={handleSubmit}
        className="flex items-center border rounded-full overflow-hidden shadow-sm bg-white"
      >
        <input
          type="text"
          placeholder="Search verses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-2 text-sm sm:text-base outline-none w-full"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-3 sm:px-4 py-2 text-sm sm:text-base hover:bg-orange-600 transition"
        >
          🔍
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
