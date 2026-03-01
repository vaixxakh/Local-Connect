import "./Providers.css";
import SearchBar from "../components/SearchBar";
import FiltersSidebar from "../components/FilteredSideBar";
import ProviderCard from "../components/ProviderCard";

import electrician from "../assets/service-card/electrician.png";

const providers = [
  {
    name: "Dhinesh P.",
    category: "Electrician",
    experience: 8,
    rating: 4.5,
    location: "Kasaragod Town",
    status: "Online",
    image: electrician,
  },
];

const ProvidersPage = () => {
  return (
    <div className="providers-page">
      <SearchBar />
      <div className="providers-content">
        <FiltersSidebar />
        <div className="providers-grid">
          {providers.map((provider, index) => (
            <ProviderCard key={index} provider={provider} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default ProvidersPage;