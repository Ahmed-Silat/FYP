import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import EditHrModal from "./EditHrModal";
import DeleteModal from "./DeleteModal";

const AdminHrManagement = () => {
  const [data, setData] = useState([
    {
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      company: "VentureDive",
    },
    {
      name: "Rimsha Ajmal",
      email: "rimsha@gmail.com",
      company: "Search Globe",
    },
    {
      name: "Ahmed Silat",
      email: "ahmed@gmail.com",
      company: "Search Globe",
    },
  ]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedHr, setSelectedHr] = useState(null);

  const handleEdit = (hr) => {
    setSelectedHr(hr);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (hr) => {
    setSelectedHr(hr);
    setDeleteModalOpen(true);
  };

  const handleSave = (updatedData) => {
    setData(
      data.map((item) => (item.email === selectedHr.email ? updatedData : item))
    );
  };

  const handleDeleteConfirm = () => {
    setData(data.filter((item) => item.email !== selectedHr.email));
    setDeleteModalOpen(false);
  };

  return (
    <>
      <div className="overflow-x-auto mx-4 my-6">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          {/* Table Head */}
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Company Name</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-800 text-sm">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6">{item.email}</td>
                <td className="py-3 px-6">{item.company}</td>
                <td className="py-3 px-6">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-full hover:bg-blue-100 cursor-pointer transition"
                    >
                      <FaRegEdit className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item)}
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

      {/* Edit Modal */}
      {editModalOpen && (
        <EditHrModal
          hrData={selectedHr}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSave}
        />
      )}

      {/* Delete Modal */}
      {deleteModalOpen && (
        <DeleteModal
          isOpen={deleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          message={`This will permanently remove this HR member from the system. This action cannot be undone.`}
        />
      )}
    </>
  );
};

export default AdminHrManagement;
