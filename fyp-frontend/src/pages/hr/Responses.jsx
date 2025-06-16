import React from "react";
import HrResponsesTable from "../../Components/HrResponsesTable";

const Responses = () => {

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-blue-600">
          Candidate Responses
        </h2>
        <p className="mt-1 text-gray-500 text-sm md:text-base">
          Track, review, and evaluate candidate video submissions.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 w-full overflow-x-auto">
        {/* Section Header */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Candidate Responses
          </h3>
          <p className="text-sm text-gray-500">
            Review and manage video responses submitted by candidates
          </p>
        </div>

        {/* Data Table */}
        <HrResponsesTable />
      </div>
    </div>
  );
};

export default Responses;
