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
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
          Hi, <span className="text-blue-600">HR Manager!</span>
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-1">
          Welcome back to your dashboard
        </p>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <Searchbar />
        <TableSort options={sortOptions} />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 overflow-x-auto">
        <HrResponsesTable />
      </div>
    </div>
  );
};

export default Responses;
