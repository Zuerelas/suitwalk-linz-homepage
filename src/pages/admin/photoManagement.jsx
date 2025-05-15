import React, { useState, useEffect } from 'react';
// Fix the path and use the useAuth hook instead
import { useAuth } from '../../context/AuthContext';
import './photoManagement.css';

function PhotoManagement() {
  const { user } = useAuth();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [eventDate, setEventDate] = useState('');
  const [photographers, setPhotographers] = useState([]);
  const [selectedPhotographer, setSelectedPhotographer] = useState('');
  const [photoTitle, setPhotoTitle] = useState('');
  const [tags, setTags] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResults, setUploadResults] = useState(null);

  useEffect(() => {
    // Fetch photographers
    const fetchPhotographers = async () => {
      try {
        const response = await fetch('https://suitwalk-linz-backend.vercel.app/api/gallery/photographers');
        if (response.ok) {
          const data = await response.json();
          setPhotographers(data.photographers);
          if (data.photographers.length > 0) {
            setSelectedPhotographer(data.photographers[0].id);
          }
        }
      } catch (error) {
        console.error('Error fetching photographers:', error);
      }
    };
    
    fetchPhotographers();
  }, []);
  
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };
  
  const handleUpload = async () => {
    if (files.length === 0 || !eventDate || !selectedPhotographer) {
      alert('Bitte Datum, Fotograf und Fotos auswählen');
      return;
    }
    
    setUploading(true);
    setUploadProgress(0);
    setUploadResults(null);
    
    const formData = new FormData();
    formData.append('eventDate', eventDate);
    formData.append('photographerId', selectedPhotographer);
    formData.append('title', photoTitle);
    formData.append('tags', tags);
    
    files.forEach(file => {
      formData.append('photos', file);
    });
    
    try {
      const response = await fetch('https://suitwalk-linz-backend.vercel.app/api/gallery/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }
      
      const result = await response.json();
      setUploadResults({
        success: true,
        message: result.message,
        count: result.files.length
      });
      setFiles([]);
      setPhotoTitle('');
      setTags('');
    } catch (error) {
      console.error('Error uploading photos:', error);
      setUploadResults({
        success: false,
        message: error.message
      });
    } finally {
      setUploading(false);
      setUploadProgress(100);
    }
  };

  const addNewPhotographer = async () => {
    const name = prompt('Name des Fotografen:');
    if (!name) return;
    
    try {
      const response = await fetch('https://suitwalk-linz-backend.vercel.app/api/gallery/photographers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ name })
      });
      
      if (response.ok) {
        const data = await response.json();
        setPhotographers(prev => [...prev, { id: data.id, name }]);
        setSelectedPhotographer(data.id);
      }
    } catch (error) {
      console.error('Error adding photographer:', error);
      alert('Fehler beim Hinzufügen des Fotografen');
    }
  };
  
  return (
    <div className="container-content">
      <h1>Fotos verwalten</h1>
      
      <div className="upload-section">
        <h2>Neue Fotos hochladen</h2>
        
        <div className="form-group">
          <label htmlFor="event-date">Event Datum:</label>
          <input 
            type="date" 
            id="event-date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="photographer">Fotograf:</label>
          <div className="select-with-button">
            <select
              id="photographer"
              value={selectedPhotographer}
              onChange={(e) => setSelectedPhotographer(e.target.value)}
              required
            >
              {photographers.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <button 
              type="button" 
              className="add-button"
              onClick={addNewPhotographer}
            >
              + Neu
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="photo-title">Titel (optional):</label>
          <input 
            type="text"
            id="photo-title"
            value={photoTitle}
            onChange={(e) => setPhotoTitle(e.target.value)}
            placeholder="Wird auf alle hochgeladenen Fotos angewendet"
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo-tags">Tags (optional):</label>
          <input 
            type="text"
            id="photo-tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Kommagetrennte Tags (z.B. suit,group,portrait)"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="photo-files">Fotos auswählen:</label>
          <input 
            type="file"
            id="photo-files"
            onChange={handleFileChange}
            multiple
            accept="image/*"
          />
        </div>
        
        {files.length > 0 && (
          <p className="file-count">{files.length} Dateien ausgewählt</p>
        )}
        
        {uploadResults && (
          <div className={`upload-results ${uploadResults.success ? 'success' : 'error'}`}>
            <p>{uploadResults.message}</p>
            {uploadResults.success && uploadResults.count && (
              <p>{uploadResults.count} Fotos erfolgreich hochgeladen</p>
            )}
          </div>
        )}
        
        {uploading && (
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{width: `${uploadProgress}%`}}
            ></div>
          </div>
        )}
        
        <button 
          onClick={handleUpload} 
          disabled={uploading || files.length === 0 || !eventDate || !selectedPhotographer}
          className="upload-button"
        >
          {uploading ? 'Lädt hoch...' : 'Fotos hochladen'}
        </button>
      </div>
    </div>
  );
}

export default PhotoManagement;