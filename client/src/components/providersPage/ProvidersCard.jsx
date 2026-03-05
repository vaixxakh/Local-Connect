import { FaStar, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ProviderCard = ({ provider }) => {
  const {
    name,
    category,
    experience,
    rating,
    location,
    status,
    image,
    phone,
  } = provider;

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300">

      {/* TOP SECTION */}
      <div className="flex items-center gap-4 mb-4">

        <img
          src={image || "https://via.placeholder.com/80"}
          alt={name}
          className="w-16 h-16 rounded-full object-cover border"
        />

        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {name}
          </h3>

          <p className="text-sm text-gray-500">
            {category}
          </p>

          {/* ONLINE STATUS */}
          <div className="flex items-center gap-2 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${
                status === "Online"
                  ? "bg-green-500"
                  : "bg-gray-400"
              }`}
            ></span>
            <span className="text-xs text-gray-600">
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* EXPERIENCE & RATING */}
      <div className="bg-gray-100 rounded-xl p-4 flex justify-between mb-4">

        <div>
          <p className="text-xs text-gray-500 uppercase">
            Experience
          </p>
          <p className="font-semibold">
            {experience} Years
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase">
            Rating
          </p>
          <div className="flex items-center gap-1 font-semibold">
            <FaStar className="text-yellow-400" />
            {rating}
          </div>
        </div>

      </div>

      {/* LOCATION */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-5">
        <FaMapMarkerAlt className="text-gray-400" />
        {location}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-3">

        <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
          Profile
        </button>

        <a
          href={`tel:${phone || "100"}`}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition"
        >
          <FaPhoneAlt />
          Call Now
        </a>

      </div>

    </div>
  );
};

export default ProviderCard;