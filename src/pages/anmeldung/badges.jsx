import '../template.css';
import { useState } from 'react';
import TelegramLoginWidget from '../../assets/TelegramLoginWidget';

function Badges() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [orderStatus, setOrderStatus] = useState(null);

    const handleTelegramAuth = (data) => {
        setIsLoggedIn(true);
        setUserData(data);
    };

    const handleOrderBadge = async () => {
        if (!userData) return;

        try {
            const response = await fetch('https://test.suitwalk-linz.at/api/order-badge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    telegram_id: userData.id,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setOrderStatus('success');
            } else {
                setOrderStatus('error');
                console.error('Error ordering badge:', result.message);
            }
        } catch (error) {
            setOrderStatus('error');
            console.error('Error ordering badge:', error);
        }
    };

    return (
        <div className="container-content">
            <h1>Badge Bestellung</h1>
            {!isLoggedIn ? (
                <div>
                    <p>Bitte melde dich mit deinem Telegram-Account an, um ein Badge zu bestellen.</p>
                    <TelegramLoginWidget
                        botName="SuitwalkLinz_bot"
                        buttonSize="large"
                        requestAccess="write"
                        onAuth={handleTelegramAuth}
                    />
                </div>
            ) : (
                <div>
                    <h2>Willkommen, {userData.first_name}!</h2>
                    <p>Ein Badge kostet 5 Euro und kann hier bestellt werden. Du erhältst es beim Suitwalk.</p>
                    <button onClick={handleOrderBadge} className="try-again-button">
                        Badge bestellen
                    </button>
                    {orderStatus === 'success' && <p className="success-message">Dein Badge wurde erfolgreich bestellt!</p>}
                    {orderStatus === 'error' && <p className="error-message">Es gab ein Problem bei der Bestellung. Bitte versuche es erneut.</p>}
                </div>
            )}
        </div>
    );
}

export default Badges;