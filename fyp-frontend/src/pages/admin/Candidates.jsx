import React from "react";
import AdminCandidateManagement from "../../Components/AdminCandidateManagement";

const Candidates = () => {
  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-blue-600">
          Candidate Management
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          View candidate details and streamline application tracking.
        </p>
      </div>

      {/* Candidate Management Table */}
      <div className="bg-white shadow-md rounded-xl p-4 md:p-6 overflow-x-auto">
        <AdminCandidateManagement />
      </div>
    </div>
  );
};

export default Candidates;
