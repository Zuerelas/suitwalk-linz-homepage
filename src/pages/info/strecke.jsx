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
    [48.309447, 14.289949],
    [48.310548, 14.291359],
    [48.311520, 14.292347],
    [48.311322, 14.292805],
    [48.310603, 14.292076],
    [48.309977, 14.291384],
    [48.309122, 14.290217]
]; // Coordinates for the marker

const pointsOfInterest = [
    {
        title: "Start: Tiefgarage",
        description: "Der Treffpunkt für den Suitwalk. Hier treffen sich alle Teilnehmer. Hier gibt es auch die Möglichkeit, sich umzuziehen und die ersten Fotos zu machen.",
        coordinates: [48.306817, 14.285483],
        image: "/src/img/tiefgarage.JPG"
    },
    {
        title: "Lentos Kunstmuseum",
        description: "Ein modernes Kunstmuseum mit beeindruckender Architektur. Ideal für kreative Fotos. Abweichend kann neben dem Gebäude auch fotografiert werden.",
        coordinates: [48.308539, 14.288862],
        image: "/src/img/lentos.JPG"
    },
    {
        title: "Donaulände",
        description: "Die Donaulände bietet eine unglaubliche Kulisse mit Blick auf die Donau. Perfekt für entspannte Fotos.",
        coordinates: [48.309874, 14.290827],
        image: "/src/img/donaulaende.JPG"
    },
    {
        title: "Brucknerhaus",
        description: "Das Brucknerhaus ist ein bekanntes Konzerthaus in Linz. Hier gibt es viele Möglichkeiten für kreative Fotos. Hier wird auch ein Gruppenfoto gemacht.",
        coordinates: [48.310983, 14.292660],
        image: "/src/img/brucknerhaus.jpg"
    }
];

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

            // Add markers for points of interest
            pointsOfInterest.forEach((point) => {
                L.marker(point.coordinates)
                    .addTo(map)
                    .bindPopup(`<b>${point.title}</b>`);
            });
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
            <ScrollAnimation>
                <div id='map'></div>
            </ScrollAnimation>
            <p></p>
            <section>
                <ScrollAnimation>
                    <h2>Streckenbeschreibung</h2>
                    <div className="path-container">
                        {pointsOfInterest.map((point, index) => (
                            <ScrollAnimation key={index} className="point-container">
                                <div className="point-image">
                                    <img src={point.image} alt={point.title} onError={(e) => e.target.src = '/src/img/default.jpg'} />
                                </div>
                                <div className="point-details">
                                    <h3>{point.title}</h3>
                                    <p>{point.description}</p>
                                </div>
                            </ScrollAnimation>
                        ))}
                    </div>
                </ScrollAnimation>
            </section>
        </div>
    )
}
export default Strecke;