import React, { useEffect } from "react";
import CandidateJobApplicationsTable from "./CandidateJobApplicationsTable";
import { IoClose } from "react-icons/io5";

const AdminCandidateModal = ({ candidate, onClose }) => {
  // Close modal when pressing ESC key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Close modal when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!candidate) return null;

  return (
    <div
      className="fixed inset-0 bg-black opacity-80 flex items-center justify-center p-4 z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {candidate.name}
            </h2>
            <p className="text-gray-600">{candidate.email}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="bg-blue-50 p-4 rounded-lg inline-block">
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold text-blue-800">
                  Applied Jobs
                </h3>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {candidate.jobs}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Job Applications
            </h3>
            <CandidateJobApplicationsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCandidateModal;
