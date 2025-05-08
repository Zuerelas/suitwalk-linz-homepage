import '../template.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Erfolgreich() {
    const navigate = useNavigate();
    
    useEffect(() => {
        // Optional: Redirect to home page after 5 seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);
        
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="container-content">
            <h1>Anmeldung erfolgreich!</h1>
            <div className="success-container">
                <div className="success-icon">✓</div>
                <p>Vielen Dank für deine Anmeldung als Suiter!</p>
                <p>Deine Daten wurden erfolgreich gespeichert.</p>
                <p>Wir freuen uns auf dich beim Suitwalk Linz!</p>
                <p>Du wirst in einigen Sekunden zur Startseite weitergeleitet...</p>
            </div>
        </div>
    );
}

export default Erfolgreich;