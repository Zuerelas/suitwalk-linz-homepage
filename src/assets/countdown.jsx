import React, { useState, useEffect } from 'react';
import '../pages/template.css';
import './countdown.css';

function Countdown({ targetDate, onComplete, titleText }) {
    const [timeLeft, setTimeLeft] = useState(calculateTime(targetDate));
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newTimeLeft = calculateTime(targetDate);
            setTimeLeft(newTimeLeft);

            if (newTimeLeft.total <= 0) {
                clearInterval(intervalId); // Stop the interval
                setIsComplete(true);
            }
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [targetDate]);

    function calculateTime(targetDate) {
        const target = new Date(targetDate || '2024-01-01T00:00:00');
        const currentDate = new Date();
        const timeDifference = target - currentDate;

        if (timeDifference <= 0) {
            return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        return {
            total: timeDifference,
            days: Math.floor(timeDifference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((timeDifference / 1000 / 60) % 60),
            seconds: Math.floor((timeDifference / 1000) % 60),
            targetdate: target.toLocaleDateString('de-DE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            })
        };
    }

    // Function to determine if a time unit is in "urgent" state (for styling)
    const isUrgent = (days, hours, minutes, seconds) => {
        // Add urgent class when less than 10 seconds left in total countdown
        return days === 0 && hours === 0 && minutes === 0 && seconds < 60;
    };

    if (isComplete) {
        onComplete(); // Call the onComplete function when countdown is complete
    }

    const urgentState = isUrgent(timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds);

    return (
        <div className='container'>
            <h2>{titleText || 'Countdown'}</h2>
            <div className="countdown">
                <div className={`countdown-item ${timeLeft.days === 0 && urgentState ? 'urgent' : ''}`}>
                    {timeLeft.days}
                </div>
                <div className={`countdown-item ${timeLeft.hours === 0 && urgentState ? 'urgent' : ''}`}>
                    {timeLeft.hours}
                </div>
                <div className={`countdown-item ${timeLeft.minutes === 0 && urgentState ? 'urgent' : ''}`}>
                    {timeLeft.minutes}
                </div>
                <div className={`countdown-item ${urgentState ? 'urgent' : ''}`}>
                    {timeLeft.seconds}
                </div>
            </div>
            <div className="countdown-labels">
                <div className="countdown-label">Tage</div>
                <div className="countdown-label">Stunden</div>
                <div className="countdown-label">Minuten</div>
                <div className="countdown-label">Sekunden</div>
            </div>
            <p>{timeLeft.targetdate}</p>
        </div>
    );
}

export default Countdown;
