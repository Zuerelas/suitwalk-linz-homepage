import React, { useState, useEffect } from 'react';
import '../pages/template.css';
import './countdown.css';

function Countdown({ targetDate: propTargetDate, onComplete, titleText, countdownType = 'event' }) {
    const [timeLeft, setTimeLeft] = useState({ total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isComplete, setIsComplete] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [eventData, setEventData] = useState(null);
    const [targetDate, setTargetDate] = useState(propTargetDate);

    // Fetch the next event data when component mounts
    useEffect(() => {
        // Skip API call if target date is explicitly provided through props
        if (propTargetDate) {
            setLoading(false);
            setTargetDate(propTargetDate);
            return;
        }

        const fetchNextEvent = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://suitwalk-linz-backend.vercel.app/api/registration-status');
                
                if (!response.ok) {
                    throw new Error(`Server returned ${response.status}`);
                }
                
                const data = await response.json();
                setEventData(data);
                
                if (data.event) {
                    // Determine which date to count down to based on countdownType and event status
                    let dateToUse;
                    
                    if (countdownType === 'registration' && data.status === 'not_yet_open') {
                        // Count down to registration opening
                        dateToUse = new Date(data.event.sign_in_start);
                    } else if (data.status === 'open' || data.status === 'closed') {
                        // Count down to the event itself
                        dateToUse = new Date(data.event.event_date);
                    } else if (data.status === 'past') {
                        // Event has passed
                        setIsComplete(true);
                        dateToUse = new Date(data.event.event_date);
                    } else {
                        // Default: count down to the event
                        dateToUse = new Date(data.event.event_date);
                    }
                    
                    setTargetDate(dateToUse.toISOString());
                } else {
                    // No event found, use fallback date
                    const fallbackDate = new Date();
                    fallbackDate.setMonth(fallbackDate.getMonth() + 1); // Fallback: 1 month from now
                    setTargetDate(fallbackDate.toISOString());
                    setError('Kein Suitwalk-Event gefunden');
                }
            } catch (err) {
                console.error('Error fetching next event:', err);
                setError('Fehler beim Laden des nächsten Events');
                
                // Use fallback date
                const fallbackDate = new Date();
                fallbackDate.setMonth(fallbackDate.getMonth() + 1);
                setTargetDate(fallbackDate.toISOString());
            } finally {
                setLoading(false);
            }
        };

        fetchNextEvent();
    }, [propTargetDate, countdownType]);

    // Update countdown every second
    useEffect(() => {
        if (!targetDate || loading) return;
        
        const updateCountdown = () => {
            const newTimeLeft = calculateTime(targetDate);
            setTimeLeft(newTimeLeft);

            if (newTimeLeft.total <= 0) {
                clearInterval(intervalId);
                setIsComplete(true);
                if (onComplete) onComplete();
            }
        };
        
        // Initial calculation
        updateCountdown();
        
        // Setup interval
        const intervalId = setInterval(updateCountdown, 1000);
        
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, [targetDate, loading, onComplete]);

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
            targetdate: target.toLocaleString('de-DE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    }

    // Function to determine if a time unit is in "urgent" state (for styling)
    const isUrgent = (days, hours, minutes, seconds) => {
        // Add urgent class when less than 1 minute left in total countdown
        return days === 0 && hours === 0 && minutes === 0 && seconds < 60;
    };

    // Handle completion
    if (isComplete && onComplete) {
        onComplete();
    }

    const urgentState = isUrgent(timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds);

    // Generate the title text based on event data
    const getGeneratedTitleText = () => {
        if (titleText) return titleText;
        
        if (!eventData || !eventData.event) return 'Countdown';
        
        if (eventData.status === 'not_yet_open' && countdownType === 'registration') {
            return 'Anmeldung öffnet in:';
        } else if (eventData.status === 'open') {
            return 'Suitwalk startet in:';
        } else if (eventData.status === 'closed') {
            return 'Suitwalk startet in:';
        } else {
            return 'Nächster Suitwalk:';
        }
    };

    if (loading) {
        return <div className="container"><p>Lädt Countdown...</p></div>;
    }

    if (error) {
        return (
            <div className="container">
                <div className="countdown-error">
                    <p>{error}</p>
                    <p>Wird aktualisiert, sobald ein neuer Suitwalk geplant ist.</p>
                </div>
            </div>
        );
    }

    return (
        <div className='container'>
            <h2>{getGeneratedTitleText()}</h2>
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
            
            {/* Optional: Display event info */}
            {eventData && eventData.event && (
                <div className="event-info">
                    <p className="event-title">{eventData.event.title || 'Suitwalk Linz'}</p>
                    {eventData.status === 'open' && (
                        <p className="registration-status open">Anmeldung ist aktuell geöffnet!</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Countdown;
