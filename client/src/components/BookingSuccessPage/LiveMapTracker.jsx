import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "../../styles/LiveMapTracker.css";

const LiveMapTracker = ({ userLocation, providerLocation }) => {

  if (!userLocation) {
    return (
      <div className="map-loading-container">
        <div className="map-loader"></div>
        <p className="map-loading-text">Fetching live location...</p>
      </div>
    );
  }

  const path = providerLocation
    ? [
        [providerLocation.lat, providerLocation.lng],
        [userLocation.lat, userLocation.lng],
      ]
    : [];

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[userLocation.lat, userLocation.lng]}
        zoom={14}
        scrollWheelZoom={true}
        className="map-container"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={[userLocation.lat, userLocation.lng]} />
        {providerLocation && (
          <Marker position={[providerLocation.lat, providerLocation.lng]} />
        )}

        {path.length > 0 && (
          <Polyline positions={path} className="map-polyline" />
        )}
      </MapContainer>

    
      <div className="live-badge">
        <span className="live-dot"></span>
        LIVE TRACKING
      </div>
    </div>
  );
};

export default LiveMapTracker;