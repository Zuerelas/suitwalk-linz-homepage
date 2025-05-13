import '../template.css';
import React, { useState } from 'react';
import TelegramLoginWidget from '../../assets/TelegramLoginWidget';

function Abmelden() {
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    return (
        <div className="container-content">
            <h1>Abmeldung vom Suitwalk Linz</h1>
            
            {!showConfirmation ? (
                <div className="registration-container">
                    <h2>Schade, dass du nicht mehr teilnehmen möchtest!</h2>
                    <p>Um dich abzumelden, bestätige bitte deine Identität mit deinem Telegram-Account:</p>
                    
                    <div className="telegram-widget-container">
                        <TelegramLoginWidget
                            botName="SuitwalkLinz_bot"
                            buttonSize="large"
                            requestAccess="write"
                            type="Abmelden"
                            onAuth={() => setShowConfirmation(true)}
                        />
                    </div>
                    
                    <div className="registration-info warning">
                        <p><strong>Achtung:</strong> Diese Aktion kann nicht rückgängig gemacht werden!</p>
                        <p>Deine persönlichen Daten werden vollständig aus unserer Datenbank gelöscht.</p>
                        <p>Du kannst dich später jederzeit wieder neu anmelden.</p>
                    </div>
                </div>
            ) : (
                <div className="confirmation-container">
                    <h2>Bist du sicher?</h2>
                    <p>Möchtest du dich wirklich vom Suitwalk Linz abmelden?</p>
                    <div className="confirmation-buttons">
                        <a href="/api/telegram-delete" className="delete-button">
                            Ja, abmelden
                        </a>
                        <button onClick={() => setShowConfirmation(false)} className="cancel-button">
                            Abbrechen
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Abmelden;