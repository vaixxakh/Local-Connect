import "./Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="hero">
      

      <div className="hero-left">
        <h1 className="hero-title">
          Find Local Service <br />
          Providers Near You
        </h1>

        <p className="subtitle">
          Connect with trusted painters, carpenters, cleaners, and more in your local area.
          Professional services at your fingertips.
        </p>

        <div className="hero-buttons">
          <button
            onClick={() => navigate("/services")}
            className="btn-primary"
          >
            Find Services
            <svg viewBox="0 0 24 24" className="btn-icon">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => navigate("/become-provider")}
            className="btn-secondary"
          >
            Become a Provider
          </button>
        </div>
      </div>


      <div className="hero-right">
        <img
          src="https://images.unsplash.com/photo-1774977863604-59f4e6d37a90?q=85"
          alt="Service Provider"
        />
      </div>

    </section>
  );
};

export default Hero;