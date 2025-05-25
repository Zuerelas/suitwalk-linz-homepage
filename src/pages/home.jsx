import { Link } from 'react-router-dom';
import React from 'react';
import backBanner from '../img/suitwalk-banner.JPG';
import './template.css';
import ScrollAnimation from '../ScrollAnimation';
import Countdown from '../assets/countdown';
import SuitwalkUsers from '../assets/suitwalkUsers';

function Home() {
    return (
        <div className="home-container">
            <div className="home-banner" style={{ backgroundImage: `url(${backBanner})` }}>
                <ScrollAnimation className="banner-title">
                    <h1>Suitwalk Linz</h1>
                </ScrollAnimation>
                <ScrollAnimation>
                    <p>Der Größte Suitwalk Österreichs</p>
                </ScrollAnimation>
                <div className="banner-buttons">
                    <ScrollAnimation>
                        <Link to="/info/strecke" className="banner-button">Route ansehen</Link>
                    </ScrollAnimation>
                    <ScrollAnimation>
                        <Link to="/anmeldung/suiter" className="banner-button secondary">Jetzt anmelden</Link>
                    </ScrollAnimation>
                </div>
            </div>

            <div className="container-content">
                <ScrollAnimation>
                    <h2>Worum geht es?</h2>
                </ScrollAnimation>
                <ScrollAnimation>
                    <p>
                        Der Suitwalk Linz ist die erste Fursuit-Parade durch die Innenstadt von Linz.
                        Wir laden alle Furry-Interessenten, Fursuiter und Interessierte ein, Teil dieses einzigartigen Events zu sein.
                        Der Suitwalk führt durch die schönsten Ecken von Linz.
                    </p>
                </ScrollAnimation>

                <ScrollAnimation>
                    <h2>Was erwartet dich?</h2>
                </ScrollAnimation>
                <ScrollAnimation>
                    <p>
                        Eine bunte Parade mit Fursuitern aus ganz Österreich und den Nachbarländern, gemeinsame Fotosessions
                        an Sehenswürdigkeiten, Spaß mit Gleichgesinnten und ein unvergessliches Erlebnis für alle Teilnehmer.
                        Für Fursuiter, Spotter und Fotografen gibt es verschiedene Anmeldemöglichkeiten.
                    </p>
                </ScrollAnimation>

                <ScrollAnimation>
                    <h2>Sei dabei!</h2>
                </ScrollAnimation>
                <ScrollAnimation>
                    <p>
                        Egal ob im Fursuit, als Helfer oder Zuschauer - bei dem Suitwalk Linz ist jeder willkommen!
                        Informiere dich über die Anmeldung und werde Teil dieser aufregenden Veranstaltung.
                    </p>
                </ScrollAnimation>

                <ScrollAnimation>
                    <h1>Unser nächster Suitwalk:</h1>
                </ScrollAnimation>
                <ScrollAnimation>
                    <Countdown 
                        countdownType="event"
                        titleText="Zeit bis zum nächsten Suitwalk:"
                    />
                </ScrollAnimation>
                <ScrollAnimation>
                    <SuitwalkUsers />
                </ScrollAnimation>

            </div>
        </div>
    );
}

export default Home;