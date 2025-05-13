import React from "react";
import Searchbar from "../../Components/Searchbar";
import { IoIosAdd } from "react-icons/io";
import HrJobCards from "../../Components/HrJobCards";

const HrDashboard = () => {
  return (
    <div className="px-4 md:px-8 py-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Hi, <span className="text-blue-600">HR Manager!</span>
          </h2>
          <p className="text-sm text-gray-500">
            Welcome back to your dashboard
          </p>
        </div>

        <div className="w-full md:w-auto">
          <Searchbar />
        </div>

        <div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300">
            <IoIosAdd size={20} />
            Create Job
          </button>
        </div>
      </div>

      {/* Job Cards */}
      <div>
        <HrJobCards />
      </div>
    </div>
  );
};

export default HrDashboard;
