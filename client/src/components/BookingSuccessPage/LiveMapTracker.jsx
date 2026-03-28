import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  useMap
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import "../../styles/LiveMapTracker.css";

// FIX DEFAULT ICON
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// ICONS
const finderIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149060.png",
  iconSize: [40, 40],
});

const providerIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [40, 40],
});

// AUTO FIT + RECENTER
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

// DISTANCE
const getDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lat2) return null;

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
  if (!userLocation) {
    return (
      <div className="map-loading-container">
        <div className="map-loader"></div>
        <p className="map-loading-text">Fetching location...</p>
      </div>
    );
  }

  const userPos = [userLocation.lat, userLocation.lng];

  const providerPos =
    providerLocation?.lat && providerLocation?.lng
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
        zoom={15}
        className="map-container"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController userPos={userPos} providerPos={providerPos} />

        <Marker position={userPos} icon={finderIcon}>
          <Popup>📍 You</Popup>
        </Marker>

        {providerPos && (
          <Marker position={providerPos} icon={providerIcon}>
            <Popup>🚗 Provider</Popup>
          </Marker>
        )}

        {path.length > 0 && (
          <Polyline
            positions={path}
            pathOptions={{
              color: "#2563eb",
              weight: 6,
              dashArray: "8,10",
            }}
          />
        )}
      </MapContainer>

      <div className="live-badge">
        <span className="live-dot"></span>
        LIVE
      </div>

      {distance && (
        <div className="distance-badge">
          🚗 {distance} km away
        </div>
      )}
    </div>
  );
};

export default LiveMapTracker;