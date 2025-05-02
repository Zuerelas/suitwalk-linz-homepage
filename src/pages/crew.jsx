import { Link } from 'react-router-dom';
import React from 'react';
import ScrollAnimation from '../ScrollAnimation';
import './template.css';
import './crew.css';

function Crew() {
    return (
        <div className="content-container">
            <div className="container-content">
                <ScrollAnimation>
                    <h1>Unsere Crew</h1>
                </ScrollAnimation>
                <ScrollAnimation>
                    <p>
                        Hier stellen wir dir das Team hinter dem Suitwalk Linz vor. Ohne diese engagierten Menschen wäre unser Event nicht möglich.
                    </p>
                </ScrollAnimation>

                <div className="crew-section">
                    <ScrollAnimation>
                        <h2>Organisatoren</h2>
                    </ScrollAnimation>
                    <div className="crew-members">
                        <a href="https://t.me/AmaroTheDragon" className="crew-member">
                            <ScrollAnimation>
                                <div>
                                    <div className="crew-image" id='amaro'></div>
                                    <h3>Amaro</h3>
                                    <p className="crew-role">Hauptorganisator</p>
                                </div>
                            </ScrollAnimation>
                        </a>

                        <a href="https://t.me/Ksalir_1" className="crew-member">
                            <ScrollAnimation>
                                <div>
                                    <div className="crew-image" id='ksalir'></div>
                                    <h3>Ksalir</h3>
                                    <p className="crew-role">2. Hauptorganisator</p>
                                </div>
                            </ScrollAnimation>
                        </a>
                    </div>
                </div>

                <div className="crew-section">
                    <ScrollAnimation>
                        <h2>Support-Team</h2>
                    </ScrollAnimation>
                    <div className="crew-members">
                        <a href="https://t.me/TheDelta194" className="crew-member">
                            <ScrollAnimation>
                                <div>
                                    <div className="crew-image" id='delta'></div>
                                    <h3>Delta</h3>
                                    <p className="crew-role">IT- & Websitemanager</p>
                                    <p className='about'>IT Manager und Programmierer dieser Website</p>
                                </div>
                            </ScrollAnimation>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

<div className="crew-member">
    <div className="crew-image placeholder"></div>
    <h3>Kruemel</h3>
    <p className="crew-role">Management</p>
    <p>.</p>
</div>
export default Crew;