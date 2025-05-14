import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const CandidateDashboardSlider = ({ isOpen, onClose }) => {
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

  // Don't return null when !isOpen - we need to keep the component mounted for the animation
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
            Data Visualization Developer
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
                    className="bg-gray-200 text-gray-700 font-semibold text-xs px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="pt-4">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateDashboardSlider;
