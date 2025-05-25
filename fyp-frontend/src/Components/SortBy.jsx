import React, { useState } from "react";
import { BiSortAlt2 } from "react-icons/bi";

const SortBy = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Oldest first");

  const options = ["Newest first", "Oldest first"];

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-black bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 cursor-pointer"
      >
        <BiSortAlt2 className="mr-2 text-lg" />
        <span>Sort by: {selected}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-lg bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortBy;
