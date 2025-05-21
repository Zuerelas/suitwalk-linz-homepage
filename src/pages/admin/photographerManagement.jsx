import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './photographerManagement.css';

function PhotographerManagement() {
  const { user } = useAuth();
  const [suitwalkPhotographers, setSuitwalkPhotographers] = useState([]);
  const [galleryPhotographers, setGalleryPhotographers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [filter, setFilter] = useState('');
  
  // Function to fetch both photographer lists
  const fetchPhotographers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Only proceed if we have an auth token
      if (!user || !user.token) {
        throw new Error('Not authenticated');
      }
      
      // Fetch Suitwalk photographers
      const suitwalkResponse = await fetch(
        'https://suitwalk-linz-backend.vercel.app/api/admin/photographers/suitwalk',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!suitwalkResponse.ok) {
        throw new Error(`Failed to fetch Suitwalk photographers: ${suitwalkResponse.status}`);
      }
      
      const suitwalkData = await suitwalkResponse.json();
      
      // Fetch Gallery photographers
      const galleryResponse = await fetch(
        'https://suitwalk-linz-backend.vercel.app/api/admin/photographers/gallery',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!galleryResponse.ok) {
        throw new Error(`Failed to fetch Gallery photographers: ${galleryResponse.status}`);
      }
      
      const galleryData = await galleryResponse.json();
      
      // Update state with fetched data
      setSuitwalkPhotographers(suitwalkData.photographers || []);
      setGalleryPhotographers(galleryData.photographers || []);
      
    } catch (err) {
      console.error('Error fetching photographers:', err);
      setError(err.message || 'Failed to load photographers');
    } finally {
      setLoading(false);
    }
  };
  
  // Load photographers on component mount
  useEffect(() => {
    fetchPhotographers();
  }, [user]);
  
  // Add a photographer from Suitwalk to Gallery
  const addPhotographerToGallery = async (photographerId) => {
    try {
      const response = await fetch(
        'https://suitwalk-linz-backend.vercel.app/api/admin/photographers/add',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ suitwalkId: photographerId })
        }
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 409) {
          setError(`Photographer already exists in the gallery database.`);
        } else {
          setError(data.error || 'Failed to add photographer');
        }
        return;
      }
      
      setSuccessMessage('Photographer added successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      
      // Refresh the lists
      fetchPhotographers();
      
    } catch (err) {
      console.error('Error adding photographer:', err);
      setError(err.message || 'Failed to add photographer');
    }
  };
  
  // Delete a photographer from Gallery
  const deletePhotographer = async (photographerId) => {
    if (!confirm('Are you sure you want to delete this photographer?')) {
      return;
    }
    
    try {
      const response = await fetch(
        `https://suitwalk-linz-backend.vercel.app/api/admin/photographers/${photographerId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        if (response.status === 409) {
          setError(`Cannot delete photographer with existing photos (${data.photoCount} photos).`);
        } else {
          setError(data.error || 'Failed to delete photographer');
        }
        return;
      }
      
      setSuccessMessage('Photographer deleted successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
      
      // Refresh the lists
      fetchPhotographers();
      
    } catch (err) {
      console.error('Error deleting photographer:', err);
      setError(err.message || 'Failed to delete photographer');
    }
  };
  
  // Filter photographers based on search term
  const filteredSuitwalkPhotographers = suitwalkPhotographers.filter(photographer => 
    photographer.name.toLowerCase().includes(filter.toLowerCase()) ||
    (photographer.email && photographer.email.toLowerCase().includes(filter.toLowerCase())) ||
    (photographer.telegram_username && photographer.telegram_username.toLowerCase().includes(filter.toLowerCase()))
  );
  
  const filteredGalleryPhotographers = galleryPhotographers.filter(photographer => 
    photographer.name.toLowerCase().includes(filter.toLowerCase()) ||
    (photographer.email && photographer.email.toLowerCase().includes(filter.toLowerCase())) ||
    (photographer.telegram_username && photographer.telegram_username.toLowerCase().includes(filter.toLowerCase()))
  );
  
  // Check if a Suitwalk photographer is already in Gallery
  const isPhotographerInGallery = (suitwalkPhotographer) => {
    return galleryPhotographers.some(gp => 
      (gp.telegram_id && suitwalkPhotographer.telegram_id && gp.telegram_id === suitwalkPhotographer.telegram_id) ||
      (gp.email && suitwalkPhotographer.email && gp.email === suitwalkPhotographer.email)
    );
  };

  return (
    <div className="photographer-management">
      <h1>Photographer Management</h1>
      
      {loading ? (
        <div className="loading">Loading photographers...</div>
      ) : error ? (
        <div className="error-message">
          {error}
          <button onClick={fetchPhotographers}>Retry</button>
        </div>
      ) : (
        <>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          
          <div className="search-bar">
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Search photographers..."
            />
          </div>
          
          <div className="photographers-container">
            <div className="photographers-list suitwalk-list">
              <h2>Suitwalk Photographers ({filteredSuitwalkPhotographers.length})</h2>
              
              {filteredSuitwalkPhotographers.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Telegram</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSuitwalkPhotographers.map(photographer => (
                      <tr key={photographer.id} className={isPhotographerInGallery(photographer) ? 'already-added' : ''}>
                        <td>
                          {photographer.name}
                          {photographer.role === 'admin' && <span className="admin-badge">Admin</span>}
                        </td>
                        <td>
                          {photographer.telegram_username ? (
                            <span className="telegram-username">@{photographer.telegram_username}</span>
                          ) : (
                            <span className="no-telegram">No Telegram</span>
                          )}
                        </td>
                        <td>
                          {isPhotographerInGallery(photographer) ? (
                            <button className="already-added-btn" disabled>
                              Already Added
                            </button>
                          ) : (
                            <button
                              className="add-btn"
                              onClick={() => addPhotographerToGallery(photographer.id)}
                            >
                              Add to Gallery
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-results">No Suitwalk photographers found</div>
              )}
            </div>
            
            <div className="photographers-list gallery-list">
              <h2>Gallery Photographers ({filteredGalleryPhotographers.length})</h2>
              
              {filteredGalleryPhotographers.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Telegram</th>
                      <th>Photos</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGalleryPhotographers.map(photographer => (
                      <tr key={photographer.id}>
                        <td>{photographer.name}</td>
                        <td>
                          {photographer.telegram_username ? (
                            <span className="telegram-username">@{photographer.telegram_username}</span>
                          ) : (
                            <span className="no-telegram">No Telegram</span>
                          )}
                        </td>
                        <td className="photo-count">{photographer.photo_count}</td>
                        <td>
                          <button
                            className="delete-btn"
                            onClick={() => deletePhotographer(photographer.id)}
                            disabled={photographer.photo_count > 0}
                            title={photographer.photo_count > 0 ? 
                              "Can't delete photographers with photos" : "Delete photographer"}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="no-results">No Gallery photographers found</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PhotographerManagement;