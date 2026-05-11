import "./TopRated.css";
import { FaStar, FaMapPin } from "react-icons/fa";

import electricianImg from "../../assets/service-card/electrician.png";
import autoImg from "../../assets/service-card/riksha.png";
import doctorImg from "../../assets/service-card/doctor.avif";
import plumberImg from "../../assets/service-card/plumber.jpg";

const companies = [
  {
    name: "Kasaragod Electricals",
    category: "Electrician",
    rating: 4.8,
    reviews: 124,
    location: "Kasaragod Town",
    image: electricianImg,
  },
  {
    name: "City Auto Services",
    category: "Auto Driver",
    rating: 4.6,
    reviews: 89,
    location: "Vidyanagar",
    image: autoImg,
  },
  {
    name: "GreenLife Clinic",
    category: "Doctor",
    rating: 4.9,
    reviews: 210,
    location: "Cheruvathur",
    image: doctorImg,
  },
  {
    name: "Perfect Plumbing Co.",
    category: "Plumber",
    rating: 4.7,
    reviews: 150,
    location: "Uppala",
    image: plumberImg,
  },
];

const TopRatedSection = () => {
  return (
<section className="py-20 bg-white" data-testid="top-rated-section">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl sm:text-4xl font-semibold text-[#1A1A1A] text-center mb-16 tracking-tight"
      style={{ fontFamily: 'Outfit, sans-serif' }}>
      Top Rated Providers
    </h2>
    <div className="space-y-4">
      {companies.map((company, index) => (
        <div key={index}
          className="group bg-[#FAFAF8] rounded-2xl border border-black/5 hover:border-[#2ecc71]/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-5 p-5 sm:p-6">
            
          
            <div className="shrink-0">
              <img src={company.image} alt={company.name}
                className="w-20 h-20 rounded-full ring-[3px] ring-white shadow-md 
                  group-hover:ring-[#2ecc71]/30 transition-all" />
            </div>

            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-[#1A1A1A] truncate">{company.name}</h3>
              <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-medium rounded-full 
                bg-[#2ecc71]/10 text-[#1B7A42]">{company.category}</span>
              <div className="flex items-center gap-4 mt-2.5">
                <div className="flex items-center gap-1">
                  <FaStar className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold">{company.rating}</span>
                  <span className="text-xs text-[#6B7280]">({company.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-[#6B7280]">
                  <FaMapPin className="w-3.5 h-3.5" />
                  <span className="text-sm">{company.location}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 shrink-0">
             <button className="rounded-xl px-5 py-2.5 border border-gray-300 hover:bg-gray-100 transition">
              View Profile
            </button>
              <button className="rounded-xl px-5 py-2.5 bg-[#2ecc71] text-[#064E3B] hover:bg-[#27ae60] transition">
              Book Now
            </button>
            </div>

          </div>
        </div>
      ))}
    </div>
  </div>
</section>
  );
};

export default TopRatedSection;