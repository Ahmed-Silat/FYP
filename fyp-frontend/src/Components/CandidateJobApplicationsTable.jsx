import React from "react";

const CandidateJobApplicationsTable = () => {
  const applications = [
    {
      id: 1,
      jobTitle: "Frontend Developer",
      company: "Tech Solutions Inc.",
      date: "15/05/2023",
      status: "Under Review",
    },
    {
      id: 2,
      jobTitle: "Full Stack Developer",
      company: "Digital Innovations",
      date: "12/05/2023",
      status: "Interview Scheduled",
    },
    {
      id: 3,
      jobTitle: "UI/UX Designer",
      company: "Creative Labs",
      date: "05/05/2023",
      status: "Rejected",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Under Review":
        return "bg-blue-100 text-blue-800";
      case "Interview Scheduled":
        return "bg-purple-100 text-purple-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Job Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 cursor-pointer">
          {applications.map((application) => (
            <tr key={application.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {application.jobTitle}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {application.company}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {application.date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                    application.status
                  )}`}
                >
                  {application.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidateJobApplicationsTable;
