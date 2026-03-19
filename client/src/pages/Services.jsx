import { useEffect, useState } from "react";
import ServiceSearchBar from "../components/servicesPage/ServiceSearchBar";
import ServiceSidebar from "../components/servicesPage/ServiceSideBar";
import { fetchProviders } from "../service/providerService";
import "./Services.css";
import ProviderCard from "../components/servicesPage/ProviderCard";

const ServiceProviders = ({ service }) => {
const [providers, setProviders] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    location: "",
    category: service || "",
    rating: "",
    available: false,
  });

  useEffect(() => {
    const loadProviders = async () => {
      const res = await fetchProviders(service);
      setProviders(res.data || []);
    };

    loadProviders();
  }, [service]);

  return (
     <div className="min-h-screen bg-gray-100 p-8">
      <ServiceSearchBar filters={filters} setFilters={setFilters} />

      <div className="flex gap-8 mt-6">
        <ServiceSidebar filters={filters} setFilters={setFilters} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {providers.map((provider) => (
            <ProviderCard key={provider._id} provider={provider} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviders;