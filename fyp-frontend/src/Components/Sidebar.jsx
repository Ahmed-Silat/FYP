import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { doSignOut } from "../firebase/auth";

const Sidebar = ({ links = [] }) => {
  const navigate = useNavigate();

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-4 p-2 rounded-lg transition-all cursor-pointer ${
      isActive ? "bg-gray-700" : "hover:bg-blue-700"
    }`;

  const handleLogout = async () => {
    try {
      await doSignOut(); // Call Firebase logout
      navigate("/login"); // Redirect to login page after logout
      // localStorage.removeItem("userData");
      // localStorage.removeItem("persist:root");
      localStorage.clear();
    } catch (error) {
      console.error("Logout error:", error);
      // Optionally show error to user
    }
  };

  return (
    <div className="flex flex-col justify-between items-center bg-gray-900 text-white h-screen w-20 md:w-60 p-4 shadow-lg">
      {/* Top section with menu items */}
      <div className="flex flex-col gap-6 w-full">
        {links.map((item, index) => (
          <NavLink key={index} to={item.to} className={linkClasses}>
            {item.icon}
            <span className="hidden md:inline">{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* Bottom logout button */}
      <div className="w-full">
        <div
          onClick={handleLogout}
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-red-600 cursor-pointer transition-all"
        >
          <IoIosLogOut size={24} />
          <span className="hidden md:inline">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
