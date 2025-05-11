import '../template.css';
import './sign-in.css';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Error() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    
    useEffect(() => {
        const msg = searchParams.get('msg') || 'unknown_error';
        
        const errorMessages = {
            'no_data': 'Keine Anmeldedaten erhalten. Bitte versuche es erneut.',
            'invalid_auth': 'Die Authentifizierung ist fehlgeschlagen.',
            'auth_expired': 'Die Authentifizierung ist abgelaufen. Bitte versuche es erneut.',
            'server_error': 'Ein Serverfehler ist aufgetreten. Bitte versuche es später erneut.',
            'unknown_error': 'Ein unbekannter Fehler ist aufgetreten.',
            'telegram_id_missing': 'Die Telegram-ID ist erforderlich.',
            'register_first': 'Du musst dich zuerst registrieren, um ein Badge zu bestellen.',
            'database_error': 'Es gibt ein Problem mit der Datenbank. Bitte versuche es später erneut.'
        };
        
        setErrorMessage(errorMessages[msg]);
    }, [searchParams, navigate]);

    const handleTryAgain = () => {
        navigate(-1); // Go back to previous page
    };

    return (
        <div className="container-content">
            <h1>Fehler bei der Anmeldung</h1>
            <div className="error-container">
                <h3>Etwas ist schiefgelaufen</h3>
                <div className="error-icon">✗</div>
                <p>{errorMessage}</p>
                <p>Wenn dieser Fehler öfter auftritt, kontaktiere bitte <a href="https://test.suitwalk-linz.at/#/crew">ein Teammitglied</a></p>
                <button onClick={handleTryAgain} className="try-again-button">
                    Zurück zur Anmeldung
                </button>
            </div>
        </div>
    );
}

export default Error;