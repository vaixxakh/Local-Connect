import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <div className="search-bar">

      <div className="search-input">
        <FiSearch />
        <input
          type="text"
          placeholder="Search for experts (e.g Electrician in Bekal)"
        />
      </div>

      <div className="search-actions">
        <button className="location-btn">Kasaragod Dist.</button>
        <button className="sort-btn">Recommended</button>
      </div>

    </div>
  );
};

export default SearchBar;