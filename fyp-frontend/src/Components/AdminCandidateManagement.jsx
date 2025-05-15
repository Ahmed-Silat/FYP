import React, { useState } from "react";
import { MdOutlineRemoveRedEye, MdDeleteOutline } from "react-icons/md";
import DeleteModal from "./DeleteModal"; // Adjust path as needed

const AdminCandidateManagement = () => {
  const [candidates, setCandidates] = useState([
    {
      name: "Michael Johnson",
      email: "michael.j@example.com",
      jobs: 2,
    },
    {
      name: "David Martinez",
      email: "david.m@example.com",
      jobs: 0,
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      jobs: 3,
    },
  ]);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const handleDeleteClick = (candidate) => {
    setSelectedCandidate(candidate);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setCandidates(
      candidates.filter((c) => c.email !== selectedCandidate.email)
    );
    setDeleteModalOpen(false);
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-100 text-left text-gray-600 uppercase">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Applied Jobs</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-700">
            {candidates.map((candidate, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4">{candidate.name}</td>
                <td className="px-6 py-4">{candidate.email}</td>
                <td className="px-6 py-4">{candidate.jobs}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-3">
                    <button className="p-2 rounded-full hover:bg-blue-100 cursor-pointer transition">
                      <MdOutlineRemoveRedEye className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(candidate)}
                      className="p-2 rounded-full hover:bg-red-100 cursor-pointer transition"
                    >
                      <MdDeleteOutline className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          message={`This will permanently remove this candidate from the system and delete all their application data. This action cannot be undone.`}
        />
      )}
    </div>
  );
};

export default AdminCandidateManagement;
