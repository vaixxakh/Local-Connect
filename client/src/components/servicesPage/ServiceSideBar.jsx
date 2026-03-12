
import { FaStar } from "react-icons/fa";

const categories = [
  { name: "Auto Mechanic", count: 12 },
  { name: "Electrician", count: 8 },
  { name: "Plumber", count: 5 },
  { name: "Carpenter", count: 4 },
];

const ProvidersSidebar = ({ filters, setFilters }) => {
  return (
    <div className="w-72 bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="font-semibold text-gray-800">
            Available Now
          </h3>
          <p className="text-xs text-gray-400">
            Only show active pros
          </p>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.available}
            onChange={() =>
              setFilters({
                ...filters,
                available: !filters.available,
              })
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 transition"></div>
          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-5"></div>
        </label>
      </div>

      <hr className="my-6" />

      <h4 className="text-sm font-semibold text-gray-500 mb-4 uppercase">
        Categories
      </h4>

      <div className="space-y-4">

        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center justify-between cursor-pointer"
            onClick={() =>
              setFilters({
                ...filters,
                category:
                  filters.category === cat.name
                    ? ""
                    : cat.name,
              })
            }
          >
            <div className="flex items-center gap-3">

              {/* GREEN DOT RADIO */}
              <div
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
                  ${
                    filters.category === cat.name
                      ? "border-green-600"
                      : "border-gray-300"
                  }`}
              >
                {filters.category === cat.name && (
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                )}
              </div>

              <span
                className={`text-sm ${
                  filters.category === cat.name
                    ? "text-green-600 font-medium"
                    : "text-gray-700"
                }`}
              >
                {cat.name}
              </span>

            </div>

            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-500">
              {cat.count}
            </span>
          </div>
        ))}

      </div>

      <hr className="my-6" />

      {/* RATING */}
      <h4 className="text-sm font-semibold text-gray-500 mb-4 uppercase">
        Rating
      </h4>

      <div className="space-y-4">

        {/* 5 STAR */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() =>
            setFilters({
              ...filters,
              rating:
                filters.rating === 5 ? "" : 5,
            })
          }
        >
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
              ${
                filters.rating === 5
                  ? "border-green-600"
                  : "border-gray-300"
              }`}
          >
            {filters.rating === 5 && (
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            )}
          </div>

          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <span className="text-sm text-gray-700">
            5.0
          </span>
        </div>

        {/* 4 & UP */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() =>
            setFilters({
              ...filters,
              rating:
                filters.rating === 4 ? "" : 4,
            })
          }
        >
          <div
            className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
              ${
                filters.rating === 4
                  ? "border-green-600"
                  : "border-gray-300"
              }`}
          >
            {filters.rating === 4 && (
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            )}
          </div>

          <div className="flex items-center gap-1 text-yellow-400">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>

          <span className="text-sm text-gray-700">
            & Up
          </span>
        </div>

      </div>

    </div>
  );
};

export default ProvidersSidebar;