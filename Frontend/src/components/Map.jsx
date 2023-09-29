
import {useState} from 'react';
import { MapContainer, TileLayer, GeoJSON} from 'react-leaflet';
import data from '../misc/cali.json';

const Map = ({cities})=>{

    // Used to see if a coordinate is inside a region
    function inside(point, vs) {
        // ray-casting algorithm based on
        // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html
        
        var x = point[0], y = point[1];
        
        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            var xi = vs[i][0], yi = vs[i][1];
            var xj = vs[j][0], yj = vs[j][1];
            
            var intersect = ((yi > y) != (yj > y))
                && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        
        return inside;
    }

    GeometryJSON g = new GeometryJSON();
    com.vividsolutions.jts.geom.Polygon polygon = g.readPolygon(new File(fileLocation));
    System.out.println("Type="+polygon.getGeometryType());

    GeometryFactory gf = new GeometryFactory();
    boolean pointIsInPolygon = polygon.contains(gf.createPoint(new Coordinate(36, -119)));
    System.out.println("Point is in polygon="+pointIsInPolygon);

    data.features.forEach((feature) => {
        // console.log(feature.geometry.coordinates)

        cities.forEach((city) => {
            // console.log(city.x, city.y, feature.geometry)
            console.log(inside([city.x, city.y], feature.geometry.coordinates))
            // if(inside([city.x, city.y], feature.geometry)){
            // }
        }
    )})

    // const mapPolygonColorToDensity=(density => {
    //     return density > 3023
    //         ? '#a50f15'
    //         : density > 676
    //         ? '#de2d26'
    //         : density > 428
    //         ? '#fb6a4a'
    //         : density > 236
    //         ? '#fc9272'
    //         : density > 23
    //         ? '#fcbba1'
    //         : '#fee5d9';
    // });

    // const style = (feature => {
    //     return ({
    //         fillColor: mapPolygonColorToDensity(feature.properties.Desnity),
    //         weight: 1,
    //         opacity: 1,
    //         color: 'white',
    //         dashArray: '2',
    //         fillOpacity: 0.5
    //     });
    // });

    const mapStyle = {
        height: '55vh',
        width: '85%',
        margin: '0 auto',
    }

    return(
         <div className='container'>
            <div className="">
                <div className="">
                <MapContainer center={[38.8026, -116.4194]}
                zoom={6} scrollWheelZoom={true} style={mapStyle}>
                    <TileLayer
                        attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                    />
                        {data && (<GeoJSON data={data}/>)}
                </MapContainer>
                </div>
            </div>
        </div>
    );
}
export default Map;