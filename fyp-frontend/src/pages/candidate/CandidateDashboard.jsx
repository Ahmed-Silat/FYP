import React from "react";
import Sidebar from "../../Components/Sidebar";
import CandidateJobCards from "../../Components/CandidateJobCards";
import Searchbar from "../../Components/Searchbar";
import SortBy from "../../Components/SortBy";

const CandidateDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Hi, <span className="text-blue-600">Candidate Name!</span>
          </h2>
          <p className="text-gray-500 text-sm mt-1">Welcome back 👋</p>
        </div>

        {/* Controls: Search & Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <Searchbar placeholder={"Search jobs..."} />
          </div>
          <div>
            <SortBy />
          </div>
        </div>

        {/* Job Cards */}
        <div>
          <CandidateJobCards />
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
