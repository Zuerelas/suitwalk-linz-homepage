import React from 'react';
import ScrollAnimation from '../ScrollAnimation';
import './template.css';

function Impressum() {
    return (
        <div className='container-content'>
            <ScrollAnimation>
                <h1>Impressum</h1>
            </ScrollAnimation>
            <section>
                <ScrollAnimation>
                    <p>Elias Pöschl<br />5113 St. Georgen bei Salzburg</p>
                    <p>Kontakt:<br /> E-Mail: <a href='mailto:eliaspoe194@gmail.com'>eliaspoe194@gmail.com</a> </p>
                </ScrollAnimation>
            </section>



        </div>
    )

}

export default Impressum;