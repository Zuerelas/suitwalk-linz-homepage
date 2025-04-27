import React from 'react';
import ScrollAnimation from '../../ScrollAnimation';
import '../template.css';
import './anreise.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Importing necessary components from react-leaflet
import L from 'leaflet'; // Importing Leaflet for map functionality
import 'leaflet/dist/leaflet.css'; // Importing Leaflet CSS for map styling
import 'leaflet-routing-machine'; // Importing Leaflet Routing Machine for routing functionality

const position = [48.306821, 14.285493]; // Center of the map
const zoom = 16; // Initial zoom level
function Anreise() {
    // Define the coordinates for the map center and zoom level

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
            marker.bindPopup('<b>Treffpunkt</b><br>Hauptplatz Tiefgarage <br>Hauptplatz Tiefgarage Linz, 4020 Linz').openPopup(); // Bind a popup to the marker
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
                <p>Der Linzer Hauptbahnhof ist nur wenige Minuten mit dem Auto entfernt. Von dort aus kannst du ein Taxi nehmen oder die Straßenbahnlinie 1 bis zur Haltestelle "Hauptplatz" nutzen.</p>
            </ScrollAnimation>
        </div>
    );
}

export default Anreise;