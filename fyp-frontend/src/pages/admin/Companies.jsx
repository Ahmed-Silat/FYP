import React, { useState } from "react";
import AdminCompanyManagement from "../../Components/AdminCompanyManagement";
import { FaPlus } from "react-icons/fa";

const Companies = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="p-4 w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-600">Manage Companies</h2>
          <p className="text-sm text-gray-500 mt-1">
            View, search, and add companies.
          </p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm hover:cursor-pointer">
          <FaPlus className="text-xs" />
          Add Company
        </button>
      </div>

      {/* Search Input */}
      <div className="w-full sm:w-1/2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Company..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
        />
      </div>

      {/* Company Management List */}
      <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
        <AdminCompanyManagement search={search} />
      </div>
    </div>
  );
};

export default Companies;
