import '../template.css'
import './x.css'
import { useEffect } from 'react';

function X() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        });

        const hiddenElements = document.querySelectorAll('.slide-in');
        hiddenElements.forEach((el) => observer.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
        };
    }, []);

    return (
        <div className="container-content">
            <h1 className="slide-in">Folgen Sie uns auf X</h1>

            <div className="x-container slide-in">
                <div className="x-logo">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                </div>

                <div className="x-content slide-in">
                    <p>Bleibe über alle Neuigkeiten zu SuitWalk Linz informiert!</p>
                    <p>Folge uns für aktuelle Updates, Veranstaltungshinweise und Eindrücke von unseren Events.</p>

                    <div className="x-button-container slide-in">
                        <a href="https://x.com/Suitwalk_Linz" target="_blank" rel="noopener noreferrer" className="x-button">
                            @Suitwalk_Linz folgen
                        </a>
                    </div>
                </div>
            </div>

            <div className="x-info slide-in">
                <h2>Warum X?</h2>
                <p>Auf X teilen wir:</p>
                <ul>
                    <li>Ankündigungen zu kommenden Events</li>
                    <li>Fotos und Impressionen</li>
                    <li>Neuigkeiten und Updates</li>
                    <li>Interaktionen mit unserer Community</li>
                </ul>
            </div>

            <div className="x-connect slide-in">
                <p>Verwende gerne den Hashtag <span className="hashtag">#SuitwalkLinz</span>, um deine Erfahrungen zu teilen!</p>
            </div>
        </div>
    );
}

export default X;