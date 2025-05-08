import '../template.css';

function Erfolgreich() {
    return (
        <div className="container-content">
            <h1>Anmeldung erfolgreich!</h1>
            <div className="success-container">
                <div className="success-icon">✓</div>
                <h3>Vielen Dank für deine Anmeldung als Suiter!</h3>
                <p>Deine Daten wurden erfolgreich gespeichert.</p>
                <p>Wir freuen uns auf dich beim Suitwalk Linz!</p>
                <h2>Noch ein Badge gefällig?</h2>
                <p>Wenn du noch einen Badge für deinen Suit möchtest, kannst du ihn dir hier mitbestellen</p>
                <a href="/#/anmeldung/badges" className="badge-link">Badge bestellen</a>
            </div>
        </div>
    );
}

export default Erfolgreich;