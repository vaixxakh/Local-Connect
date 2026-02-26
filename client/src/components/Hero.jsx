import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">

      <div className="hero-left">
        <p className="live-tag">● LIVE IN KASARAGOD</p>

        <h1 >
          Find Trusted Local <br />
          <span>Services Near You</span>
        </h1>

        <p className="subtitle">
          Connect with verified electricians, auto drivers, doctors,
          and more instantly.
        </p>

        <div className="search-box">
          <input type="text" placeholder="Service (e.g., Plumber)" />
          <input type="text" placeholder="Location" />
          <button>Search</button>
        </div>

        <div className="popular">
          Popular:
          <span> Electrician</span>
          <span> Doctor</span>
          <span> Auto</span>
        </div>
      </div>

      <div className="hero-right">
        <img
          src="https://i.imgur.com/9q6qZ0P.png"
          alt="Local Service"
        />
      </div>

    </section>
  );
};

export default Hero;