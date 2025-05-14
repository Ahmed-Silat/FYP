import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineCalendar } from "react-icons/hi";
import DeleteModal from "./DeleteModal"; // Import the DeleteModal

const HrJobCards = ({ onEditJob }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const jobData = [
    {
      id: 1,
      title: "Frontend Developer",
      postedOn: "May 10, 2023",
      description: "We are looking for a skilled Frontend Developer...",
      tags: ["React", "TypeScript", "CSS"],
      questions: [
        "What is your experience with React?",
        "How do you handle state management?",
        "Describe your CSS methodology",
      ],
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      postedOn: "May 5, 2023",
      description: "Join our team as a Full Stack Engineer...",
      tags: ["React", "Node.js", "MongoDB"],
      questions: [
        "Explain your full-stack experience",
        "How do you optimize API performance?",
        "Describe a challenging bug you fixed",
      ],
    },
  ];

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting job:", jobToDelete);
    // Here you would typically delete the job from your state/API
    setIsDeleteModalOpen(false);
    setJobToDelete(null);
  };

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the "${jobToDelete?.title}" position? This action cannot be undone.`}
      />

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
                  onClick={() => onEditJob(job)}
                />
                <MdDeleteOutline
                  className="hover:text-red-600 cursor-pointer"
                  size={20}
                  onClick={() => handleDeleteClick(job)}
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
    </>
  );
};

export default HrJobCards;
