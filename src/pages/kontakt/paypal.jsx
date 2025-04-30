import '../template.css'
import './paypal.css'
import { useEffect } from 'react'

function Paypal() {
    useEffect(() => {
        // Animation for slide-in elements
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.slide-in').forEach(el => {
            observer.observe(el);
        });

        return () => {
            document.querySelectorAll('.slide-in').forEach(el => {
                observer.unobserve(el);
            });
        };
    }, []);

    return (
        <div className="container-content">
            <h1 className="slide-in">Auf PayPal spenden</h1>
            <div className="donation-section slide-in">
                <h2>Unterstütze den Suitwalk Linz</h2>
                <p>Mit deiner Spende hilfst du uns, den Suitwalk Linz weiterzuführen und zu verbessern. Jeder Beitrag zählt!</p>

                <div className="paypal-container slide-in">
                    <h3>Über PayPal spenden</h3>
                    <p>Schnell und sicher - unterstütze uns mit deiner Spende:</p>
                    <a
                        href="https://www.paypal.com/donate?hosted_button_id=YOURID"
                        className="paypal-button"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src="https://www.paypalobjects.com/webstatic/de_DE/i/de-pp-logo-150px.png" alt="PayPal Logo" />
                        <span>Jetzt spenden</span>
                    </a>
                    <p className="donation-note">Deine Unterstützung hilft uns, kommende Events zu organisieren und die Suitwalk-Community in Linz zu stärken!</p>
                </div>
            </div>

            <div className="about-donation slide-in">
                <h2>Wofür werden die Spenden verwendet?</h2>
                <ul>
                    <li>Organisation von Suitwalk-Veranstaltungen</li>
                    <li>Websitepflege und technische Infrastruktur</li>
                    <li>Community Events</li>
                </ul>
            </div>

            <div className="thank-you slide-in">
                <p>Herzlichen Dank für dein Unterstützung!</p>
            </div>
        </div>
    );
}
export default Paypal;