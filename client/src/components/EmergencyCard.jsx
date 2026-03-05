import { FaPhoneAlt } from "react-icons/fa";
import "./EmergencyCard.css";

const EmergencyCard = ({ title, location }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">

      <h3 className="font-semibold text-gray-800">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mb-4">
        {location}
      </p>

      <div className="h-24 bg-gray-100 rounded-xl mb-4 flex items-center justify-center text-gray-300">
        Map Preview
      </div>

      <button className="bg-red-600 hover:bg-red-700 text-white w-full py-2 rounded-full flex items-center justify-center gap-2 text-sm transition">
        <FaPhoneAlt />
        Call Now
      </button>

    </div>
  );
};

export default EmergencyCard;