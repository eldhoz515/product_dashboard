import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const markerIconDefault = new L.Icon({
  iconUrl: "/marker.png",
  iconSize: [35, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
  shadowAnchor: [12, 41]
});

function Map({ address }) {
  const position = [address.latitude, address.longitude];
  return (
    <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={position} icon={markerIconDefault}>
        <Popup>
          {`${address.street} ${address.house} ${address.zipCode}`}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;