import { useEffect, useRef } from 'react';

function TelegramLoginWidget({ botName, buttonSize = 'large', requestAccess = 'write', type, badge = false, onAuth }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Clear previous widget
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        // Use the official Telegram Login Widget
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?21';
        script.async = true;
        script.setAttribute('data-telegram-login', botName);
        script.setAttribute('data-size', buttonSize);
        
        // For photo uploads, use callback
        if (type === 'photo_upload' && onAuth) {
            // Define global callback
            window.onTelegramAuth = (user) => {
                console.log('Telegram auth successful:', user);
                if (onAuth) onAuth(user);
            };
            script.setAttribute('data-onauth', 'onTelegramAuth');
        } else {
            // For regular login flows, use auth URL
            const baseUrl = 'https://test.suitwalk-linz.at/api/telegram-auth';
            let authUrl = baseUrl;
            
            // Add query parameters if needed
            if (type || badge !== undefined) {
                const params = new URLSearchParams();
                if (type) params.append('custom_type', type);
                if (badge !== undefined) params.append('custom_badge', badge.toString());
                authUrl = `${baseUrl}?${params.toString()}`;
            }
            
            script.setAttribute('data-auth-url', authUrl);
        }
        
        script.setAttribute('data-request-access', requestAccess);
        
        // Append to container
        container.appendChild(script);
        
        return () => {
            if (window.onTelegramAuth) {
                delete window.onTelegramAuth;
            }
        };
    }, [botName, buttonSize, requestAccess, type, badge, onAuth]);

    return <div ref={containerRef}></div>;
}

export default TelegramLoginWidget;