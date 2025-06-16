import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import InterviewModal from "./InterviewModal";

const CandidateDashboardSlider = ({ isOpen, onClose, jobDetails }) => {
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleApplyNow = () => {
    setShowInterviewModal(true);
    // onClose(); 
  };

  const handleInterviewComplete = () => {
    setShowInterviewModal(false);
  };

  if (!jobDetails) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-80" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-50 shadow-xl overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {jobDetails.job_title || "Untitled Position"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors hover:cursor-pointer"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="text-sm text-gray-600">
            {jobDetails.user.company.company_name || "Company not specified"}
          </div>
          <div className="text-xs text-gray-400">
            Posted {jobDetails.createdAt ? new Date(jobDetails.createdAt).toLocaleDateString() : "Date not available"}
          </div>

          <div>
            <h3 className="font-medium text-gray-700">Description</h3>
            <p className="text-gray-600 mt-1 text-sm">
              {jobDetails.job_description || "No description provided"}
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {Array.isArray(jobDetails.skills) && jobDetails.skills.length > 0 ? (
                jobDetails.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-700 font-semibold text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400 text-xs">No skills specified</span>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleApplyNow}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      {showInterviewModal && (
  <InterviewModal
    jobTitle={jobDetails.job_title}
    questions={jobDetails.questions || []}
    onComplete={() => {
      handleInterviewComplete();
      onClose(); // Close both modal and slider when interview is complete
    }}
    onClose={() => setShowInterviewModal(false)} // Just close the modal
  />
)}
    </>
  );
};

export default CandidateDashboardSlider;