import '../template.css'
import Countdown from '../../assets/countdown';
import React from 'react';

function Suiter() {
    const onComplete = (
        <>
            <h2>Die Anmeldung ist offen!</h2>
            <p>bitte hier anmelden:</p>
        </>
    );
    return (
        <div className="container-content">
            <h1>Suiter</h1>
            <Countdown targetDate={"2025-05-02T15:47:00"} onComplete={onComplete} titleText={"Zeit bis zur Anmeldung:"} />
        </div>
    );
}

export default Suiter;