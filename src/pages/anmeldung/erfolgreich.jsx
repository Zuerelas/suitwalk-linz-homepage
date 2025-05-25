import '../template.css';
import './sign-in.css';

function Erfolgreich() {
    return (
        <div className="container-content">
            <h1>Anmeldung erfolgreich!</h1>
            <div className="success-container">
                <h3>Vielen Dank für deine Anmeldung!</h3>
                <div className="success-icon">✓</div>
                <p>Deine Daten wurden erfolgreich gespeichert.</p>
                <p>Wir freuen uns auf dich beim Suitwalk Linz!</p>
                <h2>Noch ein Badge gefällig?</h2>
                <p>Wenn du noch einen Badge möchtest, kannst du ihn dir hier bestellen, um ihn am Suitwalk abzuholen</p>
                <a href="/#/anmeldung/badges" className="badge-link">Badge bestellen</a>
            </div>
        </div>
    );
}

export default Erfolgreich;