import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import CandidateResultsModal from "./CandidateResultsModal";

const data = [
  {
    title: "Frontend Developer",
    company: "Creative Studios",
    status: "Pending",
    date: "18/05/2023",
  },
  {
    title: "DevOps Engineer",
    company: "Cloud Systems",
    status: "Rejected",
    date: "15/05/2023",
  },
  {
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    status: "Accepted",
    date: "10/05/2023",
    score: "92/100",
    feedback:
      "Great technical skills and cultural fit. We'd like to move forward with an offer.",
  },
];

const getStatusBadge = (status) => {
  const base = "px-3 py-1 rounded-full text-xs font-semibold";
  switch (status) {
    case "Pending":
      return `${base} bg-yellow-100 text-yellow-800`;
    case "Rejected":
      return `${base} bg-red-100 text-red-700`;
    case "Accepted":
      return `${base} bg-green-100 text-green-700`;
    default:
      return base;
  }
};

const CandidateResultsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const handleViewClick = (result) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResult(null);
  };

  return (
    <>
      <div className="px-6 mt-6">
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700 text-left uppercase">
              <tr>
                <th className="px-6 py-3">Job Title</th>
                <th className="px-6 py-3">Company</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Applied Date</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.map((job, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">{job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(job.status)}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{job.date}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleViewClick(job)}
                      className="text-blue-500 hover:text-blue-700 hover:bg-blue-100 p-2 rounded-full transition cursor-pointer"
                      title="View"
                    >
                      <MdOutlineRemoveRedEye size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CandidateResultsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedResult={selectedResult}
      />
    </>
  );
};

export default CandidateResultsTable;
