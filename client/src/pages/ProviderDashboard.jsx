import "../styles/providerDashboard.css";
import ProviderSidebar from "../components/providerDashboard/ProviderSideBar";
import ProviderNavbar from "../components/providerDashboard/ProviderNavbar";
import Content from "../components/providerDashboard/Content";
import socket from "../socket/socket";
import { useEffect } from "react";


export default function ProviderDashboard(){
    useEffect(() => {
  const bookingId = localStorage.getItem("bookingId");

  if (!bookingId) return;

 
  socket.emit("join-booking-room", bookingId);

  const watchId = navigator.geolocation.watchPosition(
    (pos) => {
      socket.emit("send-location", {
        bookingId,
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    },
    (err) => console.log(err),
    {
      enableHighAccuracy: true,
      maximumAge: 5000,
    }
  );

  return () => navigator.geolocation.clearWatch(watchId);
}, []);
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