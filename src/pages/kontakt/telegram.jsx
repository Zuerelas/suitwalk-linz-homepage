import { useEffect } from 'react';
import '../template.css'
import './telegram.css'

function Telegram() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.slide-in').forEach(el => {
            observer.observe(el);
        });

        return () => {
            document.querySelectorAll('.slide-in').forEach(el => {
                observer.unobserve(el);
            });
        };
    }, []);

    return (
        <div className="container-content">
            <h1 className="slide-in">Verbinde dich mit Telegram</h1>

            <p className="slide-in intro-text">
                Tritt unseren Telegram-Kanälen bei, um immer auf dem Laufenden zu bleiben und keine
                Updates zu unseren Veranstaltungen zu verpassen. Wir bieten zwei verschiedene Kanäle an:
            </p>

            <div className="telegram-channels">
                <div className="channel-card slide-in">
                    <div className="channel-icon">
                        <i className="telegram-icon"></i>
                    </div>
                    <h2>SuitWalk Linz Info</h2>
                    <p>Erhalte Ankündigungen, Neuigkeiten und wichtige Updates zu kommenden Veranstaltungen.</p>
                    <a href="https://t.me/+Vh7-Dynz5rplODBk" className="telegram-button" target="_blank" rel="noopener noreferrer">
                        Kanal beitreten
                    </a>
                </div>

                <div className="channel-card slide-in">
                    <div className="channel-icon">
                        <i className="telegram-chat-icon"></i>
                    </div>
                    <h2>SuitWalk Linz Community</h2>
                    <p>Tausche dich mit anderen Teilnehmern aus, stelle Fragen und werde Teil unserer lebendigen Community.</p>
                    <a href="https://t.me/+cFVebDprsfYyZjU0" className="telegram-button" target="_blank" rel="noopener noreferrer">
                        Gruppe beitreten
                    </a>
                </div>
            </div>

            <div className="telegram-info slide-in">
                <h2>Warum Telegram?</h2>
                <p>
                    Telegram bietet uns eine sichere und effektive Möglichkeit, mit unserer Community zu kommunizieren.
                    Die App ist kostenlos für alle Plattformen verfügbar und einfach zu bedienen.
                </p>
                <a href="https://telegram.org/dl" className="download-button" target="_blank" rel="noopener noreferrer">
                    Telegram herunterladen
                </a>
            </div>
        </div>
    );
}

export default Telegram;