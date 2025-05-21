import React, { useEffect, useRef } from 'react';

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

        // Use auth URL for all flows, including photo upload
        const baseUrl = 'https://test.suitwalk-linz.at/api/telegram-auth';
        const params = new URLSearchParams();

        // Add query parameters if needed
        if (type) params.append('custom_type', type);
        if (badge !== undefined) params.append('custom_badge', badge.toString());
        const authUrl = `${baseUrl}?${params.toString()}`;

        script.setAttribute('data-auth-url', authUrl);
        script.setAttribute('data-request-access', requestAccess);

        // Append the script to the container
        container.appendChild(script);

        if (onAuth) {
            // Define the onTelegramAuth function to handle authentication
            window.onTelegramAuth = (response) => {
                if (response && response.auth_date) {
                    onAuth(response);
                }
            };
        }

        // Cleanup on unmount
        return () => {
            if (window.onTelegramAuth) {
                delete window.onTelegramAuth;
            }
        };
    }, [botName, buttonSize, requestAccess, type, badge, onAuth]);

    return <div ref={containerRef} className="telegram-login-container"></div>;
}

export default TelegramLoginWidget;