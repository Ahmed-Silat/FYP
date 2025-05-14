import React from "react";
import AdminHrManagement from "../../Components/AdminHrManagement";
import Searchbar from "../../Components/Searchbar";
import { IoIosAdd } from "react-icons/io";

const HRManagement = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Management Table Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-600">
          HR Management
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Manage roles, edit profiles, and oversee HR operations.
        </p>
      </div>

      {/* Searchbar and Add HR Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <Searchbar placeholder={"Search HR members..."}/>
        <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
          <IoIosAdd size={20} />
          Add HR
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white shadow-md rounded-xl p-4 md:p-6 overflow-x-auto">
        <AdminHrManagement />
      </div>
    </div>
  );
};

export default HRManagement;
