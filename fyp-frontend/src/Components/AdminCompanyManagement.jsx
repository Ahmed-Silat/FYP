import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import EditCompanyModal from "./EditCompanyModal"; // Optional: Your edit modal
import DeleteModal from "./DeleteModal"; // Reuse from HR component

const AdminCompanyManagement = () => {
  const [companies, setCompanies] = useState([
    { name: "Systems Limited" },
    { name: "VentureDive" },
    { name: "Search Globe" },
  ]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (company) => {
    setSelectedCompany(company);
    setDeleteModalOpen(true);
  };

  const handleSave = (updatedCompany) => {
    setCompanies(
      companies.map((item) =>
        item.name === selectedCompany.name ? updatedCompany : item
      )
    );
    setEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    setCompanies(
      companies.filter((item) => item.name !== selectedCompany.name)
    );
    setDeleteModalOpen(false);
  };

  return (
    <>
      <div className="overflow-x-auto mx-4 my-6">
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
          {/* Table Head */}
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="py-3 px-6 text-left">Company Name</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-gray-800 text-sm">
            {companies.map((company, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="py-3 px-6">{company.name}</td>
                <td className="py-3 px-6">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(company)}
                      className="p-2 rounded-full hover:bg-blue-100 transition hover:cursor-pointer"
                    >
                      <FaRegEdit className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(company)}
                      className="p-2 rounded-full hover:bg-red-100 transition hover:cursor-pointer"
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
        <EditCompanyModal
          companyData={selectedCompany}
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
          message={`This will permanently remove the company from the system. This action cannot be undone.`}
        />
      )}
    </>
  );
};

export default AdminCompanyManagement;
