import React, { useState } from "react";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import EditHrModal from "./EditHrModal";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHr, setSelectedHr] = useState(null);

  const handleEdit = (hr) => {
    setSelectedHr(hr);
    setIsModalOpen(true);
  };

  const handleSave = (updatedData) => {
    setData(
      data.map((item) => (item.email === selectedHr.email ? updatedData : item))
    );
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
                    <button className="p-2 rounded-full hover:bg-red-100 cursor-pointer transition">
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
      {isModalOpen && (
        <EditHrModal
          hrData={selectedHr}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default AdminHrManagement;
