import { useEffect } from 'react';

function TelegramLoginWidget({ botName, authUrl, buttonSize = 'large', requestAccess = 'write', redirectUrl }) {
    useEffect(() => {
        // Create the script element
        const script = document.createElement('script');
        script.src = 'https://telegram.org/js/telegram-widget.js?22';
        script.async = true;
        script.setAttribute('data-telegram-login', botName);
        script.setAttribute('data-size', buttonSize);
        script.setAttribute('data-auth-url', authUrl);
        script.setAttribute('data-request-access', requestAccess);

        if (redirectUrl) {
            script.setAttribute('data-redirect-url', redirectUrl);
        }

        // Find the container and append the script
        const container = document.getElementById('telegram-login-container');
        if (container) {
            container.appendChild(script);
        }

        // Cleanup function to remove the script when component unmounts
        return () => {
            if (container && container.contains(script)) {
                container.removeChild(script);
            }
        };
    }, [botName, authUrl, buttonSize, requestAccess, redirectUrl]);

    return <div id="telegram-login-container"></div>;
}

export default TelegramLoginWidget;