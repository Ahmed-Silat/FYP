import React from "react";

const AdminDashboardTable = () => {
  const data = [
    {
      jobTitle: "Frontend Developer",
      postedOn: "May 10, 2025",
      applicants: 18,
    },
    {
      jobTitle: "UI/UX Designer",
      postedOn: "May 8, 2025",
      applicants: 11,
    },
  ];

  return (
    <div className="overflow-x-auto mx-4 my-6">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="p-3">Job Title</th>
            <th className="p-3">Posted On</th>
            <th className="p-3">Applicants</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm text-center">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="py-3 px-6">{item.jobTitle}</td>
              <td className="py-3 px-6">{item.postedOn}</td>
              <td className="py-3 px-6">{item.applicants}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboardTable;
