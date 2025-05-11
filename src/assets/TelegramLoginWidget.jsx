import { useEffect, useRef } from 'react';

function TelegramLoginWidget({ botName, buttonSize = 'large', requestAccess = 'write', type, badge = false, onAuth }) {
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
        
        // Add type and badge to the auth URL
        const authUrl = new URL('https://test.suitwalk-linz.at/api/telegram-auth');
        if (type) authUrl.searchParams.append('custom_type', type);
        if (badge !== undefined) authUrl.searchParams.append('custom_badge', badge.toString());
        
        script.setAttribute('data-auth-url', authUrl.toString());
        script.setAttribute('data-request-access', requestAccess);
        
        // These aren't passed to the server but we'll keep them for consistency
        if (badge !== undefined) script.setAttribute('data-badge', badge.toString());
        if (type) script.setAttribute('data-type', type);

        // Handle Telegram authentication callback
        window.TelegramLoginCallback = (user) => {
            console.log('Telegram user authenticated:', user);
            if (onAuth) {
                onAuth(user); // Pass user data to parent component
            }
        };

        containerRef.current.appendChild(script);
    }, [botName, buttonSize, requestAccess, type, badge, onAuth]);

    return <div ref={containerRef} className="telegram-login-container"></div>;
}

export default TelegramLoginWidget;