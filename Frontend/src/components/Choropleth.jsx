import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Choropleth = ({ citiesToHighlight }) => {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {citiesToHighlight.map((city, index) => (
        <Marker key={index} position={[city.x, city.y]}>
          <Popup>{city.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Choropleth;


