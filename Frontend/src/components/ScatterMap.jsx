import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

/*
  This component takes in a list of cities to highlight on the map. It then renders a dynamic map with the cities highlighted.
  
  Parameters:
    citiesToHighlight - A list of city objects that have a name, x, and y coordinate. x -> latitude, y -> longitude
*/
const ScatterMap = ({ locationsToHighlight, notableLocations}) => {
  return (
    <MapContainer center={[37, -119]} zoom={6} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locationsToHighlight.map((location, index) => (
        <Circle center={[location.x, location.y]} radius={location.radius * 111,139000 / 2} color={location.color} key={index}>
          <Popup>
            Mean Wind Cubed Per Capita: {location.wind} <br />
            Consists of {location.cities.length} cities.
          </Popup>
        </Circle>
      ))}
      {notableLocations.map((location, index) => (
        <Marker key={index} position={[location["Latitude"], location["Longitude"]]}>
          <Popup>
            Location: {location["City"]} <br />
            Wind Cubed Per Capita: {location["Wind Cubed Per Capita"]}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ScatterMap;


