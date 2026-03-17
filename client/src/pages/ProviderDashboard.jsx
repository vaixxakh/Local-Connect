import "../styles/providerDashboard.css";
import ProviderSidebar from "../components/providerDashboard/ProviderSideBar";
import ProviderNavbar from "../components/providerDashboard/ProviderNavbar";
import Content from "../components/providerDashboard/Content";

export default function ProviderDashboard(){

return(

<div className="dashboard">

    <ProviderNavbar/>

    <div className="dashboardContainer">
        <ProviderSidebar />
       <Content />

    </div>

</div>
)
}