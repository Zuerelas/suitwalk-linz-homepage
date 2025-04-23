import './navigation.css'
import { ChevronDown, Menu, X } from 'lucide-react';
import bannerImage from './img/banner-dark.jpg';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [activeMenu, setActiveMenu] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            if (window.innerWidth > 1300) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const showMenu = (event, menuName) => {
        // Prevent the event from bubbling up to parent elements
        event.stopPropagation();

        if (windowWidth <= 1300) {
            // Mobile view - toggle the specific dropdown
            setActiveMenu(activeMenu === menuName ? null : menuName);
            return;
        }

        // Desktop view - original dropdown behavior
        const clickedElement = event.currentTarget;
        const menu = clickedElement.querySelector('ul');
        const chevron = clickedElement.querySelector('.chevron');

        // Get all desktop dropdowns
        const allMenus = document.querySelectorAll('.nav-element ul');
        const allChevrons = document.querySelectorAll('.chevron');

        // Close all menus and reset all chevrons except current one
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
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        // Reset active menu when closing the mobile menu
        if (mobileMenuOpen) {
            setActiveMenu(null);
        }
    };

    // Helper function to handle link clicks in mobile view
    const handleLinkClick = () => {
        setMobileMenuOpen(false);
        setActiveMenu(null);
    };

    return (
        <>
            <header>
                <Link to="/"><img src={bannerImage} alt="Banner" id="banner" /></Link>
            </header>
            <div className="nav-wrapper">
                <div className="hamburger-menu">
                    <button className="hamburger-button" onClick={toggleMobileMenu} id="menuX">
                        {mobileMenuOpen ? <X size={50} id='menuX' /> : <Menu size={50} />}
                    </button>
                </div>
                <nav className={`navigation ${mobileMenuOpen ? 'mobile-open' : ''}`}>
                    <div className="nav-element">
                        <h2><Link to="/" onClick={handleLinkClick}>Home</Link></h2>
                    </div>

                    <div
                        className={`nav-element collapse ${activeMenu === 'info' ? 'mobile-active' : ''}`}
                        onClick={(e) => showMenu(e, 'info')}
                    >
                        <h2>Info<ChevronDown className={`chevron ${activeMenu === 'info' ? 'rotate' : ''}`} /></h2>
                        <ul className={`${windowWidth <= 1300 ? (activeMenu === 'info' ? 'mobile-show' : 'mobile-hide') : 'hide'} nav-list`}>
                            <li><Link to="/info/strecke" onClick={handleLinkClick}>Strecke</Link></li>
                            <li><Link to="/info/anreise" onClick={handleLinkClick}>Anreise</Link></li>
                            <li><Link to="/info/unterkunfts-moeglichkeiten" onClick={handleLinkClick}>Unterkunfts-<br />möglichkeiten</Link></li>
                            <li><Link to="/info/ablauf" onClick={handleLinkClick}>Ablauf</Link></li>
                            <li><Link to="/info/standort" onClick={handleLinkClick}>Standort</Link></li>
                        </ul>
                    </div>

                    <div
                        className={`nav-element collapse ${activeMenu === 'anmeldung' ? 'mobile-active' : ''}`}
                        onClick={(e) => showMenu(e, 'anmeldung')}
                    >
                        <h2>Anmeldung<ChevronDown className={`chevron ${activeMenu === 'anmeldung' ? 'rotate' : ''}`} /></h2>
                        <ul className={`${windowWidth <= 1300 ? (activeMenu === 'anmeldung' ? 'mobile-show' : 'mobile-hide') : 'hide'} nav-list`}>
                            <li><Link to="/anmeldung/suiter" onClick={handleLinkClick}>Suiter</Link></li>
                            <li><Link to="/anmeldung/spotter" onClick={handleLinkClick}>Spotter</Link></li>
                            <li><Link to="/anmeldung/sanitaeter" onClick={handleLinkClick}>Sanitäter</Link></li>
                            <li><Link to="/anmeldung/fotografen" onClick={handleLinkClick}>Fotografen</Link></li>
                            <li><Link to="/anmeldung/besucher" onClick={handleLinkClick}>Besucher</Link></li>
                            <li><Link to="/anmeldung/badges" onClick={handleLinkClick}>Badges</Link></li>
                        </ul>
                    </div>

                    <div className="nav-element">
                        <h2><Link to="/regeln" onClick={handleLinkClick}>Regeln</Link></h2>
                    </div>

                    <div
                        className={`nav-element collapse ${activeMenu === 'galerie' ? 'mobile-active' : ''}`}
                        onClick={(e) => showMenu(e, 'galerie')}
                    >
                        <h2>Galerie<ChevronDown className={`chevron ${activeMenu === 'galerie' ? 'rotate' : ''}`} /></h2>
                        <ul className={`${windowWidth <= 1300 ? (activeMenu === 'galerie' ? 'mobile-show' : 'mobile-hide') : 'hide'} nav-list`}>
                            <li><Link to="/galerie/fotos-fotografen" onClick={handleLinkClick}>Fotos von Fotografen</Link></li>
                        </ul>
                    </div>

                    <div
                        className={`nav-element collapse ${activeMenu === 'events' ? 'mobile-active' : ''}`}
                        onClick={(e) => showMenu(e, 'events')}
                    >
                        <h2>Events<ChevronDown className={`chevron ${activeMenu === 'events' ? 'rotate' : ''}`} /></h2>
                        <ul className={`${windowWidth <= 1300 ? (activeMenu === 'events' ? 'mobile-show' : 'mobile-hide') : 'hide'} nav-list`}>
                            <li><Link to="/events/furmeet-linz" onClick={handleLinkClick}>Furmeet Linz</Link></li>
                            <li><Link to="/events/mehr" onClick={handleLinkClick}>mehr</Link></li>
                        </ul>
                    </div>

                    <div
                        className={`nav-element collapse ${activeMenu === 'kontakt' ? 'mobile-active' : ''}`}
                        onClick={(e) => showMenu(e, 'kontakt')}
                    >
                        <h2>Kontakt<ChevronDown className={`chevron ${activeMenu === 'kontakt' ? 'rotate' : ''}`} /></h2>
                        <ul className={`${windowWidth <= 1300 ? (activeMenu === 'kontakt' ? 'mobile-show' : 'mobile-hide') : 'hide'} nav-list`}>
                            <li><Link to="/kontakt/telegram" onClick={handleLinkClick}>Telegram</Link></li>
                            <li><Link to="/kontakt/barq" onClick={handleLinkClick}>Barq</Link></li>
                            <li><Link to="/kontakt/x" onClick={handleLinkClick}>X</Link></li>
                            <li><Link to="/kontakt/paypal" onClick={handleLinkClick}>PayPal</Link></li>
                        </ul>
                    </div>

                    <div className="nav-element">
                        <h2><Link to="/crew" onClick={handleLinkClick}>Crew</Link></h2>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navigation