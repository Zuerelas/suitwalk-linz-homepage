import React from 'react';
import ScrollAnimation from '../../ScrollAnimation';
import '../template.css';
import './strecke.css';
import L from 'leaflet'; // Import Leaflet for map functionality
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS for map styling
import 'leaflet-routing-machine'; // Import Leaflet Routing Machine for routing functionality
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'; // Import Leaflet Routing Machine CSS for routing styling
import 'leaflet-control-geocoder'; // Import Leaflet Control Geocoder for geocoding functionality
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Import Leaflet Control Geocoder CSS for geocoding styling
//import 'leaflet-control-geocoder/dist/Control.Geocoder.js'; // Import Leaflet Control Geocoder JS for geocoding functionality
//import 'leaflet-control-geocoder/dist/Control.Geocoder.js.map'; // Import Leaflet Control Geocoder JS map for geocoding functionality

const pathCoordinates = [
    [48.306821, 14.285493],
    [48.306507, 14.284477],
    [48.306430, 14.284528],
    [48.306871, 14.286051],
    [48.307213, 14.287017],
    [48.307303, 14.287299],
    [48.307364, 14.287739],
    [48.307740, 14.287620],
    [48.308059, 14.288278],
    [48.309129, 14.290228],
    [48.309062, 14.289359],
    [48.309447, 14.289949]
]; // Coordinates for the marker

function Strecke() {
    // Initialize the map when the component mounts
    React.useEffect(() => {
        let map;

        if (!map) {
            map = L.map('map').setView([48.307556, 14.287116], 17); // Set initial view

            const mapLink = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // OpenStreetMap tile layer
            L.tileLayer(mapLink, {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);


            const polyline = L.polyline(pathCoordinates, { color: 'red' }).addTo(map); // Create a polyline with the coordinates
            map.fitBounds(polyline.getBounds()); // Fit the map to the polyline bounds
        }

        return () => {
            if (map) {
                map.remove(); // Cleanup map instance on component unmount
            }
        };
    }, []);

    return (
        <div className='container-content'>
            <ScrollAnimation>
                <h1>Strecke</h1>
            </ScrollAnimation>
            <section>
                <ScrollAnimation>
                    <h2>Streckenbeschreibung</h2>
                </ScrollAnimation>
                <div id='map'></div>
                <ScrollAnimation>

                </ScrollAnimation>
            </section>
        </div>
    )
}
export default Strecke;