import React from 'react';
import ScrollAnimation from '../../ScrollAnimation';
import '../template.css';
import L from 'leaflet'; // Importing Leaflet for map functionality
import 'leaflet/dist/leaflet.css'; // Importing Leaflet CSS for map styling
import 'leaflet-routing-machine'; // Importing Leaflet Routing Machine for routing functionality
// Fix Leaflet icon issue
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

// Delete the default icon
delete L.Icon.Default.prototype._getIconUrl;

// Set up the default icon correctly
L.Icon.Default.mergeOptions({
    iconRetinaUrl,
    iconUrl,
    shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
// Define the coordinates for the map center and zoom level
const position = [48.306821, 14.285493]; // Center of the map
const zoom = 16; // Initial zoom level
function Anreise() {

    React.useEffect(() => {
        let map;

        if (!map) {
            map = L.map('map').setView(position, zoom); // Set initial view

            const mapLink = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // OpenStreetMap tile layer
            L.tileLayer(mapLink, {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Add a marker for the location
            const marker = L.marker(position).addTo(map); // Create a marker at the specified position
            marker.bindPopup('<b>Treffpunkt</b><br>Hauptplatz Tiefgarage, 4020 Linz').openPopup(); // Bind a popup to the marker
        }

        return () => {
            if (map) {
                map.remove(); // Cleanup map instance on component unmount
            }
        };
    }, []);

    return (
        <div className="container-content">
            <ScrollAnimation>
                <h1>Anreise</h1>
                <p>Hier findest du alle Informationen zur Anreise.</p>
                <h2>Treffpunkt</h2>
                <div id='map'></div>
                <h2>Mit dem Auto</h2>
                <p>Die Adresse für dein Navigationsgerät lautet: Hauptplatz Tiefgarage Linz, 4020 Linz.</p>
                <h2>Mit dem Zug</h2>
                <p>Der Linzer Hauptbahnhof ist nur wenige Minuten mit dem Auto entfernt. Von dort aus kannst du ein Taxi nehmen oder die Straßenbahnlinien 1 und 2 Richtung Universität oder 3 und 4 Richtung Landgutstraße bis zur Haltestelle "Hauptplatz" nutzen.</p>
            </ScrollAnimation>
        </div>
    );
}

export default Anreise;