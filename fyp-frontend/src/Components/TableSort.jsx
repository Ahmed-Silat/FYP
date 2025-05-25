import React from "react";
import { BiSortAlt2 } from "react-icons/bi";

const TableSort = ({ options = [], selectedValue, onChange, onToggleSort }) => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md w-fit">
      {/* Dropdown */}
      <select
        name="actions"
        id="tableSort"
        value={selectedValue}
        onChange={onChange}
        className="p-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
      >
        {options.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="cursor-pointer" // <-- doesn't affect all browsers but safe to include
          >
            {opt.label}
          </option>
        ))}
      </select>

      {/* Sort Button */}
      <button
        className="p-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition cursor-pointer"
        title="Toggle Sort Order"
        onClick={onToggleSort}
      >
        <BiSortAlt2 size={20} />
      </button>
    </div>
  );
};

export default TableSort;
