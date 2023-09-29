import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import us from "../misc/us.json";

const ChoroplethMap = () => {
    const center = [51.505, -0.09]; // Initial map center coordinates
    const zoom = 13; // Initial map zoom level

  const [geojsonData, setGeojsonData] = useState(null);
  useEffect(() => {
      setGeojsonData(us);
  }, []);

return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100vh' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {geojsonData && (
        <GeoJSON
          data={geojsonData}
          style={(feature) => ({
            fillColor: "#333",
            weight: 1,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7,
          })}
        />
      )}
    </MapContainer>
  );
};

export default ChoroplethMap;
