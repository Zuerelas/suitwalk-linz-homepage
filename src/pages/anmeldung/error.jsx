import '../template.css';
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
            'unknown_error': 'Ein unbekannter Fehler ist aufgetreten.'
        };
        
        setErrorMessage(errorMessages[msg]);
    }, [searchParams, navigate]);

    return (
        <div className="container-content">
            <h1>Fehler bei der Anmeldung</h1>
            <div className="error-container">
                <div className="error-icon">✗</div>
                <p>{errorMessage}</p>
                <p>Wenn du ein Badge bestellen möchtest musst du dich vorher normal anmelden</p>
                <button onClick={() => navigate('/anmeldung/suiter')} className="try-again-button">
                    Erneut versuchen (als Suiter anmelden)
                </button>
            </div>
        </div>
    );
}

export default Error;