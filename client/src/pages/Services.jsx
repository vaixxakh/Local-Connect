import { useEffect, useState } from "react";
import ServiceSearchBar from "../components/servicesPage/ServiceSearchBar";
import ServiceSidebar from "../components/servicesPage/ServiceSideBar";
import ServiceCard from "../components/popularService/ServiceCard";
import { fetchProviders } from "../service/providerService";
import "./Services.css";

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

      <ServiceSearchBar filters={filters} setFilters={setFilters} />

      <div className="flex gap-8 mt-6">

        <ServiceSidebar filters={filters} setFilters={setFilters} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
          {providers.map((provider) => (
            <ServiceCard key={provider._id} provider={provider} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProvidersPage;