import React from 'react';
import ScrollAnimation from '../../ScrollAnimation';
import '../template.css';
import './ablauf.css';
import { FaClock, FaUsers, FaMapMarkerAlt, FaCamera, FaCoffee, FaWalking, FaHome } from 'react-icons/fa';

function Ablauf() {
    // Timeline events
    const timeline = [
        {
            time: "13:30",
            title: "Treffpunkt & Umziehen",
            description: "Treffpunkt an der Hauptplatz Tiefgarage. Hier ist Zeit zum Umziehen, Kennenlernen und für erste Fotos.",
            icon: <FaUsers />,
            location: "Hauptplatz Tiefgarage, 4020 Linz"
        },
        {
            time: "14:30",
            title: "Start des Suitwalks",
            description: "Der Suitwalk beginnt! Wir laufen vom Hauptplatz zum Lentos Kunstmuseum entlang der vorgegebenen Route.",
            icon: <FaWalking />,
            location: "Vom Hauptplatz zum Lentos"
        },
        {
            time: "16:00",
            title: "Rückkehr zur Tiefgarage",
            description: "Gemeinsamer Rückweg zum Ausgangspunkt, wo die Teilnehmer sich umziehen können. Diese Zeit ist nur vorraussichtlich und kann variieren.",
            icon: <FaWalking />,
            location: "Zurück zur Tiefgarage"
        },
        {
            time: "17:00",
            title: "Linzer Stammtisch",
            description: "Nach dem offiziellen Ende des Suitwalks treffen sich viele Teilnehmer noch zum gemütlichen Beisammensein. Details zum Treffpunkt werden am Tag bekannt gegeben. Jeder ist herzlich eingeladen!",
            icon: <FaCoffee />,
            location: "Wia z'Haus Lehner"
        }
    ];

    return (
        <div className="container-content">
            <ScrollAnimation>
                <h1>Ablauf</h1>
            </ScrollAnimation>
            <ScrollAnimation>
                <div className="event-highlight-box">
                    <div className="highlight-icon">
                        <FaMapMarkerAlt />
                    </div>
                    <div className="highlight-content">
                        <h3>Treffpunkt</h3>
                        <p>Hauptplatz Tiefgarage, 4020 Linz</p>
                        <p className="time-note"><FaClock /> 13:30 Uhr</p>
                    </div>
                </div>
            </ScrollAnimation>

            <ScrollAnimation>
                <h2>Tagesablauf</h2>
                <div className="timeline">
                    {timeline.map((event, index) => (
                        <div className="timeline-event" key={index}>
                            <div className="time-block">
                                <span className="time">{event.time}</span>
                                <div className="icon-container">
                                    {event.icon}
                                </div>
                            </div>
                            <div className="event-details">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                                <div className="location">
                                    <FaMapMarkerAlt /> {event.location}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollAnimation>

            <ScrollAnimation>
                <h2>Wichtige Hinweise</h2>
                <div className="tips-grid">
                    <div className="tip-card">
                        <h3>Für Fursuiter</h3>
                        <ul>
                            <li>Denke an ausreichend Wasser und Kühlelemente</li>
                            <li>Suithandler/Spotter helfen dir auf dem Weg</li>
                            <li>Regelmäßige Pausen sind eingeplant</li>
                        </ul>
                    </div>
                    <div className="tip-card">
                        <h3>Für Fotografen</h3>
                        <ul>
                            <li>Die geplanten Fotostopps sind markiert</li>
                            <li>Achte auf die Anweisungen der Organisatoren</li>
                            <li>Die besten Fotospots sind auf der Strecke hervorgehoben</li>
                            <li>Teile deine Fotos mit dem #SuitwalkLinz Hashtag</li>
                        </ul>
                    </div>
                    <div className="tip-card">
                        <h3>Für Alle Teilnehmer</h3>
                        <ul>
                            <li>Bitte beachte unsere <a href="/#/regeln">Regeln</a></li>
                            <li>Bei Fragen wende dich an die Organisatoren mit der roten Armbinde</li>
                            <li>Der Suitwalk findet auch bei leichtem Regen statt</li>
                            <li>Die gesamte Route ist etwa 2,5 km lang</li>
                        </ul>
                    </div>
                </div>
            </ScrollAnimation>

            <ScrollAnimation>
                <div className="finish-note">
                    <h3>Nach dem Suitwalk</h3>
                    <p>Nach dem offiziellen Ende des Suitwalks treffen sich viele Teilnehmer noch zum gemütlichen Beisammensein.
                        Details zum Treffpunkt werden am Tag bekannt gegeben. Jeder ist herzlich eingeladen!</p>
                </div>
            </ScrollAnimation>
        </div>
    );
}

export default Ablauf;