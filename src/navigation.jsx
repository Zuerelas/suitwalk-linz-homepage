import './navigation.css'
import { ChevronDown } from 'lucide-react';
import bannerImage from './img/banner-dark.jpg';
import { Link } from 'react-router-dom';
import React from 'react';

function showMenu(event) {
    // Get all dropdown menus
    const allMenus = document.querySelectorAll('.nav-element ul');
    const allChevrons = document.querySelectorAll('.chevron');

    // Get the clicked menu
    const clickedElement = event.currentTarget;
    const menu = clickedElement.querySelector('ul');
    const chevron = clickedElement.querySelector('.chevron');

    // Close all menus and reset all chevrons
    allMenus.forEach(item => {
        if (item !== menu) {
            item.classList.remove('show');
            item.classList.add('hide');
        }
    });

    allChevrons.forEach(item => {
        if (item !== chevron) {
            item.classList.remove('rotate');
        }
    });

    // Toggle the clicked menu
    menu.classList.toggle('show');
    menu.classList.toggle('hide');
    chevron.classList.toggle('rotate');
}


function Navigation() {
    return (
        <>
            <header>
                <Link to="/"><img src={bannerImage} alt="Banner" id="banner" /></Link>
            </header>
            <div className="nav-wrapper">
                <nav className="navigation">
                    <div className="nav-element">
                        <h2><Link to="/">Home</Link></h2>
                    </div>
                    <div className="nav-element collapse" onClick={showMenu}>
                        <h2>Info<ChevronDown className="chevron" /></h2>
                        <ul className="hide nav-list">
                            <li><Link to="/info/strecke">Strecke</Link></li>
                            <li><Link to="/info/anreise">Anreise</Link></li>
                            <li><Link to="/info/unterkunfts-moeglichkeiten">Unterkunfts-<br />möglichkeiten</Link></li>
                            <li><Link to="/info/ablauf">Ablauf</Link></li>
                            <li><Link to="/info/standort">Standort</Link></li>
                        </ul>
                    </div>
                    <div className="nav-element collapse" onClick={showMenu}>
                        <h2>Anmeldung<ChevronDown className="chevron" /></h2>
                        <ul className="hide nav-list">
                            <li><Link to="/anmeldung/suiter">Suiter</Link></li>
                            <li><Link to="/anmeldung/spotter">Spotter</Link></li>
                            <li><Link to="/anmeldung/sanitaeter">Sanitäter</Link></li>
                            <li><Link to="/anmeldung/fotografen">Fotografen</Link></li>
                            <li><Link to="/anmeldung/besucher">Besucher</Link></li>
                            <li><Link to="/anmeldung/badges">Badges</Link></li>
                        </ul>
                    </div>
                    <div className="nav-element">
                        <h2><Link to="/regeln">Regeln</Link></h2>
                    </div>
                    <div className="nav-element collapse" onClick={showMenu}>
                        <h2>Galerie<ChevronDown className="chevron" /></h2>
                        <ul className="hide nav-list">
                            <li><Link to="/galerie/fotos-fotografen">Fotos von Fotografen</Link></li>
                        </ul>
                    </div>
                    <div className="nav-element collapse" onClick={showMenu}>
                        <h2>Events<ChevronDown className="chevron" /></h2>
                        <ul className="hide nav-list">
                            <li><Link to="/events/furmeet-linz">Furmeet Linz</Link></li>
                            <li><Link to="/events/mehr">mehr</Link></li>
                        </ul>
                    </div>
                    <div className="nav-element collapse" onClick={showMenu}>
                        <h2>Kontakt<ChevronDown className="chevron" /></h2>
                        <ul className="hide nav-list">
                            <li><Link to="/kontakt/telegram">Telegram</Link></li>
                            <li><Link to="/kontakt/barq">Barq</Link></li>
                            <li><Link to="/kontakt/x">X</Link></li>
                            <li><Link to="/kontakt/paypal">PayPal</Link></li>
                        </ul>
                    </div>
                    <div className="nav-element">
                        <h2><Link to="/crew">Crew</Link></h2>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navigation