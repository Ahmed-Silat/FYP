import React from "react";
import { FiSearch } from "react-icons/fi";

const Searchbar = ({ placeholder }) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 text-lg" />
      <input
        type="text"
        placeholder={placeholder || "Search..."}
        value={searchTerm}
        onChange={handleSearch}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-gray-700 cursor-pointer"
      />
    </div>
  );
};

export default Searchbar;
