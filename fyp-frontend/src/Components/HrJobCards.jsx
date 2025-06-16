import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineCalendar } from "react-icons/hi";
import DeleteModal from "./DeleteModal";

const HrJobCards = ({ jobs, onEditJob, onDeleteJob }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const handleDeleteClick = (job) => {
    setJobToDelete(job);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    onDeleteJob(jobToDelete.id);
    setIsDeleteModalOpen(false);
    setJobToDelete(null);
  };

  return (
    <>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete the "${jobToDelete?.job_title}" position? This action cannot be undone.`}
      />

      <div className="flex flex-col md:flex-row flex-wrap gap-6 p-4">
        {jobs.length === 0 ? (
          <p className="text-gray-600 text-center w-full">
            No jobs available. Create one!
          </p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="w-full md:w-[40%] group bg-white rounded-2xl border border-gray-100 p-6 shadow-md hover:shadow-2xl hover:-translate-y-[2px] transition-all duration-500 ease-in-out"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-500">
                    {job.job_title || "Untitled Position"}
                  </h2>
                  {job.createdAt && (
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <HiOutlineCalendar className="mr-1" />
                      Posted on {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                  )}
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

              <p className="text-sm text-gray-700 leading-relaxed mb-5">
                {job.job_description || "No description provided"}
              </p>

              <div className="flex flex-wrap gap-2">
                {Array.isArray(job.skills) && job.skills.length > 0 ? (
                  job.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors duration-500"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-xs">
                    No skills specified
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default HrJobCards;
