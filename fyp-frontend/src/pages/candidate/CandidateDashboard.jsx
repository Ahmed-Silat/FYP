import React from "react";
import CandidateJobCards from "../../Components/CandidateJobCards";

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

        {/* Job Cards */}
        <div>
          <CandidateJobCards />
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
