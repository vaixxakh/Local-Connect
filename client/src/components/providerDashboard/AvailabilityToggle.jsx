import { useState } from "react";
import { updateProviderStatus } from "../../service/providerService";
import socket from "../../socket/socket";
import { FaMapPin } from "react-icons/fa";

const AvailabilityToggle = ({ currentStatus = "online", onStatusChange }) => {
  const [status, setStatus] = useState(currentStatus);

 
  const [showPopup, setShowPopup] = useState(
    currentStatus === "online"
  );

  const [watchId, setWatchId] = useState(null);


const startTracking = () => {
  if (!navigator.geolocation) return;

  const id = navigator.geolocation.watchPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lng = pos.coords.longitude;

      console.log("📡 Provider:", lat, lng);
      
      fetch("/api/providers/update-location", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ lat, lng }),
      });

      
      const bookingId = localStorage.getItem("bookingId");

      if (bookingId) {
        socket.emit("send-location", {
          bookingId,
          lat,
          lng,
        });
      }
    },
    (err) => {
      console.log("⏱ Location timeout:", err);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: 15000,
    }
  );

  setWatchId(id);
};

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      console.log("🛑 Tracking stopped");
    }
  };

  
  const handleStatusChange = async (newStatus) => {
    try {
      await updateProviderStatus(newStatus);
      setStatus(newStatus);

      if (onStatusChange) onStatusChange(newStatus);

      if (newStatus === "online") {
        setShowPopup(true);
      }

      if (newStatus === "offline") {
        stopTracking();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
   
      <div className="flex gap-2">
        {["online", "busy", "offline"].map((item) => (
          <button
            key={item}
            onClick={() => handleStatusChange(item)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
              status === item
                ? "bg-green-600 text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {item}
          </button>
        ))}
      </div>


      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          

          <div className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-2xl animate-slideUp">
             <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4">

             </div>
            <div className="text-center">
              <div className="text-3xl mb-2"><FaMapPin color="red"/></div>

              <h2 className="text-lg font-semibold mb-1">
                Enable Location
              </h2>

              <p className="text-sm text-gray-500 mb-5">
                Allow access to go online and receive bookings
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-medium"
                >
                  Not Now
                </button>

                <button
                  onClick={() => {
                    setShowPopup(false);
                    startTracking(); 
                  }}
                  className="flex-1 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md active:scale-95 transition"
                >
                  Allow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes slideUp {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .animate-slideUp {
            animation: slideUp 0.35s ease-out;
          }
        `}
      </style>
    </>
  );
};

export default AvailabilityToggle;