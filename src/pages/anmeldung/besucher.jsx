import '../template.css';
import Countdown from '../../assets/countdown';
import React, { useState, useEffect } from 'react';
import TelegramLoginWidget from '../../assets/TelegramLoginWidget';

function Besucher() {
    const [registrationOpen, setRegistrationOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Check registration status when component mounts
    useEffect(() => {
        const checkRegistrationStatus = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://suitwalk-linz-backend.vercel.app/api/registration-status');
                
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen des Registrierungsstatus');
                }
                
                const data = await response.json();
                setRegistrationOpen(data.status === 'open');
            } catch (err) {
                console.error('Error checking registration status:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        checkRegistrationStatus();
    }, []);
    
    const handleCountdownComplete = () => {
        setRegistrationOpen(true);
    };

    if (loading) {
        return (
            <div className="container-content">
                <h1>Besucher-Anmeldung</h1>
                <div className="loading-container">
                    <p>Lade Anmeldestatus...</p>
                </div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="container-content">
                <h1>Besucher-Anmeldung</h1>
                <div className="error-message">
                    <p>Es gab ein Problem beim Laden des Anmeldestatus: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-content">
            <h1>Besucher-Anmeldung</h1>
            {!registrationOpen ? (
                <Countdown
                    countdownType="registration"
                    onComplete={handleCountdownComplete}
                    titleText="Die Anmeldung öffnet in:"
                />
            ) : (
                <div className="registration-container">
                    <h2>Die Anmeldung ist offen!</h2>
                    <p>Bitte melde dich mit deinem Telegram-Account an:</p>

                    <div className="telegram-widget-container">
                        <TelegramLoginWidget
                            botName="SuitwalkLinz_bot"
                            buttonSize="large"
                            requestAccess="write"
                            type="Besucher"
                            badge={false}
                        />
                    </div>

                    <div className="registration-info">
                        <p>Nach der Anmeldung mit Telegram werden deine Daten sicher in unsere Datenbank übertragen.</p>
                        <p>Bei Fragen kontaktiere uns bitte über die <a href="/#/kontakt/telegram">Telegram-Gruppe</a>.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Besucher;