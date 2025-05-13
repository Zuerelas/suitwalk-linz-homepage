import React from 'react';
import ScrollAnimation from '../../ScrollAnimation';
import '../template.css';
import './ablauf.css';
import { FaClock, FaUsers, FaMapMarkerAlt, FaCamera, FaCoffee, FaWalking, FaHome } from 'react-icons/fa';

function Ablauf() {
    // Timeline events
    const timeline = [
        {
            time: "13:00",
            title: "Treffpunkt & Umziehen",
            description: "Treffpunkt an der Hauptplatz Tiefgarage. Hier ist Zeit zum Umziehen, Kennenlernen und für erste Fotos.",
            icon: <FaUsers />,
            location: "Hauptplatz Tiefgarage, 4020 Linz"
        },
        {
            time: "14:00",
            title: "Offizielle Begrüßung",
            description: "Gemeinsame Begrüßung durch die Organisatoren, Vorstellung der Spotter und wichtige Informationen zum Ablauf.",
            icon: <FaUsers />,
            location: "Tiefgarage Hauptplatz"
        },
        {
            time: "14:30",
            title: "Start des Suitwalks",
            description: "Der Suitwalk beginnt! Wir laufen vom Hauptplatz zum Lentos Kunstmuseum entlang der vorgegebenen Route.",
            icon: <FaWalking />,
            location: "Vom Hauptplatz zum Lentos"
        },
        {
            time: "15:00",
            title: "Fotoshooting: Lentos Kunstmuseum",
            description: "Fotostopp am Lentos Kunstmuseum mit seiner beeindruckenden Architektur - ideal für kreative Fotos.",
            icon: <FaCamera />,
            location: "Lentos Kunstmuseum"
        },
        {
            time: "15:45",
            title: "Fotoshooting: Donaulände",
            description: "Weiter geht's zur Donaulände für Fotos mit der wunderschönen Kulisse der Donau im Hintergrund.",
            icon: <FaCamera />,
            location: "Donaulände"
        },
        {
            time: "16:30",
            title: "Großes Gruppenfoto",
            description: "Großes Gruppenfoto aller Teilnehmer vor dem Brucknerhaus - ein Highlight für alle!",
            icon: <FaCamera />,
            location: "Brucknerhaus"
        },
        {
            time: "17:15",
            title: "Kaffeepause & Erfrischungen",
            description: "Zeit für eine Erfrischung und Pause. Die Fursuiter können kurz abkühlen, während sich alle stärken können.",
            icon: <FaCoffee />,
            location: "Nähe Brucknerhaus"
        },
        {
            time: "18:00",
            title: "Rückweg zum Ausgangspunkt",
            description: "Gemeinsamer Rückweg zum Ausgangspunkt, wo die Teilnehmer sich umziehen können.",
            icon: <FaHome />,
            location: "Zurück zum Hauptplatz"
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
                        <p className="time-note"><FaClock /> 13:00 Uhr</p>
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