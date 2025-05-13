import React from "react";
import { BiSortAlt2 } from "react-icons/bi";

const TableSort = () => {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-md w-fit">
      {/* Dropdown */}
      <select
        name="actions"
        id="tableSort"
        className="p-2 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="jobTitle">Job Title</option>
        <option value="company">Company</option>
        <option value="status">Status</option>
        <option value="date">Applied Date</option>
      </select>

      {/* Sort Button */}
      <button
        className="p-2 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200 transition"
        title="Toggle Sort Order"
      >
        <BiSortAlt2 size={20} />
      </button>
    </div>
  );
};

export default TableSort;
