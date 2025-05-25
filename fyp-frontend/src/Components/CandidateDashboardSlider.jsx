import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import InterviewModal from "./InterviewModal"; // Make sure to import your InterviewModal component

const CandidateDashboardSlider = ({ isOpen, onClose }) => {
  const [showInterviewModal, setShowInterviewModal] = useState(false);
  const [jobDetails] = useState({
    title: "Data Visualization Developer",
    questions: [
      "Tell us about your experience with data visualization libraries.",
      "How would you optimize a dashboard rendering large datasets?",
      "Describe a challenging data visualization problem you solved.",
    ],
  });

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
    onClose(); // Close the slider when opening the interview modal
  };

  const handleInterviewComplete = () => {
    setShowInterviewModal(false);
    // You might want to show a toast notification here
  };

  return (
    <>
      {/* Overlay with conditional rendering and transition */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-80" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-50 shadow-xl overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            {jobDetails.title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition-colors hover:cursor-pointer"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="text-sm text-gray-600">DataViz Corp</div>
          <div className="text-xs text-gray-400">Posted 2 weeks ago</div>

          <div>
            <h3 className="font-medium text-gray-700">Description</h3>
            <p className="text-gray-600 mt-1 text-sm">
              Looking for a talented developer to create interactive data
              visualizations for our business intelligence platform.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {["JavaScript", "D3.js", "React", "Data Analysis"].map(
                (skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-700 font-semibold text-xs px-3 py-1 rounded-full cursor-pointer"
                  >
                    {skill}
                  </span>
                )
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

      {/* Interview Modal */}
      {showInterviewModal && (
        <InterviewModal
          jobTitle={jobDetails.title}
          questions={jobDetails.questions}
          onComplete={handleInterviewComplete}
          onClose={() => setShowInterviewModal(false)}
        />
      )}
    </>
  );
};

export default CandidateDashboardSlider;
