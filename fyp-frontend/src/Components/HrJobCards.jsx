import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineCalendar } from "react-icons/hi";

const HrJobCards = () => {
  const jobData = [
    {
      title: "Frontend Developer",
      postedOn: "May 10, 2023",
      description:
        "We are looking for a skilled Frontend Developer with experience in React and TypeScript to join our growing team. Strong CSS knowledge is a plus.",
      tags: ["React", "TypeScript", "CSS"],
    },
    {
      title: "Full Stack Engineer",
      postedOn: "May 5, 2023",
      description:
        "Join our team as a Full Stack Engineer working on our flagship product. You will be responsible for both frontend and backend development.",
      tags: ["React", "TypeScript", "CSS"],
    },
  ];

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-6 p-4">
      {jobData.map((job, idx) => (
        <div
          key={idx}
          className="w-full md:w-[40%] group bg-white rounded-2xl border border-gray-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-[2px] transition-all duration-500 ease-in-out cursor-pointer"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-500">
                {job.title}
              </h2>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <HiOutlineCalendar className="mr-1" />
                Posted on {job.postedOn}
              </div>
            </div>
            <div className="flex gap-3 text-gray-600">
              <FaRegEdit
                className="hover:text-blue-600 cursor-pointer"
                size={18}
              />
              <MdDeleteOutline
                className="hover:text-red-600 cursor-pointer"
                size={20}
              />
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 leading-relaxed mb-5">
            {job.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors duration-500"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HrJobCards;
