import '../template.css'
import './barq.css'
import { useEffect } from 'react';

function Barq() {
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
            <div className="slide-in">
                <h1>Kontaktiere uns über Barq</h1>
            </div>

            <div className="slide-in">
                <p>Folge uns auf Barq, um über die neuesten Suitwalk-Events in Linz informiert zu bleiben!</p>
            </div>

            <div className="barq-container slide-in">
                <div className="barq-profile">
                    <div className="barq-logo">
                    </div>
                    <div className="barq-info">
                        <h2>Suitwalk Linz</h2>
                        <p className="barq-username">@suitwalk_linz</p>
                    </div>
                </div>

                <p className="barq-description">Offizieller Barq-Account für Suitwalk Events in Linz. Hier findest du alle Informationen zu kommenden Veranstaltungen und Aktivitäten.</p>

                <a href="https://barq.app/c/l04wE9s" target="_blank" rel="noopener noreferrer" className="barq-button">
                    Folge uns auf Barq
                </a>
            </div>
        </div>
    );
}

export default Barq;