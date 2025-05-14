import React, { useState } from "react";
import CandidateDashboardSlider from "./CandidateDashboardSlider"; // adjust the path if needed

const CandidateJobCards = () => {
  const [tags, setTags] = useState([
    "D3.js",
    "JavaScript",
    "Data Analysis",
    "SVG",
  ]);
  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const handleCardClick = () => setIsSliderOpen(true);
  const handleCloseSlider = () => setIsSliderOpen(false);

  return (
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="flex flex-wrap p-6 gap-4">
        {[1, 2].map((_, index) => (
          <div
            key={index}
            onClick={handleCardClick}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 transition-all duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer w-full sm:w-[48%]"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Data Visualization Developer
            </h2>
            <p className="text-sm text-gray-500 mb-1">DataViz Corp</p>
            <p className="text-sm text-gray-400 mb-4">Posted 2 weeks ago</p>
            <p className="text-gray-800 mb-4">
              Looking for a talented developer to create interactive data
              visualizations.
            </p>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-600 text-sm font-medium px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <CandidateDashboardSlider
        isOpen={isSliderOpen}
        onClose={handleCloseSlider}
      />
    </div>
  );
};

export default CandidateJobCards;
