import React from 'react';
import ScrollAnimation from '../../ScrollAnimation';
import '../template.css';
import './unterkunft.css';
import { FaBed, FaMapMarkerAlt, FaStar, FaWifi, FaParking } from 'react-icons/fa';

function Unterkunft() {
    const accommodations = [
        {
            id: 1,
            name: "Hotel am Domplatz",
            description: "Zentral gelegenes Hotel in der Linzer Altstadt, nur wenige Gehminuten vom Hauptplatz und Treffpunkt entfernt. Ideal für Fursuiter mit bequemen Zimmern und viel Platz für Suits.",
            features: ["Zentrale Lage", "Klimaanlage", "Kostenloses WLAN", "Café im Haus"],
            stars: 4,
            bookingLink: "https://www.booking.com/Share-Tp60oyF"
        },
        {
            id: 2,
            name: "ibis Linz City",
            description: "Modernes Budget-Hotel mit gemütlichen Zimmern, nur 15 Minuten zu Fuß vom Hauptplatz entfernt. Perfekt für Teilnehmer, die einen angenehmen Aufenthalt zu einem vernünftigen Preis suchen.",
            features: ["Günstig", "24h Rezeption", "Haustiere erlaubt", "Parkplatz"],
            stars: 3,
            bookingLink: "https://www.booking.com/Share-Si0jEk"
        },
        {
            id: 3,
            name: "ARCOTEL Nike Linz",
            description: "Elegantes Hotel direkt an der Donau mit Panoramablick auf die Stadt. Geräumige Zimmer mit moderner Ausstattung und ein erstklassiges Restaurant machen deinen Aufenthalt unvergesslich.",
            features: ["Donaublick", "Restaurant", "Wellness-Bereich", "Klimaanlage"],
            stars: 4,
            bookingLink: "https://www.booking.com/Share-lVDtD0"
        },
        {
            id: 4,
            name: "Austria Classic Hotel Wolfinger",
            description: "Historisches Hotel direkt am Hauptplatz. Traditionelles Ambiente mit modernem Komfort in einem denkmalgeschützten Gebäude aus dem 15. Jahrhundert. Perfekte Lage für den Suitwalk!",
            features: ["Historisches Gebäude", "Direkt am Hauptplatz", "Frühstücksbuffet", "Kostenloses WLAN"],
            stars: 3,
            bookingLink: "https://www.booking.com/Share-ZJgYWv"
        }
    ];

    const renderStars = (count) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push(<FaStar key={i} className="star-icon" />);
        }
        return <div className="hotel-stars">{stars}</div>;
    };

    return (
        <div className="container-content">
            <ScrollAnimation>
                <h1>Unterkunftsmöglichkeiten</h1>
                <p>Für deinen Besuch beim Suitwalk Linz haben wir einige empfehlenswerte Unterkünfte zusammengestellt. 
                   Alle Hotels sind zentral gelegen und bieten einen guten Ausgangspunkt für das Event.</p>
            </ScrollAnimation>

            <ScrollAnimation>
                <div className="accommodation-tip">
                    <h3>Tipp für Fursuiter</h3>
                    <p>Achte bei der Buchung auf ausreichend Platz für dein Fursuit und eventuell benötigte Trocknungsmöglichkeiten.
                    Bei Buchung kannst du das Hotel auch vorab über deine speziellen Bedürfnisse informieren.</p>
                </div>
            </ScrollAnimation>

            <div className="accommodation-grid">
                {accommodations.map(hotel => (
                    <ScrollAnimation key={hotel.id}>
                        <div className="hotel-card">
                            <div className="hotel-content">
                                <h2>{hotel.name}</h2>
                                {renderStars(hotel.stars)}
                                <p className="hotel-description">{hotel.description}</p>
                                
                                <div className="hotel-features">
                                    {hotel.features.map((feature, index) => (
                                        <span key={index} className="feature-tag">
                                            {feature === "Zentrale Lage" || feature === "Direkt am Hauptplatz" ? <FaMapMarkerAlt /> : 
                                             feature === "Kostenloses WLAN" ? <FaWifi /> :
                                             feature === "Parkplatz" ? <FaParking /> : <FaBed />} {feature}
                                        </span>
                                    ))}
                                </div>
                                
                                <a href={hotel.bookingLink} target="_blank" rel="noopener noreferrer" className="booking-button">
                                    Jetzt buchen
                                </a>
                            </div>
                        </div>
                    </ScrollAnimation>
                ))}
            </div>

            <ScrollAnimation>
                <div className="booking-info">
                    <h3>Gruppenreservierung</h3>
                    <p>Bei größeren Gruppen empfehlen wir, direkt mit den Hotels Kontakt aufzunehmen, um möglicherweise Gruppenrabatte zu erhalten.</p>
                    <p>Buche frühzeitig, da Linz besonders während Veranstaltungen schnell ausgebucht sein kann!</p>
                </div>
            </ScrollAnimation>
        </div>
    );
}

export default Unterkunft;