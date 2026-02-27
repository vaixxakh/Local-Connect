import ServiceCard from "./ServiceCard";
import "./PopularServices.css";

import auto from "../../assets/service-card/riksha.png";
import electrician from "../../assets/service-card/electrician.png";
import plumber from "../../assets/service-card/plumber.jpg";
import carpenter from "../../assets/service-card/carpenter.jpg";
import doctor from "../../assets/service-card/doctor.avif";
import painter from "../../assets/service-card/painter.png"

const popularServices = [
  { title: "Auto Drivers", image: auto },
  { title: "Electricians", image: electrician },
  { title: "Plumbers", image: plumber },
  { title: "Carpenters", image: carpenter },
  { title: "Doctors", image: doctor },
  { title: "Painter", image: painter },
];

const PopularServices = () => {
  return (
    <section className="popular-section">
      <div className="popular-header">
        <h2>Popular Services</h2>
        <span className="view-all">View all →</span>
      </div>
    <div className="popular-wrapper">
      <div className="popular-grid">
        {[...popularServices, ...popularServices].map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            image={service.image}
          />
        ))}
         </div>
    </div>
    </section>
  );
};

export default PopularServices;