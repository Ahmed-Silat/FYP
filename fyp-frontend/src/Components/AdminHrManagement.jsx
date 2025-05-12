import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const AdminHrManagement = () => {
  const data = [
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
  ];

  return (
    <div className="overflow-x-auto mx-4 my-6">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Company Name</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="py-3 px-6">{item.name}</td>
              <td className="py-3 px-6">{item.email}</td>
              <td className="py-3 px-6">{item.company}</td>
              <td className="py-3 px-6">
                <div className="flex space-x-3">
                  <div className="p-2 rounded-full hover:bg-blue-100 cursor-pointer transition">
                    <FaRegEdit className="text-blue-600" />
                  </div>
                  <div className="p-2 rounded-full hover:bg-red-100 cursor-pointer transition">
                    <MdDeleteOutline className="text-red-600" />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHrManagement;
