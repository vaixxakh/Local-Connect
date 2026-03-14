import React from "react";

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex items-center justify-between hover:shadow-lg transition">

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
      </div>

      <div className={`text-3xl ${color}`}>
        {icon}
      </div>

    </div>
  );
};

export default StatsCard;