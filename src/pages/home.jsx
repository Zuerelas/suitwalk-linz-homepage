import './home.css';
import { Link } from 'react-router-dom';
import React from 'react';
import backBanner from '../img/suitwalk-banner.JPG';
import './template.css';

function Home() {
    return (
        <div className="home-container">
            <div className="home-banner" style={{ backgroundImage: `url(${backBanner})` }}>
                <h1>Suitwalk Linz</h1>
                <p>Der Größte Suitwalk Österreichs</p>
                <div className="banner-buttons">
                    <Link to="/info/strecke" className="banner-button">Route ansehen</Link>
                    <Link to="/anmeldung/suiter" className="banner-button secondary">Jetzt anmelden</Link>
                </div>
            </div>

            <div className="home-content">
                <h2>Worum geht es?</h2>
                <p>
                    Die Suitwalk Linz ist die erste offizielle Fursuit-Parade durch die Innenstadt von Linz.
                    Wir laden alle Furry-Enthusiasten, Fursuiter und Interessierte ein, Teil dieses einzigartigen Events zu sein.
                    Die Parade führt durch die schönsten Ecken von Linz.
                </p>

                <h2>Was erwartet dich?</h2>
                <p>
                    Eine bunte Parade mit Fursuitern aus ganz Österreich und den Nachbarländern, gemeinsame Fotosessions
                    an Sehenswürdigkeiten, Spaß mit Gleichgesinnten und ein unvergessliches Erlebnis für alle Teilnehmer.
                    Für Fursuiter, Spotter und Fotografen gibt es verschiedene Anmeldemöglichkeiten.
                </p>

                <h2>Sei dabei!</h2>
                <p>
                    Egal ob im Fursuit, als Helfer oder Zuschauer - bei der Suitwalk Linz ist jeder willkommen!
                    Informiere dich über die Anmeldemodalitäten und werde Teil dieser aufregenden Veranstaltung.
                </p>
                <Link to="/anmeldung/suiter" className="home-link">Zur Anmeldung</Link>
            </div>
        </div>
    );
}

export default Home;