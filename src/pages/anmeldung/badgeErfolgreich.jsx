import '../template.css';
import './sign-in.css';
import { Link } from 'react-router-dom';

function BadgeErfolgreich() {
    return (
        <div className="container-content">
            <h1>Badge erfolgreich bestellt!</h1>
            <div className="success-container">
                <h3>Dein Badge wurde erfolgreich reserviert!</h3>
                <div className="success-icon">✓</div>
                <p>Wir haben deine Badge-Bestellung gespeichert.</p>
                <p>Das Badge kostet <strong>5€</strong> und wird am Suitwalk ausgegeben.</p>
                
                <div className="badge-info">
                    <h4>Wichtige Informationen:</h4>
                    <ul>
                        <li>Bezahlung erfolgt <strong>bar</strong> am Suitwalk</li>
                        <li>Bitte hole deinen Badge <strong>vor dem Start</strong> des Suitwalks ab</li>
                        <li>Zeige beim Abholen deinen <strong>Telegram-Namen</strong></li>
                    </ul>
                </div>
                
                <div className="action-buttons">
                    <Link to="/" className="primary-button">Zurück zur Startseite</Link>
                    <Link to="/anmeldung" className="secondary-button">Zurück zur Anmeldung</Link>
                </div>
            </div>
        </div>
    );
}

export default BadgeErfolgreich;