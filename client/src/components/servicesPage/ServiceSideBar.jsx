import { FaStar, FaTimes } from "react-icons/fa";
import { Grid, Sparkles, Filter } from "lucide-react";

const ProvidersSidebar = ({ filters, setFilters, dynamicCategories = [] }) => {
  
  const handleCategorySelect = (categoryName) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category === categoryName ? "" : categoryName,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      location: "",
      category: "",
      rating: "",
      available: false,
    });
  };

  const hasActiveFilters = 
    filters.search || filters.location || filters.category || filters.rating || filters.available;

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 space-y-6 font-[Figtree]">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-slate-700" />
          <h3 className="font-bold text-slate-800 text-lg font-[Outfit]">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs text-emerald-600 hover:text-emerald-800 font-bold hover:underline transition"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Available Now Toggle Switch */}
      <div className="flex items-center justify-between py-1">
        <div className="space-y-0.5 pr-2">
          <h4 className="font-bold text-slate-700 text-sm">Available Only</h4>
          <p className="text-xs text-slate-400">Only show online professionals</p>
        </div>

        <label className="relative inline-flex items-center cursor-pointer shrink-0">
          <input
            type="checkbox"
            checked={filters.available}
            onChange={() =>
              setFilters((prev) => ({
                ...prev,
                available: !prev.available,
              }))
            }
            className="sr-only peer"
          />
          {/* Custom animated switch slider wrapper */}
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
        </label>
      </div>

      <hr className="border-slate-100" />

      {/* Category Select Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-400 uppercase tracking-wider text-xs font-semibold">
          <Grid className="w-4 h-4" />
          <span>Categories</span>
        </div>

        <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
          
          {/* All Categories Option */}
          <button
            type="button"
            onClick={() => setFilters((prev) => ({ ...prev, category: "" }))}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition font-medium ${
              !filters.category
                ? "bg-emerald-50 text-emerald-700 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <span>All Categories</span>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">all</span>
          </button>

          {/* Dynamic computed Categories */}
          {dynamicCategories.map((cat) => (
            <button
              type="button"
              key={cat.name}
              onClick={() => handleCategorySelect(cat.name)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition font-medium ${
                filters.category === cat.name
                  ? "bg-emerald-50 text-emerald-700 font-semibold"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <span className="truncate">{cat.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                filters.category === cat.name
                  ? "bg-emerald-200 text-emerald-800 font-bold"
                  : "bg-slate-100 text-slate-500"
              }`}>
                {cat.count}
              </span>
            </button>
          ))}

          {dynamicCategories.length === 0 && (
            <p className="text-xs text-slate-400 py-2">No categories found.</p>
          )}

        </div>
      </div>

      <hr className="border-slate-100" />

      {/* Ratings Filter Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-400 uppercase tracking-wider text-xs font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Minimum Rating</span>
        </div>

        <div className="space-y-2">
          
          {/* 5.0 Star Option */}
          <button
            type="button"
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                rating: prev.rating === "5" ? "" : "5",
              }))
            }
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left text-sm font-medium ${
              filters.rating === "5"
                ? "bg-emerald-50 text-emerald-700 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition shrink-0 ${
              filters.rating === "5" ? "border-emerald-600 bg-emerald-600" : "border-slate-350"
            }`}>
              {filters.rating === "5" && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
            </div>
            <div className="flex text-yellow-400 shrink-0 gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>
            <span className="text-xs text-slate-500">5.0</span>
          </button>

          {/* 4.0 Star & Up Option */}
          <button
            type="button"
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                rating: prev.rating === "4" ? "" : "4",
              }))
            }
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition text-left text-sm font-medium ${
              filters.rating === "4"
                ? "bg-emerald-50 text-emerald-700 font-semibold"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition shrink-0 ${
              filters.rating === "4" ? "border-emerald-600 bg-emerald-600" : "border-slate-350"
            }`}>
              {filters.rating === "4" && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
            </div>
            <div className="flex text-yellow-400 shrink-0 gap-0.5">
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} />
              ))}
              <FaStar className="text-slate-200" />
            </div>
            <span className="text-xs text-slate-500">4.0 & Up</span>
          </button>

        </div>
      </div>

    </div>
  );
};

export default ProvidersSidebar;