import "./FilteredSidebar.css";

const FiltersSidebar = () => {
  return (
    <div className="filters-sidebar">

      <h4>Available Now</h4>

      <div className="filter-section">
        <h5>CATEGORIES</h5>
        <label><input type="radio" name="cat" /> Auto Mechanic</label>
        <label><input type="radio" name="cat" /> Electrician</label>
        <label><input type="radio" name="cat" /> Plumber</label>
        <label><input type="radio" name="cat" /> Carpenter</label>
      </div>

      <div className="filter-section">
        <h5>RATING</h5>
        <label><input type="radio" name="rating" /> 5.0</label>
        <label><input type="radio" name="rating" /> 4.0 & Up</label>
      </div>

    </div>
  );
};

export default FiltersSidebar;