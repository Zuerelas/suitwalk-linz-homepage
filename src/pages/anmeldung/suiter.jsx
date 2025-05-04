import '../template.css'
import Countdown from '../../assets/countdown';
import React from 'react';

function Suiter() {
    const onComplete = (
        <>
            <br />
            <h2>Die Anmeldung ist offen!</h2>
            <p>bitte hier anmelden:</p>
        </>
    );
    return (
        <div className="container-content">
            <h1>Suiter</h1>
            <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="SuitwalkLinz_bot"
                data-size="large" data-auth-url="test.suitwalk-linz.at/anmeldung/erfolgreich" data-request-access="write"></script>
            <Countdown targetDate={"2025-05-02T15:47:00"} onComplete={onComplete} titleText={"Zeit bis zur Anmeldung:"} />
        </div>
    );
}

export default Suiter;