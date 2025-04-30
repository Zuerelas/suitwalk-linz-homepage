import '../template.css'
import './furmeetlinz.css'
import ScrollAnimation from '../../ScrollAnimation';
import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import { FaTelegram } from 'react-icons/fa';

function getSecondSaturdayOfMonth() {
    const thisMonth = new Date().getMonth() + 1; // Get the current month
    const thisYear = new Date().getFullYear(); // Get the current year
    const firstDayOfMonth = new Date(thisYear, thisMonth, 1);
    const firstSaturday = 7 - firstDayOfMonth.getDay() + 1; // Find the first Saturday
    const secondSaturday = firstSaturday + 6; // Add 7 days to get the second Saturday
    return new Date(thisYear, thisMonth, secondSaturday).toLocaleDateString('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }); // Format the date to a readable string in German locale
}

function FurmeetLinz() {
    // Initialize the map when the component mounts
    React.useEffect(() => {
        let map;

        if (!map) {
            map = L.map('map').setView([48.326939, 14.277425], 17); // Set initial view

            const mapLink = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'; // OpenStreetMap tile layer
            L.tileLayer(mapLink, {
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            const marker = L.marker([48.326939, 14.277425]).addTo(map); // Create a marker at the specified coordinates
            marker.bindPopup("<b>Furmeet Linz</b><br>Hier findet dar Stammtisch statt!").openPopup(); // Bind a popup to the marker
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
                <h1>Furmeet Linz</h1>
                <p>Österreich's größter Stammtisch findet jeden 2. Samstag hier statt!</p>
            </ScrollAnimation>
            <ScrollAnimation>
                <h2>Standort</h2>
                <div className="location-badge">Wia z'Haus Lehner</div>
                <p>Adresse: <a className="address-link" target='_blank' rel="noreferrer" href="https://www.google.at/maps/place/Wia+z'haus+Lehner/@48.3268013,14.2777738,19.54z/data=!4m15!1m8!3m7!1s0x876b7ce831ef3eff:0x2eecff8c12eec336!2s11757+S+Wadsworth+Blvd,+Littleton,+CO+80125,+USA!3b1!8m2!3d39.502676!4d-105.0933165!16s%2Fg%2F11c4d0ghmb!3m5!1s0x477399cf514b98e1:0x5d3f2708eebb44ee!8m2!3d48.3269375!4d14.2773767!16s%2Fg%2F1thzmqd4?hl=de&entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoJLDEwMjExNjM5SAFQAw%3D%3D">
                    Harbacher Straße 38<br />
                    A-4040 Linz</a>
                </p>
                <div id='map'></div>
            </ScrollAnimation>
            <ScrollAnimation>
                <h2>nächstes Datum</h2>
                <p>Der nächste Stammtisch findet an folgenden Datum statt:</p>
                <div className="event-highlight">
                    <p className='date-display'>{getSecondSaturdayOfMonth()}</p>
                </div>
            </ScrollAnimation>
            <ScrollAnimation>
                <h2>Uhrzeit</h2>
                <div className="event-highlight">
                    <p>Der Stammtisch beginnt um <strong>17:00 Uhr</strong>.</p>
                    <p>Anmeldung erfolg über den Telegram channel des Linzer Stammtisches</p>
                </div>
            </ScrollAnimation>
            <ScrollAnimation>
                <h2>Telegram-Channel</h2>
                <p>Dies ist der Telegram Channel der Austrofurs OÖ und auch für die Anmeldung zum Stammtisch:</p>
                <a target='_blank' rel="noreferrer" href="https://t.me/+mWeFhe5k8zExMGI8" className="telegram-button">
                    <FaTelegram size={24} />
                    <span>Austrofurs OÖ</span>
                </a>
            </ScrollAnimation>
        </div>
    );
}

export default FurmeetLinz;