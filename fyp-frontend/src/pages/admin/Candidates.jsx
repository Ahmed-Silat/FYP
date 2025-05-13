import React from "react";
import AdminCandidateManagement from "../../Components/AdminCandidateManagement";
import Searchbar from "../../Components/Searchbar";

const Candidates = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Hi, <span className="text-blue-600">Admin User!</span>
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Welcome to the candidate management dashboard
        </p>
      </div>

      {/* Searchbar */}
      <div className="mb-6">
        <Searchbar placeholder="Search candidates..." />
      </div>

      {/* Section Header */}
      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">
          Candidates
        </h3>
        <p className="text-sm text-gray-500">Manage candidates in the system</p>
      </div>

      {/* Candidate Management Table */}
      <div className="bg-white shadow-md rounded-xl p-4 md:p-6 overflow-x-auto">
        <AdminCandidateManagement />
      </div>
    </div>
  );
};

export default Candidates;
