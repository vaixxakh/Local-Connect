import "./TopRated.css";
import { FaStar } from "react-icons/fa";

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
    <section className="top-rated-section">
      <div className="top-rated-left text-3xl sm:text-4xl font-semibold text-[#1A1A1A] text-center mb-16 tracking-tight font-[Outfit]">
        <h2>Top Rated Categories</h2>

        <div className="company-grid">
          {companies.map((company, index) => (
            <div className="company-card" key={index}>
              
            
              <div className="company-image">
                <img src={company.image} alt={company.name} />
              </div>

           
              <div className="company-info">
                <h3>{company.name}</h3>
                <p className="category">{company.category}</p>
                <p className="location">{company.location}</p>

                <div className="rating">
                  <FaStar className="star-icon" />
                  {company.rating}
                  <span> ({company.reviews} reviews)</span>
                </div>
              </div>

              <button className="book-btn">Book Now</button>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="top-rated-right">
        <div className="emergency-card">
          <h3>Emergency Help</h3>
          <p>Need urgent assistance?</p>

          <div className="emergency-item">
            🚑 Ambulance: <strong>108</strong>
          </div>
          <div className="emergency-item">
            👮 Police: <strong>100</strong>
          </div>
          <div className="emergency-item">
            🔥 Fire: <strong>101</strong>
          </div>

          <button className="emergency-btn">
            Call Now
          </button>
        </div>
      </div> */}
    </section>
  );
};

export default TopRatedSection;