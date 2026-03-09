import "./Hero.css";
import heroImage from "../assets/hero-image/heroImage.png";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="hero flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20">

      <div className="hero-left lg:w-1/2 space-y-6">

        <p className="live-tag">
          <span className="live-dot"></span>
          LIVE IN KASARAGOD
        </p>
        <h1 className="hero-title">
          Find Trusted Local <br />
          <span>Services Near You</span>
        </h1>

        <p className="subtitle">
          Connect with verified electricians, auto drivers, doctors,
          and more instantly. Your community's best professionals in
          Kasaragod, just a click away.
        </p>

        <div className="search-box">

          <div className="search-input">
            <FaSearch className="icon" />
            <input
              type="text"
              placeholder="Service (e.g. Plumber)"
            />
          </div>

          <div className="location-input">
            <FaMapMarkerAlt color="#399363bb" className="icon" />

            <select>
              <option>Kasaragod</option>
              <option>Kannur</option>
              <option>Kozhikode</option>
            </select>

          </div>

          <button className="search-btn">
            Search
          </button>

        </div>

        <div className="popular">

          Popular:

          <span>Electrician</span>
          <span>Doctor</span>
          <span>Auto</span>

        </div>

      </div>

      <div className="hero-right lg:w-1/2">

        <img
          src={heroImage}
          alt="Local Services"
        />

      </div>

    </section>
  );
};

export default Hero;