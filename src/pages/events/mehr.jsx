import '../template.css';
import './mehr.css';
import ScrollAnimation from '../../ScrollAnimation';
import React from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaPaw } from 'react-icons/fa';

function Mehr() {
    // Define convention data in structured format
    const nonFurryConventions = [
        { 
            name: "Austria Comic Con", 
            location: "Wels", 
            link: "https://austriacomiccon.com/",
            description: "Österreichs größte Comic Con mit Cosplay, Gaming und mehr."
        },
        { 
            name: "Level Up", 
            location: "Salzburg", 
            link: "https://levelup-salzburg.at/",
            description: "Gaming- und Popkultur-Festival mit viel Entertainment."
        },
        { 
            name: "Yunicon", 
            location: "Wien, Schwechat", 
            link: "https://www.yunicon.at/",
            description: "Anime- und Manga-Convention mit vielseitigem Programm."
        },
        { 
            name: "Kokorokon", 
            location: "Wien, Schwechat", 
            link: "https://www.kokorokon.at/",
            description: "Convention rund um Anime, Manga und japanische Kultur."
        },
        { 
            name: "HaruCon", 
            location: "Klagenfurt", 
            link: "https://www.kanma.at/",
            description: "Japanische Popkultur, Anime und Manga im Vordergrund."
        },
        { 
            name: "HanamiCon", 
            location: "Graz", 
            link: "https://www.hanamicon.at/",
            description: "Convention für Fans von Cosplay, Anime und Manga."
        }
    ];

    const furryConventions = [
        { 
            name: "Awoostria", 
            location: "Wien", 
            link: "https://awoostria.at/",
            description: "Österreichs größte Furry-Convention mit internationalem Publikum."
        },
        { 
            name: "Furgether", 
            location: "Camp Sibley", 
            link: "https://furgether.at/",
            description: "Furry-Camping-Event in idyllischer Umgebung."
        },
        { 
            name: "LakeSide Furs", 
            location: "Achensee", 
            link: "https://lakesidefurs.at/",
            description: "Entspannte Furcon am malerischen Achensee in Tirol."
        },
        { 
            name: "Fusion Furdance", 
            location: "Simbach", 
            link: "https://www.fusionfurdance.com/",
            description: "Tanzorientierte Furry-Convention im bayerischen Simbach."
        }
    ];

    return (
        <div className="container-content">
            <ScrollAnimation>
                <h1>Conventions & Events</h1>
                <p className="events-intro">
                    Hier findest du eine Übersicht weiterer Conventions und Events, die für die Furry-Community 
                    interessant sind. Viele dieser Veranstaltungen bieten tolle Möglichkeiten für Fursuiter,
                    ihre Kreationen zu präsentieren und Gleichgesinnte zu treffen.
                </p>
            </ScrollAnimation>

            <ScrollAnimation>
                <section className="convention-section furry-section">
                    <div className="section-header">
                        <FaPaw className="section-icon" />
                        <h2>Furry Conventions</h2>
                    </div>
                    
                    <div className="conventions-grid">
                        {furryConventions.map((con, index) => (
                            <div className="convention-card" key={index}>
                                <div className="convention-card-inner">
                                    <h3>{con.name}</h3>
                                    <div className="convention-details">
                                        <p className="convention-location">
                                            <FaMapMarkerAlt /> {con.location}
                                        </p>
                                        <p className="convention-description">{con.description}</p>
                                    </div>
                                    <a href={con.link} target="_blank" rel="noopener noreferrer" className="convention-link">
                                        Zur Website
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </ScrollAnimation>

            <ScrollAnimation>
                <section className="convention-section non-furry-section">
                    <div className="section-header">
                        <FaCalendarAlt className="section-icon" />
                        <h2>Weitere Conventions</h2>
                    </div>
                    
                    <div className="conventions-grid">
                        {nonFurryConventions.map((con, index) => (
                            <div className="convention-card" key={index}>
                                <div className="convention-card-inner">
                                    <h3>{con.name}</h3>
                                    <div className="convention-details">
                                        <p className="convention-location">
                                            <FaMapMarkerAlt /> {con.location}
                                        </p>
                                        <p className="convention-description">{con.description}</p>
                                    </div>
                                    <a href={con.link} target="_blank" rel="noopener noreferrer" className="convention-link">
                                        Zur Website
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </ScrollAnimation>

            <ScrollAnimation>
                <div className="conventions-info">
                    <h3>Du kennst weitere Events?</h3>
                    <p>
                        Falls du weitere Conventions oder Events kennst, die für die Community interessant sein könnten,
                        kontaktiere uns gerne über unsere <a href="/#/kontakt/telegram">Telegram-Gruppe</a>.
                    </p>
                </div>
            </ScrollAnimation>
        </div>
    );
}

export default Mehr;