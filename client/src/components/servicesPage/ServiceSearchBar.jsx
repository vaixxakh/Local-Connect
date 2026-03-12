import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import "./ServiceSearchBar.css";
const ProvidersSearchBar = ({ filters, setFilters }) => {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="flex items-center justify-between bg-white rounded-full shadow-sm border border-gray-200 px-5 py-3 w-full max-w-3xl">
        <div className="flex items-center gap-3 flex-1">

          <FaSearch className="text-gray-400 text-sm" />

          <input
            type="text"
            placeholder="Search for experts (e.g. Electrician in Bekal)"
            value={filters.search}
            onChange={(e) =>
              setFilters({ ...filters, search: e.target.value })
            }
            className="outline-none border-none w-full text-sm"
          />
        </div>
        
        <div className="flex items-center gap-2 border-l pl-4 ml-4">

          <FaMapMarkerAlt className="text-green-600 text-sm" />

          <select
            value={filters.location}
            onChange={(e) =>
              setFilters({ ...filters, location: e.target.value })
            }
            className="outline-none text-sm bg-transparent cursor-pointer"
          >
            <option value="">Kasaragod </option>
            <option value="Nileswaram">Nileswaram</option>
            <option value="Bekal">Bekal</option>
            <option value="Kanhangad">Kanhangad</option>
          </select>
        </div>
      </div>

      <select
        value={filters.rating}
        onChange={(e) =>
          setFilters({ ...filters, rating: e.target.value })
        }
        className="recommended bg-white border border-gray-200 rounded-full px-8 py-3 text-sm shadow-sm cursor-pointer"
      >
        <option value="">Recommended</option>
        <option value="5">Top Rated (5.0)</option>
        <option value="4.5">4.5 & Up</option>
        <option value="4">4.0 & Up</option>
      </select>

    </div>
  );
};

export default ProvidersSearchBar;