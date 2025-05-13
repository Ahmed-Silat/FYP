import React from "react";
import HrResponsesTable from "../../Components/HrResponsesTable";
import Searchbar from "../../Components/Searchbar";
import TableSort from "../../Components/TableSort";

const Responses = () => {
  const sortOptions = [
    { label: "Job Title", value: "jobTitle" },
    { label: "Candidate Name", value: "candidateName" },
    { label: "Date", value: "date" },
    { label: "Score", value: "score" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen">
      {/* Welcome Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Welcome back, <span className="text-blue-600">HR Manager!</span>
        </h2>
        <p className="mt-1 text-gray-500 text-sm md:text-base">
          Here's a quick look at the latest candidate responses.
        </p>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
        <Searchbar placeholder="Search candidates..." />
        <TableSort options={sortOptions} />
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
