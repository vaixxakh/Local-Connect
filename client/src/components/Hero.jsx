import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Hero = ({ onLoginClick }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);


  return <>
    <section className="min-h-[calc(100vh-73px)] flex items-center pt-12 px-[144px]">

      <div className="flex w-full items-center justify-between gap-16">

        <div className="max-w-[520px]">

          <h1 className="text-[56px] leading-[1.05] font-semibold text-[#111827] font-[Outfit] mb-5">
            Find Local Service <br />
            Providers Near You
          </h1>

          <p className="text-[18px] leading-[1.7] text-[#4B5563] font-[Figtree] mb-6">
            Connect with trusted painters, carpenters, cleaners, and more in your local area.
            Professional services at your fingertips.
          </p>

          <div className="flex gap-4 mt-15">

            <button
              onClick={() => navigate("/services")}
              className="flex items-center font-[Figtree] gap-2 text-[20px] px-10 py-2 bg-[#22c55e] text-[#064E3B] rounded-lg  font-medium hover:bg-[#16a34a] transition"
            >
              Find Services →
            </button>

            {!user && (
              <button
                onClick={() => onLoginClick && onLoginClick("register")}
                className="px-10 py-2 border font-[Figtree] cborder-gray-300 rounded-lg text-[20px] text-gray-700 hover:bg-gray-50 transition"
              >
                Become a Provider
              </button>
            )}

          </div>
        </div>

        <div className="flex  flex-1 ">

          <img
            src="https://images.unsplash.com/photo-1774977863604-59f4e6d37a90?q=85"
            alt="Service Provider"
            className="w-full max-w-[610px] h-[650px] object-cover rounded-2xl mt-18"
          />

        </div>
      </div>
    </section>

 <section className="w-full h-[150px] bg-[#064E3B] mt-20"/>
  </>
};

export default Hero;