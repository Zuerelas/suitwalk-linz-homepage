import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPhotos: 0,
    totalPhotographers: 0,
    totalDownloads: 0,
    recentUploads: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('https://suitwalk-linz-backend.vercel.app/api/admin/dashboard', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user.token]);

  return (
    <div className="dashboard">
      <h1>Gallery Dashboard</h1>
      
      {loading ? (
        <div className="loading">Loading dashboard data...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <div className="stat-cards">
            <div className="stat-card">
              <h3>Total Photos</h3>
              <div className="stat-value">{stats.totalPhotos}</div>
            </div>
            
            <div className="stat-card">
              <h3>Photographers</h3>
              <div className="stat-value">{stats.totalPhotographers}</div>
            </div>
            
            <div className="stat-card">
              <h3>Downloads</h3>
              <div className="stat-value">{stats.totalDownloads}</div>
            </div>
          </div>
          
          <div className="recent-uploads">
            <h2>Recent Uploads</h2>
            {stats.recentUploads.length > 0 ? (
              <ul className="uploads-list">
                {stats.recentUploads.map(upload => (
                  <li key={upload.id} className="upload-item">
                    <img 
                      src={`/gallery/${upload.event_date}/${upload.photographer_id}/thumbnails/${upload.filename}`}
                      alt={upload.title || 'Untitled photo'}
                    />
                    <div className="upload-details">
                      <p className="upload-title">{upload.title || 'Untitled'}</p>
                      <p className="upload-photographer">By: {upload.photographer_name}</p>
                      <p className="upload-date">Uploaded: {new Date(upload.upload_date).toLocaleDateString()}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-uploads">No recent uploads found</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;