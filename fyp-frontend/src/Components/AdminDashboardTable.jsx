import React, { useEffect, useState } from "react";
import { getJobApplicationCounts } from "../service/CandidateApplicationService"; // ✅ Adjust the path if needed

const AdminDashboardTable = () => {
  const [data, setData] = useState([]);

  // Helper function to format date as "Month Day, Year"
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobs = await getJobApplicationCounts();
        // console.log("Fetched job application data:", jobs);
        const formatted = jobs.map((job) => ({
          jobTitle: job.jobTitle,
          applicants: job.applicantCount,
          postedOn: formatDate(job.createdAt),
        }));
        setData(formatted);
      } catch (error) {
        console.error("Failed to fetch job application data:", error);
      }
    };

    fetchData();
  }, []);

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
