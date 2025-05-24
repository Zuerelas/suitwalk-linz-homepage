import '../template.css';
import Countdown from '../../assets/countdown';
import React, { useState, useEffect } from 'react';
import TelegramLoginWidget from '../../assets/TelegramLoginWidget';

function Badges() {
    const [registrationOpen, setRegistrationOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    error;
    
    useEffect(() => {
        const checkRegistrationStatus = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://suitwalk-linz-backend.vercel.app/api/registration-status');
                
                if (!response.ok) {
                    throw new Error('Fehler beim Abrufen des Registrierungsstatus');
                }
                
                const data = await response.json();
                // Allow badge registration if general registration is open or event hasn't happened yet
                setRegistrationOpen(data.status === 'open' || data.status === 'closed');
            } catch (err) {
                console.error('Error checking registration status:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        checkRegistrationStatus();
    }, []);

    if (loading) {
        return (
            <div className="container-content">
                <h1>Badge-Anmeldung</h1>
                <div className="loading-container">
                    <p>Lade Anmeldestatus...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container-content">
            <h1>Badge-Anmeldung</h1>
            {!registrationOpen ? (
                <Countdown
                    countdownType="registration"
                    titleText="Die Badge-Anmeldung öffnet mit der Teilnehmer-Anmeldung:"
                />
            ) : (
                <div className="registration-container">
                    <h2>Die Badge-Anmeldung ist offen!</h2>
                    <p>Ein Badge kostet 5€.</p>
                    <p>Die Badges werden am Suitwalk bezahlt und verkauft.</p>
                    <p>Bitte melde dich mit deinem Telegram-Account an:</p>
    
                    <div className="telegram-widget-container">
                        <TelegramLoginWidget
                            botName="SuitwalkLinz_bot"
                            buttonSize="large"
                            requestAccess="write"
                            type="Badges"
                            badge={true}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Badges;