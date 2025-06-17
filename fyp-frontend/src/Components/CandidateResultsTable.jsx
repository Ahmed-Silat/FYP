import React, { useState, useEffect } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { getApplicationsByUserId } from "../service/CandidateApplicationService";
import CandidateResultsModal from "./CandidateResultsModal";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

const CandidateResultsTable = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userId = userData?.user?.id || userData?.id;

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (userId) {
          const data = await getApplicationsByUserId(userId);
          setApplications(data);
        } else {
          setError("User information not available. Please log in again.");
        }
      } catch (err) {
        console.error("Failed to fetch applications:", err);
        setError("Failed to load applications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [userId]);

  const handleViewClick = (result) => {
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedResult(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <h3 className="text-lg font-medium text-gray-900">
          No Applications Found
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          You haven't applied to any jobs yet. Start applying to see your
          applications here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="px-6 mt-6">
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100 text-gray-700 text-left uppercase">
              <tr>
                <th className="px-6 py-3">Job Title</th>
                <th className="px-6 py-3">Company Name</th>
                <th className="px-6 py-3">Applied Date</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((application, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {application.Job.job_title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {application.Job?.user?.company?.company_name ||
                      "Company not specified"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(application.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleViewClick(application)}
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
