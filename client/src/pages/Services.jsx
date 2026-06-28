import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ServiceSearchBar from "../components/servicesPage/ServiceSearchBar";
import ServiceSidebar from "../components/servicesPage/ServiceSideBar";
import ProviderCard from "../components/servicesPage/ProviderCard";
import { fetchProviders } from "../service/providerService";
import { setSelectedProvider } from "../features/booking/bookingSlice";
import "./Services.css";

// Loading Skeleton Component
const ProviderSkeleton = () => (
  <div className="bg-white rounded-3xl border border-gray-100 p-6 space-y-4 shadow-sm animate-pulse">
    <div className="flex gap-4">
      <div className="w-16 h-16 rounded-2xl bg-gray-200 shrink-0" />
      <div className="flex-grow space-y-2">
        <div className="h-5 bg-gray-200 rounded-lg w-1/2" />
        <div className="h-4 bg-gray-200 rounded-lg w-1/3" />
      </div>
      <div className="w-16 h-8 bg-gray-200 rounded-xl" />
    </div>
    <div className="h-4 bg-gray-200 rounded-lg w-full" />
    <div className="h-4 bg-gray-200 rounded-lg w-5/6" />
    <div className="flex gap-2 pt-2">
      <div className="h-8 bg-gray-200 rounded-full w-20" />
      <div className="h-8 bg-gray-200 rounded-full w-24" />
    </div>
    <div className="h-px bg-gray-150 my-2" />
    <div className="flex justify-between items-center pt-2">
      <div className="h-4 bg-gray-200 rounded-lg w-24" />
      <div className="h-4 bg-gray-200 rounded-lg w-20" />
    </div>
    <div className="flex gap-3 pt-4">
      <div className="h-12 bg-gray-200 rounded-xl flex-grow" />
      <div className="h-12 bg-gray-200 rounded-xl w-28" />
    </div>
  </div>
);

const ServiceProviders = ({ service }) => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // States for search and filter options
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: service || "",
    rating: "",
    available: false,
  });

  // Fetch all providers on component mount
  useEffect(() => {
    const loadProviders = async () => {
      setLoading(true);
      try {
        const res = await fetchProviders();
        setProviders(res.data || []);
      } catch (error) {
        console.error("Failed to load providers:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProviders();
  }, []);

  // Compute dynamic category list & counts from the master providers array
  const categories = useMemo(() => {
    const counts = {};
    providers.forEach((p) => {
      if (p.service) {
        counts[p.service] = (counts[p.service] || 0) + 1;
      }
    });
    return Object.keys(counts).map((name) => ({
      name,
      count: counts[name],
    }));
  }, [providers]);

  // Combined Filtering Engine using useMemo
  const filteredProviders = useMemo(() => {
    return providers.filter((p) => {
      // 1. Text Search query (matches Provider Name, Category, Pincode, City, Area, or Skills)
      const searchQuery = filters.search.trim().toLowerCase();
      const searchMatch =
        !searchQuery ||
        p.name?.toLowerCase().includes(searchQuery) ||
        p.service?.toLowerCase().includes(searchQuery) ||
        p.city?.toLowerCase().includes(searchQuery) ||
        p.area?.toLowerCase().includes(searchQuery) ||
        p.pincode?.includes(searchQuery) ||
        p.skills?.some((s) => s.toLowerCase().includes(searchQuery));

      // 2. Category Match
      const categoryMatch = !filters.category || p.service === filters.category;

      // 3. Location Select Match (dropdown from search bar)
      const locationMatch =
        !filters.location ||
        p.city?.toLowerCase().includes(filters.location.toLowerCase()) ||
        p.area?.toLowerCase().includes(filters.location.toLowerCase()) ||
        p.district?.toLowerCase().includes(filters.location.toLowerCase());

      // 4. Availability Toggle (Available Only)
      const availabilityMatch = !filters.available || p.status === "online";

      // 5. Minimum Rating Select Match
      const ratingMatch =
        !filters.rating || p.rating >= parseFloat(filters.rating);

      return searchMatch && categoryMatch && locationMatch && availabilityMatch && ratingMatch;
    });
  }, [providers, filters]);

  const handleBookNow = (provider) => {
    // Prevent booking if provider is not online/available
    if (provider.status !== "online") return;

    dispatch(setSelectedProvider(provider));
    navigate(`/bookings/${provider._id}`);
  };

  const handleViewProfile = (provider) => {
    // Navigate to profile details or a profile modal if supported
    navigate(`/profile`, { state: { providerId: provider._id } });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-[Figtree]">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Title Section */}
        <div className="text-center sm:text-left space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight font-[Outfit]">
            Explore Local Experts
          </h1>
          <p className="text-slate-500 text-lg">
            Find the most reliable and highly rated service providers in Kasaragod.
          </p>
        </div>

        {/* Real-time Search bar */}
        <ServiceSearchBar filters={filters} setFilters={setFilters} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 sticky top-24">
            <ServiceSidebar 
              filters={filters} 
              setFilters={setFilters} 
              dynamicCategories={categories}
            />
          </div>

          {/* Providers Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              // Loading skeletons display
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <ProviderSkeleton key={i} />
                ))}
              </div>
            ) : filteredProviders.length > 0 ? (
              // Filtered providers display
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300">
                {filteredProviders.map((provider) => (
                  <ProviderCard
                    key={provider._id}
                    provider={provider}
                    user={user || {}}
                    onBookNow={handleBookNow}
                    onViewProfile={handleViewProfile}
                  />
                ))}
              </div>
            ) : (
              // Empty State Illustration & Message
              <div className="bg-white rounded-3xl border border-dashed border-slate-200 py-20 px-8 text-center max-w-lg mx-auto space-y-6">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-800 font-[Outfit]">No service providers found</h3>
                  <p className="text-slate-500 max-w-sm mx-auto text-sm">
                    We couldn't find any experts matching your filters. Try modifying your search term or selection.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setFilters({
                      search: "",
                      location: "",
                      category: "",
                      rating: "",
                      available: false,
                    })
                  }
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-2.5 rounded-xl transition shadow-sm text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServiceProviders;