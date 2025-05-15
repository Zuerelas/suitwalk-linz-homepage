import React, { useState, useEffect } from 'react';
import '../template.css';
import './photoUpload.css';
import TelegramLoginWidget from '../../assets/TelegramLoginWidget';
import ScrollAnimation from '../../ScrollAnimation';

function PhotoUpload() {
  const [telegramUser, setTelegramUser] = useState(null);
  const [photographerKey, setPhotographerKey] = useState('');
  const [eventDates, setEventDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [files, setFiles] = useState([]);
  const [tags, setTags] = useState('');
  const [title, setTitle] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadResult, setUploadResult] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Handle Telegram auth - THIS IS THE IMPORTANT PART
  const handleTelegramAuth = (user) => {
    console.log('Telegram auth received in component:', user);
    // Remove the alert that might interfere with popup flow
    // alert('Telegram authentication successful!');
    setTelegramUser(user);
    localStorage.setItem('telegramUser', JSON.stringify(user));
  };
  
  // Check for existing login and fetch dates
  useEffect(() => {
    const savedUser = localStorage.getItem('telegramUser');
    if (savedUser) {
      try {
        setTelegramUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user:', e);
      }
    }
    
    fetchEventDates();
  }, []);
  
  // Fetch event dates for dropdown
  const fetchEventDates = async () => {
    try {
      // Add cache-busting parameter and include credentials
      const response = await fetch(
        `https://suitwalk-linz-backend.vercel.app/api/gallery/event-dates?t=${Date.now()}`, 
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Origin': 'https://test.suitwalk-linz.at'
          },
          mode: 'cors'
        }
      );
      
      if (!response.ok) throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      
      const data = await response.json();
      console.log("Received event dates:", data);
      setEventDates(data.dates || []);
      
      if (data.dates && data.dates.length > 0) {
        setSelectedDate(data.dates[0]);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching event dates:', error);
      // Add fallback dates for testing if API fails
      const fallbackDates = [
        new Date().toISOString().split('T')[0],
        new Date(Date.now() - 86400000*30).toISOString().split('T')[0] // 30 days ago
      ];
      setEventDates(fallbackDates);
      setSelectedDate(fallbackDates[0]);
      setLoading(false);
    }
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };
  
  // Log out user
  const handleLogout = () => {
    setTelegramUser(null);
    localStorage.removeItem('telegramUser');
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!telegramUser || !photographerKey || !selectedDate || files.length === 0) {
      setUploadResult({
        success: false,
        message: 'Bitte fülle alle Pflichtfelder aus und wähle mindestens ein Foto aus.'
      });
      return;
    }
    
    setUploading(true);
    setUploadProgress(10);
    setUploadResult(null);
    
    try {
      const formData = new FormData();
      formData.append('photographerKey', photographerKey);
      formData.append('eventDate', selectedDate);
      formData.append('tags', tags);
      formData.append('title', title);
      
      // Log to see what we're sending
      console.log("Sending telegram data:", telegramUser);
      
      // Append telegramData as individual fields
      for (const key in telegramUser) {
        formData.append(`telegramData[${key}]`, telegramUser[key]);
      }
      
      // Add files and log file info
      console.log(`Adding ${files.length} files to upload`);
      files.forEach((file, index) => {
        formData.append('photos', file);
        console.log(`File ${index+1}:`, file.name, file.type, file.size);
      });
      
      setUploadProgress(30);
      
      console.log("Starting upload request...");
      const response = await fetch('https://suitwalk-linz-backend.vercel.app/api/gallery/upload', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - it will be set automatically with boundary
      });
      
      setUploadProgress(90);
      console.log("Upload response status:", response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || 'Upload failed';
        } catch {
          errorMessage = `Server returned ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }
      
      const result = await response.json();
      console.log("Upload success response:", result);
      
      setUploadResult({
        success: true,
        message: `${result.files?.length || 0} Fotos wurden erfolgreich hochgeladen!`
      });
      
      // Reset form on success
      setFiles([]);
      setTags('');
      setTitle('');
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadResult({
        success: false,
        message: `Fehler beim Hochladen: ${error.message}`
      });
    } finally {
      setUploading(false);
      setUploadProgress(100);
    }
  };

  return (
    <div className="container-content">
      <ScrollAnimation animateIn="fadeIn" animateOnce={true}>
        <h1>Fotos hochladen</h1>
        
        {!telegramUser ? (
          <div className="auth-container">
            <h2>Anmelden mit Telegram</h2>
            <p>Bitte melde dich mit deinem Telegram-Account an, um Fotos hochladen zu können.</p>
            
            <div className="telegram-widget-container">
              <TelegramLoginWidget
                botName="SuitwalkLinz_bot"
                buttonSize="large"
                requestAccess="write"
                type="photo_upload"
                onAuth={handleTelegramAuth}
              />
              <div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <button 
                  onClick={() => handleTelegramAuth({
                    id: 12345,
                    first_name: 'Test',
                    last_name: 'User',
                    username: 'testuser',
                    photo_url: 'https://via.placeholder.com/100',
                    auth_date: Math.floor(Date.now() / 1000)
                  })}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#333',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Debug: Simulate Telegram Login
                </button>
                
                <button
                  onClick={() => {
                    // Test if popups are allowed at all
                    const testPopup = window.open('about:blank', '_blank', 'width=500,height=500');
                    if (!testPopup || testPopup.closed) {
                      alert("Popups are blocked by your browser. Please allow popups for this site.");
                    } else {
                      testPopup.close();
                      alert("Popups are allowed. Telegram login should work if configured correctly.");
                    }
                  }}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#555',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Test Popup Permissions
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="upload-container">
            <div className="user-info">
              <div className="telegram-profile">
                {telegramUser.photo_url && (
                  <img src={telegramUser.photo_url} alt="Profile" className="profile-photo" />
                )}
                <div className="user-details">
                  <p className="username">Angemeldet als {telegramUser.first_name} {telegramUser.last_name || ''}</p>
                  <button onClick={handleLogout} className="logout-button">Abmelden</button>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label htmlFor="photographerKey">Fotograf-Schlüssel:</label>
                <input
                  type="password"
                  id="photographerKey"
                  value={photographerKey}
                  onChange={(e) => setPhotographerKey(e.target.value)}
                  required
                  placeholder="Bitte gib deinen Fotograf-Schlüssel ein"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="eventDate">Event-Datum:</label>
                {loading ? (
                  <p>Lade Daten...</p>
                ) : (
                  <select
                    id="eventDate"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    required
                  >
                    {eventDates.map(date => (
                      <option key={date} value={date}>
                        {new Date(date).toLocaleDateString('de-AT')}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              
              <div className="form-group">
                <label htmlFor="title">Titel (optional):</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Wird auf alle hochgeladenen Fotos angewendet"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="tags">Tags (optional):</label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Kommagetrennte Tags (z.B. gruppenfoto,donau,hauptplatz)"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="photos">Fotos auswählen:</label>
                <input
                  type="file"
                  id="photos"
                  onChange={handleFileChange}
                  accept="image/*"
                  multiple
                  required
                />
                {files.length > 0 && (
                  <p className="file-count">{files.length} Dateien ausgewählt</p>
                )}
              </div>
              
              {uploading && (
                <div className="progress-container">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{width: `${uploadProgress}%`}}
                    ></div>
                  </div>
                  <p>Upload läuft... {uploadProgress}%</p>
                </div>
              )}
              
              {uploadResult && (
                <div className={`result-message ${uploadResult.success ? 'success' : 'error'}`}>
                  {uploadResult.message}
                </div>
              )}
              
              <button 
                type="submit" 
                className="upload-button"
                disabled={uploading || files.length === 0}
              >
                {uploading ? 'Wird hochgeladen...' : 'Fotos hochladen'}
              </button>
            </form>
          </div>
        )}
      </ScrollAnimation>
    </div>
  );
}

export default PhotoUpload;