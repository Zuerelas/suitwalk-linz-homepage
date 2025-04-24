import { Link } from 'react-router-dom';
import React from 'react';
import ScrollAnimation from '../ScrollAnimation';
import './template.css';
import './regeln.css';

function Regeln() {
    return (
        <div className='container-content'>
            <ScrollAnimation>
                <h1>Regeln</h1>
            </ScrollAnimation>
            <section>
                <ScrollAnimation>
                    <h2>Zusammengefasste Regeln</h2>
                </ScrollAnimation>
                <ScrollAnimation>
                    <ul>
                        <li>fiktive Uniformen je nach Absprache erlaubt</li>
                        <li>Be Nice! (keine Beleidigungen, Diskriminierungen, etc. gestattet)</li>
                        <li>Bleibt SFW!</li>
                        <li>Kein Fetisch-Gear erlaubt
                            (Puppy Masken, Latex/Leder, Gerten, Leinen etc.)</li>
                        <li>Keine Drogen erlaubt</li>
                        <li>keine Waffen/Fakewaffen erlaubt</li>
                    </ul>
                </ScrollAnimation>
            </section>
        </div>
    )
}

export default Regeln;