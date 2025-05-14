import React, { useState } from "react";
import Searchbar from "../../Components/Searchbar";
import { IoIosAdd } from "react-icons/io";
import HrJobCards from "../../Components/HrJobCards";
import CreateJobModal from "../../Components/CreateJobModal";

const HrDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="px-4 md:px-8 py-6 bg-gray-50">
      {/* Create Job Modal */}
      <CreateJobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Hi, <span className="text-blue-600">HR Manager!</span>
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Welcome back to your dashboard 👋
        </p>
      </div>

      {/* Controls: Search & Sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex-1">
          <Searchbar placeholder={"Search jobs..."} />
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition-colors duration-300 hover:cursor-pointer"
          >
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
