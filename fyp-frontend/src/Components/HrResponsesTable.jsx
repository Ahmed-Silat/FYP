import React from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const HrResponsesTable = () => {
  const data = [
    {
      jobTitle: "Frontend Developer",
      name: "John Doe",
      email: "john.doe@example.com",
      score: 82,
      date: "20/05/2023",
    },
    {
      jobTitle: "Full Stack Engineer",
      name: "Michael Johnson",
      email: "michael.j@example.com",
      score: 75,
      date: "18/05/2023",
    },
    {
      jobTitle: "DevOps Engineer",
      name: "Robert Brown",
      email: "robert.b@example.com",
      score: 62,
      date: "16/05/2023",
    },
  ];

  const getScoreStyles = (score) => {
    if (score >= 80) return "bg-green-100 text-green-700";
    if (score >= 70) return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="overflow-x-auto mx-4 my-6">
      <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
          <tr>
            <th className="py-3 px-6 text-left">Job Title</th>
            <th className="py-3 px-6 text-left">Candidate Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Score</th>
            <th className="py-3 px-6 text-left">Date</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-800 text-sm">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="py-3 px-6">{item.jobTitle}</td>
              <td className="py-3 px-6">{item.name}</td>
              <td className="py-3 px-6">{item.email}</td>
              <td className="py-3 px-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getScoreStyles(
                    item.score
                  )}`}
                >
                  {item.score}/100
                </span>
              </td>
              <td className="py-3 px-6">{item.date}</td>
              <td className="py-3 px-6">
                <div className="inline-block rounded-full hover:bg-blue-100 p-2 cursor-pointer transition">
                  <MdOutlineRemoveRedEye size={20} className="text-gray-700" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HrResponsesTable;
