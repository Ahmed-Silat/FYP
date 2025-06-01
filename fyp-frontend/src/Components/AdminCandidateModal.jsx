import React, { useEffect } from "react";
import CandidateJobApplicationsTable from "./CandidateJobApplicationsTable";
import { IoClose } from "react-icons/io5";

const AdminCandidateModal = ({ candidate, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!candidate) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-80 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4 overflow-y-auto">
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {candidate.name}
              </h2>
              <p className="text-gray-600">{candidate.email}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
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
    </>
  );
};

export default AdminCandidateModal;
