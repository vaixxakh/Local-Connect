import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import "../../styles/LiveMapTracker.css";


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});


const createProfileIcon = (imageUrl) => {
  return new L.DivIcon({
    html: `
      <div class="profile-marker">
        <img src="${imageUrl}" />
      </div>
    `,
    className: "",
    iconSize: [50, 50],
  });
};


const MapController = ({ userPos, providerPos }) => {
  const map = useMap();

  useEffect(() => {
    if (providerPos) {
      const bounds = L.latLngBounds([userPos, providerPos]);
      map.fitBounds(bounds, { padding: [80, 80] });
    } else {
      map.setView(userPos, 15);
    }
  }, [userPos, providerPos, map]);

  return null;
};

const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
};

const LiveMapTracker = ({ userLocation, providerLocation }) => {
  
  if (!userLocation) return <p>Loading map...</p>;

  const userPos = [userLocation.lat, userLocation.lng];
  const providerPos =
    providerLocation?.lat && providerLocation?.lng
      ? [providerLocation.lat, providerLocation.lng]
      : null;

  const path = providerPos ? [providerPos, userPos] : [];


  const userIcon = createProfileIcon("https://i.pravatar.cc/150?img=3");
  const providerIcon = createProfileIcon("https://i.pravatar.cc/150?img=5");

  const distance =
    providerPos &&
    getDistance(
      userLocation.lat,
      userLocation.lng,
      providerLocation.lat,
      providerLocation.lng
    );

  return (
    <div className="map-wrapper">
      <MapContainer center={userPos} zoom={15} className="map-container">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController userPos={userPos} providerPos={providerPos} />

        <Marker position={userPos} icon={userIcon} />

        {providerPos && <Marker position={providerPos} icon={providerIcon} />}

  
        {path.length > 0 && (
          <>
            <Polyline
              positions={path}
              pathOptions={{
                color: "#60a5fa",
                weight: 10,
                opacity: 0.3,
              }}
            />
            <Polyline
              positions={path}
              pathOptions={{
                color: "#2563eb",
                weight: 5,
              }}
            />
          </>
        )}
      </MapContainer>

   
      <div className="live-badge">
        <span className="live-dot"></span>
        LIVE
      </div>

      {/* DISTANCE */}
      {distance && (
        <div className="distance-badge">
          🚗 {distance} km away
        </div>
      )}
    </div>
  );
};

export default LiveMapTracker;