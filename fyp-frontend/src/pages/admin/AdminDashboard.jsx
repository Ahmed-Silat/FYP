import React from "react";
import InfoCard from "../../Components/InfoCard";
import { FaUsers } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div>
      <div>
        <h2>Hi, Admin User!</h2>
      </div>

      <div>
        <InfoCard title={"Total Candidates"} value={"126"} icon={FaUsers} />
      </div>
    </div>
  );
};

export default AdminDashboard;
