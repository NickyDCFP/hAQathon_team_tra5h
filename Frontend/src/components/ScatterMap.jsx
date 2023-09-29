import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/*
  This component takes in a list of cities to highlight on the map. It then renders a dynamic map with the cities highlighted.
  
  Parameters:
    citiesToHighlight - A list of city objects that have a name, x, and y coordinate. x -> latitude, y -> longitude
*/
const ScatterMap = ({ citiesToHighlight }) => {
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

export default ScatterMap;


