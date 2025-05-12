import React from "react";
import { MdDashboard } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className="flex flex-col justify-between items-center bg-gray-900 text-white h-screen w-20 md:w-60 p-4 shadow-lg">
      {/* Top section with menu items */}
      <div className="flex flex-col gap-6 w-full">
        {/* Dashboard */}
        <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-all">
          <MdDashboard size={24} />
          <span className="hidden md:inline">Dashboard</span>
        </div>

        {/* Results */}
        <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-all">
          <FaRegFileAlt size={22} />
          <span className="hidden md:inline">Results</span>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition-all">
          <CiSettings size={24} />
          <span className="hidden md:inline">Profile</span>
        </div>
      </div>

      {/* Bottom logout button */}
      <div className="w-full">
        <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-red-600 cursor-pointer transition-all">
          <IoIosLogOut size={24} />
          <span className="hidden md:inline">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
