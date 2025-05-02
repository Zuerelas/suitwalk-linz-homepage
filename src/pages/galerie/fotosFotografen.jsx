import '../template.css';
import './fotosFotografen.css';
import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import brucknerhaus from "../../img/brucknerhaus.jpg";

function FotosFotografen() {
    const [images, setImages] = useState([]);

    const suitwalks = [
        { date: "12.4.2025", photographers: ["Fotograf 1", "Fotograf 2", "Fotograf 3", "Fotograf 4", "Fotograf 5"], link: "#" },
        { date: "13.4.2025", photographers: ["Fotograf 6", "Fotograf 7", "Fotograf 8", "Fotograf 9", "Fotograf 10"], link: "#" },
        // Add more suitwalks as needed
    ];

    function getSuitwalks() {
        return suitwalks.map((suitwalk, index) => (
            <a href={suitwalk.link} key={index}>
                < div className='container-fotografen' >
                    <p className='date'>{suitwalk.date}</p>
                    <ul className='fotografen-list'>
                        {suitwalk.photographers.map((photographer, index) => (
                            <li className='fotografen-item' key={index}>{photographer}</li>
                        ))}
                    </ul>
                </div >
            </a >
        ));
    }
    useEffect(() => {
        const importImages = async () => {
            try {
                const imageModules = import.meta.glob('../../img/fotografen-slider/*.{png,jpg,jpeg,svg,JPG}');
                const loadedImages = await Promise.all(
                    Object.entries(imageModules).map(async ([path, importer]) => {
                        const src = (await importer()).default;
                        const alt = path.replace(/\.(png|jpe?g|svg)$/i, '').replace(/^.*[\\/]/, '');
                        return { src, alt };
                    })
                );
                setImages(loadedImages);
            } catch (error) {
                console.error("Error loading images:", error, "\nPlease contact a developer.");
                setImages([{ src: brucknerhaus, alt: "Brucknerhaus" }]); // Fallback
            }
        };

        importImages();
    }, []);

    function loadImages() {
        return images.map((image, index) => (
            <div>
                <div key={index} className="image-container">
                    <img src={image.src} alt={image.alt} className='slick-image' />
                </div>
            </div>
        ));
    }

    return (
        <div className="container-content">
            <h1>Fotos von Fotografen</h1>
            <p>Hier sind die Fotos der Fotografen zu finden.</p>
            <p>Die Fotos werden nach dem Event hochgeladen.</p>
            <h2>Einblick in den letzten Suitwalk:</h2>
            <div className="slider-container">
                <Slider dots={false} infinite={true} speed={500} slidesToShow={2} slidesToScroll={1} autoplay={true} autoplaySpeed={3000}>
                    {loadImages()}
                </Slider>
            </div>
            <h2>Alle Bilder der letzten Suitwalks</h2>
            <p>Hier sind die Bilder der letzten Suitwalks zu finden. Und welche Fotografen uns dabei fotografiert haben.</p>
            <div className='last-suitwalks'>
                {getSuitwalks()}
            </div>
        </div>
    );
}

export default FotosFotografen;
