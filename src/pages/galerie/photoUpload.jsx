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
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  // Handle Telegram auth
  const handleTelegramAuth = (user) => {
    if (user && user.id) {
      // Make sure user has the photo_upload type
      user.type = 'photo_upload';
      setTelegramUser(user);
      localStorage.setItem('telegramUser', JSON.stringify(user));
    } else {
      console.error('Invalid telegram user data:', user);
      alert('Authentication failed. Please try again.');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setTelegramUser(null);
    localStorage.removeItem('telegramUser');
    // Reset form fields on logout
    setPhotographerKey('');
    setFiles([]);
    setTitle('');
    setTags('');
    setUploadResult(null);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Check for Telegram auth in URL or localStorage when component mounts
  useEffect(() => {
    
    // FIRST: Check URL fragment for parameters
    const hashParams = window.location.hash.split('?');
    if (hashParams.length > 1) {
      const fragmentParams = new URLSearchParams(hashParams[1]);

      // Check for telegramAuth in fragment
      const telegramAuth = fragmentParams.get('telegramAuth');
      
      if (telegramAuth) {
        try {
          const userData = JSON.parse(decodeURIComponent(telegramAuth));
          handleTelegramAuth(userData);
          
          // Clean up the URL by removing the telegramAuth parameter but keeping the route
          const cleanRoute = window.location.hash.split('?')[0];
          window.history.replaceState({}, document.title, cleanRoute);
          
          // Fetch dates and return early
          fetchEventDates();
          return;
        } catch (e) {
          console.error('Failed to parse telegramAuth data from fragment:', e);
        }
      }
      
      // Check for direct Telegram parameters in fragment
      if (fragmentParams.has('id') && fragmentParams.has('auth_date')) {
        try {
          // Construct user object from URL parameters
          const userData = {
            id: fragmentParams.get('id'),
            first_name: fragmentParams.get('first_name') || '',
            last_name: fragmentParams.get('last_name') || '',
            username: fragmentParams.get('username') || '',
            photo_url: fragmentParams.get('photo_url') || '',
            auth_date: fragmentParams.get('auth_date'),
            hash: fragmentParams.get('hash'),
            type: 'photo_upload'
          };

          handleTelegramAuth(userData);

          // Clean up the URL
          window.history.replaceState({}, document.title, window.location.hash.split('?')[0]);
          
          // Fetch dates and return early
          fetchEventDates();
          return;
        } catch (e) {
          console.error('Failed to process fragment parameters:', e);
        }
      }
    }
    
    // SECOND: Check normal query parameters (as a fallback)
    const searchParams = new URLSearchParams(window.location.search);
    const telegramAuth = searchParams.get('telegramAuth');
    if (telegramAuth) {
      try {
        const userData = JSON.parse(decodeURIComponent(telegramAuth));
        handleTelegramAuth(userData);

        // Clean up the URL
        window.history.replaceState({}, document.title, window.location.pathname + window.location.hash.split('?')[0]);
        
        fetchEventDates();
        return;
      } catch (e) {
        console.error('Failed to parse telegramAuth data from query:', e);
      }
    }
    
    // THIRD: Check localStorage for existing session
    const savedUser = localStorage.getItem('telegramUser');
    if (savedUser) {
      try {
        setTelegramUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse telegramUser from localStorage:', e);
        localStorage.removeItem('telegramUser');
      }
    }

    // Fetch available event dates
    fetchEventDates();
  }, []);

  // Fetch event dates
  const fetchEventDates = async () => {
    try {
      const response = await fetch(
        'https://suitwalk-linz-backend.vercel.app/api/gallery/dates-events',
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
          mode: 'cors'
        }
      );

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setEventDates(data.dates || []);
      
      if (data.dates && data.dates.length > 0) {
        setSelectedDate(data.dates[0]);
      }
    } catch (error) {
      console.error('Error fetching event dates:', error);
    } finally {
      setLoading(false);
    }
  };

  // File change handler
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // Submit handler for form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadProgress(0);

    // Prepare the form data
    const formData = new FormData();
    formData.append('photographerKey', photographerKey);
    formData.append('eventDate', selectedDate);
    formData.append('tags', tags);
    formData.append('title', title);
    formData.append('telegramData', JSON.stringify(telegramUser));

    // Append all files
    for (let i = 0; i < files.length; i++) {
      formData.append('photos', files[i]);
    }

    try {
      // Use fetch with progress tracking
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://suitwalk-linz-backend.vercel.app/api/gallery/upload');
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progressPercent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progressPercent);
        }
      };
      
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          setUploadResult({
            success: true,
            message: 'Upload erfolgreich! Vielen Dank für deine Fotos.'
          });
          setFiles([]);
          setTitle('');
          setTags('');
        } else {
          const errorMsg = xhr.responseText ? JSON.parse(xhr.responseText).error : 'Unknown error';
          throw new Error(errorMsg);
        }
        setUploading(false);
      };
      
      xhr.onerror = () => {
        setUploadProgress(0);
        setUploadResult({
          success: false,
          message: 'Netzwerkfehler beim Upload'
        });
        setUploading(false);
      };
      
      xhr.send(formData);
    } catch (error) {
      setUploadProgress(0);
      setUploadResult({
        success: false,
        message: `Fehler beim Upload: ${error.message}`
      });
      setUploading(false);
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
                id="TelegramWidget"
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
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="photographerKey"
                    value={photographerKey}
                    onChange={(e) => setPhotographerKey(e.target.value)}
                    required
                    placeholder="Bitte gib deinen Fotograf-Schlüssel ein"
                  />
                  <button 
                    type="button"
                    className="toggle-password-button"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Schlüssel verbergen" : "Schlüssel anzeigen"}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486z"/>
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                      </svg>
                    )}
                  </button>
                </div>
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