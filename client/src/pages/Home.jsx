
import Hero from "../components/Hero";
import PopularServices from "../components/popularService/PopularServices";
import  TopRated from "../components/TopRated/TopRated.jsx";
import HowItWorks from "../components/HowItsWork.jsx";

const Home = () => {
  return (
    <>
      
      <Hero />
      <HowItWorks />
      <PopularServices />
      <TopRated/>
      
    </>
  );
};

export default Home;