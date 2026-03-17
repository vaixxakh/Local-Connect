import { FaClipboardList, FaCheckCircle, FaClock, FaRupeeSign,FaUserCircle } from "react-icons/fa";
import StatsCard from "../../components/providerDashboard/StatsCard";
import { useState } from "react";
import Profile from "../../components/providerDashboard/Profile";

const Content = () => {
    const [openProfile, setOpenProfile] = useState(false);
  return (
    <>
    <main  className="
        ml-0 lg:ml-[265px]
        mt-4
        bg-white/90
        p-5 lg:p-6
        rounded-xl
        min-h-[calc(100vh-80px)]
        transition-all duration-300
      ">
         <div
          onClick={() => setOpenProfile(true)}
          className="flex items-center gap-4 bg-gray-50 hover:bg-gray-100 p-4 rounded-xl cursor-pointer mb-6 transition"
        >
          <FaUserCircle size={40} className="text-gray-500" />

          <div>
            <h2 className="font-semibold text-lg">My Profile</h2>
            <p className="text-sm text-gray-500">
              Click to view & edit your provider profile
            </p>
          </div>
        </div>


      <h1 className="text-3xl lg:text-3xl  font-bold mb-6">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 ms:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatsCard
          title="Total Bookings"
          value="120"
          icon={<FaClipboardList />}
          color="text-blue-500"
        />

        <StatsCard
          title="Completed Bookings"
          value="95"
          icon={<FaCheckCircle />}
          color="text-green-500"
        />

        <StatsCard
          title="Pending Bookings"
          value="15"
          icon={<FaClock />}
          color="text-yellow-500"
        />

        <StatsCard
          title="Earnings"
          value="₹45,000"
          icon={<FaRupeeSign />}
          color="text-green-700"
        />

      </div>

    </main>
    {openProfile && (
        <Profile onClose={() => setOpenProfile(false)} />
      )}
      </>
  );
};

export default Content;