import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const CandidateResultsModal = ({ isOpen, onClose, selectedResult }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !selectedResult) return null;

  return (
    <>
      {/* Overlay - Fixed the z-index and added pointer-events-auto */}
      <div
        className="fixed inset-0 bg-black opacity-80 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto"
        onClick={onClose}
      />

      {/* Modal - Adjusted z-index to be higher than overlay */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none">
        <div
          className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start rounded-t-xl">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedResult.title}
              </h2>
              <p className="text-gray-600 mt-1">{selectedResult.company}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              aria-label="Close modal"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Status</p>
                <p className="mt-1 font-medium">
                  <span className={getStatusBadge(selectedResult.status)}>
                    {selectedResult.status}
                  </span>
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Applied On</p>
                <p className="mt-1 font-medium text-gray-800">
                  {selectedResult.date}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Your Score</p>
                <p className="mt-1 font-medium text-gray-800">92/100</p>
              </div>
            </div>

            {/* Feedback Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Feedback
              </h3>
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                <p className="text-gray-700">
                  Great technical skills and cultural fit. We'd like to move
                  forward with an offer.
                </p>
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Next Steps
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                    ✓
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      HR will contact you within 2 business days
                    </p>
                  </div>
                </div>
                {selectedResult.status === "Accepted" && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5">
                      ✓
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-700">
                        Offer letter will be sent to your email
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 rounded-b-xl">
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

// Reuse the same badge styling from the table
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

export default CandidateResultsModal;
