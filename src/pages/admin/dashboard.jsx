import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './dashboard.css';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPhotos: 0,
    totalPhotographers: 0,
    totalDownloads: 0,
    recentUploads: [],
    registrations: {
      byType: [],
      total: 0
    },
    nextEvent: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.token) return;

      try {
        setLoading(true);
        const response = await fetch('https://suitwalk-linz-backend.vercel.app/api/admin/dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json'
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
  }, [user?.token]);

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      {loading ? (
        <div className="loading">Lade Dashboard-Daten...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          {/* Next Event Card */}
          {stats.nextEvent && (
            <div className="next-event-card">
              <h2>Nächster Suitwalk</h2>
              <div className="event-details">
                <p className="event-title">{stats.nextEvent.title || 'Suitwalk Linz'}</p>
                <p className="event-date">Datum: {formatDate(stats.nextEvent.event_date).split(',')[0]}</p>
                <p className="registration-period">
                  Anmeldung: {formatDate(stats.nextEvent.sign_in_start)} bis {formatDate(stats.nextEvent.sign_in_end)}
                </p>
                <div className="registration-status">
                  <span className={stats.nextEvent.registration_open ? "status-open" : "status-closed"}>
                    {stats.nextEvent.registration_open ? "Anmeldung geöffnet" : "Anmeldung geschlossen"}
                  </span>
                </div>
                <div className="registrations-count">
                  <strong>{stats.nextEvent.registrations}</strong> Anmeldungen bisher
                </div>
              </div>
            </div>
          )}

          {/* Stat Cards */}
          <div className="stat-cards">
            <div className="stat-card">
              <h3>Fotos gesamt</h3>
              <div className="stat-value">{stats.totalPhotos}</div>
            </div>

            <div className="stat-card">
              <h3>Fotografen</h3>
              <div className="stat-value">{stats.totalPhotographers}</div>
            </div>

            <div className="stat-card">
              <h3>Downloads</h3>
              <div className="stat-value">{stats.totalDownloads}</div>
            </div>

            <div className="stat-card">
              <h3>Anmeldungen</h3>
              <div className="stat-value">{stats.registrations?.total || 0}</div>
            </div>
          </div>

          {/* Registrations by Type */}
          <div className="registrations-section">
            <h2>Anmeldungen nach Typ</h2>
            {stats.registrations?.byType?.length > 0 ? (
              <div className="registrations-chart">
                {stats.registrations.byType.map(type => (
                  <div key={type.type} className="registration-bar">
                    <div className="bar-label">{type.type}</div>
                    <div
                      className="bar-fill"
                      style={{
                        width: `${(type.count / stats.registrations.total) * 100}%`,
                        backgroundColor: getTypeColor(type.type)
                      }}
                    ></div>
                    <div className="bar-value">{type.count}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Keine Anmeldungen gefunden</p>
            )}
          </div>

          {/* Recent Uploads */}
          <div className="recent-uploads">
            <h2>Neueste Uploads</h2>
            {stats.recentUploads?.length > 0 ? (
              <ul className="uploads-list">
                {stats.recentUploads.map(upload => (
                  <li key={upload.id} className="upload-item">
                    <img
                      src={`https://suitwalk-linz-backend.vercel.app/gallery/${upload.event_date.split('T')[0]}/${upload.photographer_id}/thumbnails/${upload.filename}`}
                      alt={upload.title || 'Untitled photo'}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                      }}
                    />
                    <div className="upload-details">
                      <p className="upload-title">{upload.title || 'Untitled'}</p>
                      <p className="upload-photographer">Von: {upload.photographer_name}</p>
                      <p className="upload-date">Hochgeladen: {formatDate(upload.upload_date)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-uploads">Keine neuen Uploads gefunden</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Helper function to get a color for each registration type
function getTypeColor(type) {
  const colorMap = {
    'Suiter': '#ff8080',
    'Fotograf': '#80ff80',
    'Sanitaeter': '#ff8080',
    'Spotter': '#8080ff',
    'Besucher': '#ffff80'
  };

  return colorMap[type] || '#aaaaaa';
}

export default Dashboard;