import '../template.css';
import './fotosFotografen.css';
import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ScrollAnimation from '../../ScrollAnimation';

function FotosFotografen() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({ photographer: 'all', tags: [] });

  useEffect(() => {
    // Fetch all events
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://suitwalk-linz-backend.vercel.app/api/gallery/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        
        const data = await response.json();
        setEvents(data.events);
        
        // Select the most recent event by default
        if (data.events.length > 0) {
          setSelectedEvent(data.events[0].date);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading events:", error);
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  useEffect(() => {
    // Fetch photos for selected event
    if (selectedEvent) {
      setLoading(true);
      
      const fetchPhotos = async () => {
        try {
          const response = await fetch(`https://suitwalk-linz-backend.vercel.app/api/gallery/event/${selectedEvent}`);
          if (!response.ok) throw new Error('Failed to fetch photos');
          
          const data = await response.json();
          setPhotos(data.photos);
          setLoading(false);
        } catch (error) {
          console.error("Error loading photos:", error);
          setLoading(false);
        }
      };
      
      fetchPhotos();
    }
  }, [selectedEvent]);
  
  // Filter photos based on selected filters
  const filteredPhotos = photos.filter(photo => {
    if (filter.photographer !== 'all' && photo.photographer_name !== filter.photographer) {
      return false;
    }
    
    if (filter.tags.length > 0) {
      const photoTags = photo.tags ? photo.tags.split(',') : [];
      return filter.tags.some(tag => photoTags.includes(tag));
    }
    
    return true;
  });
  
  // Get unique photographers from current photos
  const photographers = [...new Set(photos.map(photo => photo.photographer_name))];

  return (
    <div className="container-content">
      <ScrollAnimation animateIn="fadeIn" animateOnce={true} duration={1}>
        <h1>Fotos vom Suitwalk Linz</h1>
      </ScrollAnimation>
      
      {loading ? (
        <div className="loading-spinner">Lädt Galerie...</div>
      ) : (
        <>
          {/* Event selector */}
          <div className="event-selector">
            <h2>Wähle ein Event:</h2>
            <div className="event-buttons">
              {events.map(event => (
                <button 
                  key={event.date}
                  className={selectedEvent === event.date ? 'active' : ''}
                  onClick={() => setSelectedEvent(event.date)}
                >
                  {new Date(event.date).toLocaleDateString('de-AT')}
                  <span className="count">{event.photo_count} Fotos</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Filters */}
          <div className="gallery-filters">
            <div className="filter-group">
              <label>Fotograf:</label>
              <select 
                value={filter.photographer}
                onChange={e => setFilter({...filter, photographer: e.target.value})}
              >
                <option value="all">Alle Fotografen</option>
                {photographers.map(photographer => (
                  <option key={photographer} value={photographer}>
                    {photographer}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Photo gallery */}
          <div className="photo-gallery">
            {filteredPhotos.length > 0 ? (
              filteredPhotos.map(photo => (
                <div key={photo.id} className="photo-item">
                  <img 
                    src={`/gallery/${selectedEvent}/${photo.photographer_name}/thumbnails/${photo.filename}`}
                    alt={photo.title || 'Suitwalk Linz Foto'}
                    onClick={() => window.open(
                      `/gallery/${selectedEvent}/${photo.photographer_name}/full/${photo.filename}`,
                      '_blank'
                    )}
                  />
                  <div className="photo-info">
                    <p className="photographer">© {photo.photographer_name}</p>
                    {photo.title && <p className="title">{photo.title}</p>}
                    <a 
                      className="download-button" 
                      href={`https://suitwalk-linz-backend.vercel.app/api/gallery/download/${photo.id}`}
                      download
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-photos">Keine Fotos gefunden für die gewählten Filter.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default FotosFotografen;
