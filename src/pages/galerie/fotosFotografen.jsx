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

  // Add this function inside your component to handle downloading all photos
  const downloadAllPhotos = async () => {
    if (!selectedEvent || filter.photographer === 'all') return;
    
    // Get all photos for the selected photographer
    const photographerPhotos = photos.filter(photo => 
      photo.photographer_name === filter.photographer
    );
    
    if (photographerPhotos.length === 0) return;
    
    // Show a confirmation dialog
    const confirmDownload = window.confirm(
      `Möchten Sie alle ${photographerPhotos.length} Fotos von ${filter.photographer} herunterladen?`
    );
    
    if (!confirmDownload) return;
    
    // Create a visual indicator that downloads are starting
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.background = 'rgba(0, 0, 0, 0.8)';
    notification.style.color = 'white';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '8px';
    notification.style.zIndex = '9999';
    notification.textContent = `Download von ${photographerPhotos.length} Fotos gestartet...`;
    document.body.appendChild(notification);
    
    // Create an invisible iframe for each download
    // We'll limit to 3 concurrent downloads to avoid overwhelming the browser
    const maxConcurrent = 3;
    let completed = 0;
    
    for (let i = 0; i < photographerPhotos.length; i += maxConcurrent) {
      const batch = photographerPhotos.slice(i, i + maxConcurrent);
      
      // Start concurrent downloads for this batch
      const promises = batch.map(photo => {
        return new Promise(resolve => {
          const iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          iframe.src = `https://suitwalk-linz-backend.vercel.app/api/gallery/download/${photo.id}`;
          
          iframe.onload = () => {
            document.body.removeChild(iframe);
            completed++;
            notification.textContent = `Download: ${completed} von ${photographerPhotos.length} Fotos`;
            resolve();
          };
          
          document.body.appendChild(iframe);
        });
      });
      
      // Wait for this batch to complete before starting the next
      await Promise.all(promises);
    }
    
    // Update notification when all downloads complete
    notification.textContent = `${photographerPhotos.length} Fotos wurden erfolgreich heruntergeladen!`;
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 5000);
  };

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
          
          {/* Add download all button */}
          {filter.photographer !== 'all' && (
            <div className="download-all-container">
              <button className="download-all-button" onClick={downloadAllPhotos}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-1.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm-1.5-3h3v-2h2l-3.5-4-3.5 4h2v2z"/>
                </svg>
                Alle Fotos von {filter.photographer} herunterladen ({filteredPhotos.length})
              </button>
            </div>
          )}
          
          {/* Photo gallery */}
          <div className="photo-gallery">
            {filteredPhotos.length > 0 ? (
              filteredPhotos.map(photo => (
                <div key={photo.id} className="photo-item">
                  <img 
                    src={`/gallery/${selectedEvent}/${photo.photographer_id}/thumbnails/${photo.filename}`}
                    alt={photo.title || 'Suitwalk Linz Foto'}
                    onClick={() => window.open(
                      `/gallery/${selectedEvent}/${photo.photographer_id}/full/${photo.filename}`,
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
