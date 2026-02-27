import "./PopularServices.css";

const ServiceCard = ({ title, image }) => {
  return (
    <div className="service-card">
      <img src={image} alt={title} />
      <div className="overlay">
        <span>{title}</span>
      </div>
    </div>
  );
};

export default ServiceCard;