import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`search/${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto px-2">
      <form onSubmit={handleSubmit} className="relative flex text-gray-600">
        <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="h-5 w-5 text-gray-400 dark:text-gray-50"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search verses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 leading-5 placeholder:text-gray-500 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange focus:placeholder:text-gray-400 dark:bg-dark-100 dark:text-white dark:placeholder:text-gray-50 sm:text-sm"
        />
      </form>
    </div>
  );
};

export default SearchBar;






