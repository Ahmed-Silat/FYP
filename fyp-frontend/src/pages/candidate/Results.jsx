import React from "react";
import CandidateResultsTable from "../../Components/CandidateResultsTable";

const Results = () => {

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full min-h-screen bg-gray-100">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        {/* Greeting Section */}
        <div>
          <h2 className="text-3xl font-bold text-blue-600">
            Your Application Activity
          </h2>
          <p className="mt-1 text-gray-500 text-sm md:text-base">
            Track your submitted responses and stay updated on your application
            status.
          </p>
        </div> 
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-lg p-5 md:p-8 overflow-x-auto">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Your Applications
          </h3>
          <p className="text-sm text-gray-500">
            Track the status of all your job applications
          </p>
        </div>

        <CandidateResultsTable />
      </div>
    </div>
  );
};

export default Results;
