import React, { useState, useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";

const HrResponsesModal = ({ candidate, onClose }) => {
  const modalRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState("In Review");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!candidate) return null;

  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Shortlist":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "Reject":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    console.log("Status changed to:", status);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {candidate.name}'s Application
            </h2>
            <p className="text-gray-600 mt-1">
              {candidate.jobTitle} - Submitted on {candidate.date}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition p-1 cursor-pointer"
            aria-label="Close modal"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Candidate Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Candidate Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500">Name</h4>
                <p className="mt-1 text-gray-900">{candidate.name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-500">Email</h4>
                <p className="mt-1 text-gray-900">{candidate.email}</p>
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <h3 className="text-sm font-medium text-gray-500">Overall Score</h3>
            <p className={`mt-2 text-4xl font-bold ${getScoreColor(candidate.score)}`}>
              {candidate.score}/100
            </p>
            <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`${getScoreColor(candidate.score).replace("text", "bg")} h-full`}
                style={{ width: `${candidate.score}%` }}
              ></div>
            </div>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Status</h3>
            <div className="flex flex-wrap gap-3">
              {["In Review", "Shortlist", "Reject"].map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition cursor-pointer ${getStatusColor(
                    status
                  )} ${
                    selectedStatus === status
                      ? "ring-2 ring-offset-2 ring-gray-400"
                      : ""
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HrResponsesModal;
