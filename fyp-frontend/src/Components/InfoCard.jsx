import React from "react";

const InfoCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 md:p-6 flex items-center justify-between w-full max-w-sm mx-auto 
                    hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out">
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
      </div>
      <div className="text-blue-600 bg-blue-100 rounded-full p-3">
        {Icon && <Icon className="text-xl" />}
      </div>
    </div>
  );
};

export default InfoCard;
