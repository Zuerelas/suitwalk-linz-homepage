import { useEffect, useRef } from 'react';

function TelegramLoginWidget({ botName, buttonSize = 'large', requestAccess = 'write', type, badge = false }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        while (containerRef.current.firstChild) {
            containerRef.current.removeChild(containerRef.current.firstChild);
        }

        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.async = true;
        script.setAttribute('data-telegram-login', botName);
        script.setAttribute('data-size', buttonSize);
        
        // Use test.suitwalk-linz.at domain (must match domain in BotFather)
        script.setAttribute('data-auth-url', 'https://test.suitwalk-linz.at/api/telegram-auth');
        script.setAttribute('data-redirect-url', 'https://test.suitwalk-linz.at/#/anmeldung/erfolgreich');
        script.setAttribute('data-request-access', requestAccess);
        
        // Add custom parameters
        if (type) script.setAttribute('data-type', type);
        if (badge !== undefined) script.setAttribute('data-badge', badge.toString());
        
        // Log for debugging
        console.log('Telegram widget initialized with:', {
            'data-telegram-login': botName,
            'data-auth-url': 'https://test.suitwalk-linz.at/api/telegram-auth',
            'data-redirect-url': 'https://test.suitwalk-linz.at/#/anmeldung/erfolgreich',
            'data-type': type,
            'data-badge': badge
        });

        containerRef.current.appendChild(script);
    }, [botName, buttonSize, requestAccess, type, badge]);

    return <div ref={containerRef} className="telegram-login-container"></div>;
}

export default TelegramLoginWidget;