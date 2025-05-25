import '../template.css';
import './sign-in.css';

function Abgemeldet() {
    return (
        <div className="container-content">
            <h1>Abmeldung erfolgreich</h1>
            <div className="success-container">
                <h3>Du wurdest erfolgreich abgemeldet</h3>
                <div className="success-icon">✓</div>
                <p>Deine persönlichen Daten wurden aus unserer Datenbank gelöscht.</p>
                <p>Solltest du es dir anders überlegen, kannst du dich jederzeit wieder anmelden.</p>
                <p>Wir würden uns freuen, dich in Zukunft wieder bei einem Suitwalk Linz begrüßen zu dürfen!</p>
            </div>
        </div>
    );
}

export default Abgemeldet;