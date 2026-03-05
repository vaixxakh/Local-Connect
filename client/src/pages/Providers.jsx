import { useEffect, useState } from "react";
import ProvidersSearchBar from "../components/providersPage/ProvidersSearchBar";
import ProvidersSidebar from "../components/providersPage/ProvidersSideBar";
import ProviderCard from "../components/providersPage/ProvidersCard";
import { fetchProviders } from "../service/providerService";
import "./Providers.css";

const ProvidersPage = () => {
  const [providers, setProviders] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: "",
    rating: "",
    available: false,
  });

  useEffect(() => {
    const loadProviders = async () => {
      const data = await fetchProviders(filters);
      setProviders(data);
    };

    loadProviders();
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <ProvidersSearchBar filters={filters} setFilters={setFilters} />

      <div className="flex gap-8 mt-6">

        <ProvidersSidebar filters={filters} setFilters={setFilters} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {providers.map((provider) => (
            <ProviderCard key={provider._id} provider={provider} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProvidersPage;