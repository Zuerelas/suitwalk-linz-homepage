import '../template.css';
import Countdown from '../../assets/countdown';
import React, { useState } from 'react';

// Import the TelegramLoginWidget component
// You'll need to create this file at src/components/TelegramLoginWidget.jsx
import TelegramLoginWidget from '../../assets/TelegramLoginWidget';

function Suiter() {
    const [countdownComplete, setCountdownComplete] = useState(false);

    const handleCountdownComplete = () => {
        setCountdownComplete(true);
    };

    return (
        <div className="container-content">
            <h1>Suiter-Anmeldung</h1>

            {!countdownComplete ? (
                <Countdown
                    targetDate="2025-05-02T15:47:00"
                    onComplete={handleCountdownComplete}
                    titleText="Zeit bis zur Anmeldung:"
                />
            ) : (
                <div className="registration-container">
                    <h2>Die Anmeldung ist offen!</h2>
                    <p>Bitte melde dich mit deinem Telegram-Account an:</p>

                    <div className="telegram-widget-container">
                        <TelegramLoginWidget
                            botName="SuitwalkLinz_bot"
                            authUrl="https://api.suitwalk-linz.at/api/telegram-auth"
                            buttonSize="large"
                            requestAccess="write"
                            redirectUrl="https://test.suitwalk-linz.at/anmeldung/erfolgreich"
                        />
                    </div>

                    <div className="registration-info">
                        <p>Nach der Anmeldung mit Telegram werden deine Daten sicher in unsere Datenbank übertragen.</p>
                        <p>Bei Fragen kontaktiere uns bitte über die <a href="/kontakt/telegram">Telegram-Gruppe</a>.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Suiter;