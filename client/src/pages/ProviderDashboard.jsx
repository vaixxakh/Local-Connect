import "../styles/providerDashboard.css";
import ProviderSidebar from "../components/providerDashboard/ProviderSideBar";
import ProviderNavbar from "../components/providerDashboard/ProviderNavbar";
import { FaClipboardList, FaCheckCircle, FaClock, FaRupeeSign } from "react-icons/fa";
import StatsCard from "../components/providerDashboard/StatsCard";

export default function ProviderDashboard(){

return(

<div className="dashboard">
    <ProviderNavbar/>

<div className="dashboardContainer ">
    <ProviderSidebar />
    </div>
    <main className="dashboard-content flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

        <div className="stats-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">  
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
</div>
)

};