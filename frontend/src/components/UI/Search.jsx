import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ placeholder = "Search books...", onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center max-w-lg w-full mb-10 mx-auto bg-white border border-gray-300 rounded-full shadow-sm px-4 py-2"
    >
      <FiSearch className="text-gray-500 text-xl mr-2" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 focus:outline-none text-sm text-gray-700 bg-transparent"
      />
      <button
        type="submit"
        className="ml-2 px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
