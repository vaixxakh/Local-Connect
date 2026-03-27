import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import "../../styles/LiveMapTracker.css";

// ✅ Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// ✅ Auto fit both points
const FitBounds = ({ userPos, providerPos }) => {
  const map = useMap();

  useEffect(() => {
    if (userPos && providerPos) {
      const bounds = L.latLngBounds([userPos, providerPos]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [userPos, providerPos]);

  return null;
};

// ✅ Distance function
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(2);
};

const LiveMapTracker = ({ userLocation, providerLocation }) => {
  if (!userLocation) {
    return (
      <div className="map-loading-container">
        <div className="map-loader"></div>
        <p className="map-loading-text">Fetching location...</p>
      </div>
    );
  }

  const userPos = [userLocation.lat, userLocation.lng];
  const providerPos = providerLocation
    ? [providerLocation.lat, providerLocation.lng]
    : null;

  const path = providerPos ? [providerPos, userPos] : [];

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
      

      <MapContainer
        center={userPos}
        zoom={14}
        className="map-container"
      >
   
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {providerPos && (
          <FitBounds userPos={userPos} providerPos={providerPos} />
        )}

    
        <Marker position={userPos} />

        {/* PROVIDER */}
        {providerPos && <Marker position={providerPos} />}

        {/* ROUTE */}
        {path.length > 0 && (
          <Polyline
            positions={path}
            pathOptions={{
              color: "#2563eb",
              weight: 5,
            }}
          />
        )}
      </MapContainer>
    
      {/* LIVE BADGE */}
      <div className="live-badge">
        <span className="live-dot"></span>
        LIVE TRACKING
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