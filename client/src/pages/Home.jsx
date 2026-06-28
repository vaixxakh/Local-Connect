
import Hero from "../components/Hero";
import PopularServices from "../components/popularService/PopularServices";
import  TopRated from "../components/TopRated/TopRated.jsx";
import HowItWorks from "../components/HowItsWork.jsx";
import BrowseAllService from "../components/BrowseAllService.jsx";

const Home = ({ onLoginClick }) => {
  return (
    <>
      
      <Hero onLoginClick={onLoginClick} />
      <HowItWorks />
      <PopularServices />
      <TopRated/>
      <BrowseAllService />
      
    </>
  );
};

export default Home;