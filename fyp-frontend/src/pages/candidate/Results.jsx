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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        {/* Greeting */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Hi, Candidate Name!
          </h2>
          <p className="text-sm text-gray-500">Here are your job results 👇</p>
        </div>

        {/* Search + Sort controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Searchbar />
          <TableSort options={sortOptions} />
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <CandidateResultsTable />
      </div>
    </div>
  );
};

export default Results;
