import '../template.css';
import React, { useState } from 'react';
import TelegramLoginWidget from '../../assets/TelegramLoginWidget';
import Countdown from '../../assets/countdown';

function Badges() {
    const [countdownComplete, setCountdownComplete] = useState(true); // Set to true for testing
        
        const handleCountdownComplete = () => {
            setCountdownComplete(true);
        }

    return (
        <div className="container-content">
                    <h1>Badge-Anmeldung</h1>
                    {!countdownComplete ? (
                        <Countdown
                            targetDate="2025-05-02T15:47:00"
                            onComplete={handleCountdownComplete}
                            titleText="Zeit bis zur Anmeldung:"
                        />
                    ) : (
                        <div className="registration-container">
                            <h2>Die Anmeldung ist offen!</h2>
                            <p>Ein Badge kostet 5€.</p>
                            <p>Die Badges werden am Suitwalk bezahlt je nach bestellung verkauft.</p>
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
        
                            <div className="registration-info">
                                <p>Nach der Anmeldung mit Telegram werden deine Daten sicher in unsere Datenbank übertragen.</p>
                                <p>Bei Fragen kontaktiere uns bitte über die <a href="/#/kontakt/telegram">Telegram-Gruppe</a>.</p>
                            </div>
                        </div>
                    )}
                </div>
    );
}

export default Badges;