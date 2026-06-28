import { FaSearch, FaMapMarkerAlt, FaStar, FaTimes } from "react-icons/fa";

const ProvidersSearchBar = ({ filters, setFilters }) => {
  const handleClearSearch = () => {
    setFilters((prev) => ({ ...prev, search: "" }));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center w-full font-[Figtree]">
      
      {/* Main Search Input & Location Box */}
      <div className="flex items-center flex-grow bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-200 hover:border-slate-350 focus-within:border-emerald-500 focus-within:ring-4 focus-within:ring-emerald-50 transition duration-200 px-4 py-2 w-full">
        
        {/* Search Input Icon & Field */}
        <div className="flex items-center gap-3 flex-grow min-w-0">
          <FaSearch className="text-slate-400 shrink-0 text-base" />
          <input
            type="text"
            placeholder="Search for providers, skills, categories, or keywords..."
            value={filters.search}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, search: e.target.value }))
            }
            className="outline-none border-none w-full text-sm text-slate-700 bg-transparent placeholder-slate-400"
          />
          {filters.search && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="text-slate-400 hover:text-slate-600 focus:outline-none transition p-1 hover:bg-slate-100 rounded-full"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
        </div>

        {/* Vertical Divider */}
        <div className="hidden sm:block h-6 w-px bg-slate-200 mx-4" />

        {/* Location Dropdown Selection */}
        <div className="flex items-center gap-2 shrink-0">
          <FaMapMarkerAlt className="text-emerald-500 text-base shrink-0" />
          <select
            value={filters.location}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, location: e.target.value }))
            }
            className="outline-none text-sm bg-transparent cursor-pointer font-medium text-slate-700 hover:text-emerald-600 transition"
          >
            <option value="">All Locations</option>
            <option value="Kasaragod">Kasaragod</option>
            <option value="Nileswaram">Nileswaram</option>
            <option value="Bekal">Bekal</option>
            <option value="Kanhangad">Kanhangad</option>
            <option value="Vidyanagar">Vidyanagar</option>
          </select>
        </div>

      </div>

      {/* Recommended Rating Filter Selector */}
      <div className="relative shrink-0 w-full sm:w-auto">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-yellow-500">
          <FaStar className="text-sm" />
        </div>
        <select
          value={filters.rating}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, rating: e.target.value }))
          }
          className="w-full sm:w-auto appearance-none bg-white border border-slate-200 hover:border-slate-350 focus:border-emerald-500 rounded-2xl pl-10 pr-10 py-3 text-sm font-semibold text-slate-700 shadow-sm cursor-pointer outline-none transition focus:ring-4 focus:ring-emerald-50"
        >
          <option value="">All Ratings</option>
          <option value="5">Top Rated (5.0)</option>
          <option value="4.5">4.5 & Up</option>
          <option value="4">4.0 & Up</option>
        </select>
        
        {/* Custom arrow decoration */}
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

    </div>
  );
};

export default ProvidersSearchBar;