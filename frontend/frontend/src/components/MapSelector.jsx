import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom icon for the marker
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapSelector = ({ setCoordinates }) => {
  const [position, setPosition] = useState([28.6139, 77.209]); // Default: Delhi, India
  const [markerPosition, setMarkerPosition] = useState([28.6139, 77.209]); // Marker position

  // Fetch user's location when the component mounts
  useEffect(() => {
    if (navigator.geolocation) {
      // Request user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]); // Update position with current location
          setMarkerPosition([latitude, longitude]); // Update marker position
          setCoordinates([latitude, longitude]); // Update parent component state
        },
        (error) => {
          console.error("Error fetching location: ", error);
          // Fallback to default location (Delhi) if the user denies permission or there is an error
          alert("Unable to retrieve location. Defaulting to Delhi.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  // Update map center when location changes
  const UpdateMapView = () => {
    const map = useMap();
    useEffect(() => {
      // Move map to the current position
      map.setView(position, 13); // Moves the map to the new position with zoom level 13
    }, [position]); // This effect runs whenever position changes

    return null;
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]); // Update map center to clicked position
        setMarkerPosition([lat, lng]); // Update marker position to clicked location
        setCoordinates([lat, lng]); // Update parent component state with new coordinates
      },
    });
    return markerPosition ? (
      <Marker position={markerPosition} icon={markerIcon} />
    ) : null;
  };

  return (
    <MapContainer
      center={position} // Set center to either fetched or clicked position
      zoom={13}
      style={{ height: "300px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <UpdateMapView />
      <MapClickHandler />
    </MapContainer>
  );
};

export default MapSelector;
