import React from "react";
import Searchbar from "../../Components/Searchbar";
import CandidateResultsTable from "../../Components/CandidateResultsTable";
import TableSort from "../../Components/TableSort";

const Results = () => {
  const sortOptions = [
    { label: "Job Title", value: "jobTitle" },
    { label: "Company", value: "company" },
    { label: "Applied Date", value: "appliedDate" },
    { label: "Status", value: "status" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full min-h-screen bg-gray-100">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        {/* Greeting Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Hi, <span className="text-blue-600">Candidate Name!</span>
          </h2>
          <p className="mt-1 text-gray-500 text-sm md:text-base">
            Here are your job application results 👇
          </p>
        </div>

        {/* Search and Sort Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
          <Searchbar placeholder="Search applications..." />
          <TableSort options={sortOptions} />
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
