import React from "react";

const CandidateJobCards = () => {
  const [tags, setTags] = React.useState([
    "D3.js",
    "JavaScript",
    "Data Analysis",
    "SVG",
  ]);

  return (
    // <div className="flex flex-row items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-gray-100 min-h-screen w-full">
      <div className="flex flex-row p-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border mr-3 border-gray-200 transition-all duration-800 hover:shadow-lg hover:scale-[1.01] cursor-pointer">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Data Visualization Developer
          </h2>

          <p className="text-sm text-gray-500 mb-1">DataViz Corp</p>
          <p className="text-sm text-gray-400 mb-4">Posted 2 weeks ago</p>

          <p className="text-gray-800 mb-4">
            Looking for a talented developer to create interactive data
            visualizations for our business intelligence platform.
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

        <div className="bg-white rounded-lg shadow-md p-6 mb-6 border mr-3 border-gray-200 transition-all duration-800 hover:shadow-lg hover:scale-[1.01] cursor-pointer">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Data Visualization Developer
          </h2>

          <p className="text-sm text-gray-500 mb-1">DataViz Corp</p>
          <p className="text-sm text-gray-400 mb-4">Posted 2 weeks ago</p>

          <p className="text-gray-800 mb-4">
            Looking for a talented developer to create interactive data
            visualizations for our business intelligence platform.
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
      </div>
    </div>
    // </div>
  );
};

export default CandidateJobCards;
