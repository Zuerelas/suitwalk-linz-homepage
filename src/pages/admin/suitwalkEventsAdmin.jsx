// Add this component or similar in your admin panel
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './suitwalkEventsAdmin.css';

function SuitwalkEventsAdmin() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    event_date: '',
    sign_in_start: '',
    sign_in_end: '',
    title: '',
    description: '',
    is_next: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://suitwalk-linz-backend.vercel.app/api/admin/suitwalk-events', {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      
      if (!res.ok) {
        throw new Error(`Server returned ${res.status}: ${res.statusText}`);
      }
      
      const data = await res.json();
      
      // Sort events by date (newest first)
      const sortedEvents = (data.events || []).sort((a, b) => 
        new Date(b.event_date) - new Date(a.event_date)
      );
      
      setEvents(sortedEvents);
    } catch (err) {
      setError(`Fehler beim Laden der Events: ${err.message}`);
    }
    setLoading(false);
  };

  useEffect(() => { 
    if (user?.token) {
      fetchEvents(); 
    }
  }, [user?.token]);

  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    
    try {
      const url = editingId 
        ? `https://suitwalk-linz-backend.vercel.app/api/admin/suitwalk-events/${editingId}` 
        : 'https://suitwalk-linz-backend.vercel.app/api/admin/suitwalk-events';
      
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(form)
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Server error');
      }
      
      setSuccess(editingId ? 'Event erfolgreich aktualisiert' : 'Event erfolgreich erstellt');
      resetForm();
      fetchEvents();
    } catch (err) {
      setError(`Fehler: ${err.message}`);
    }
    
    setLoading(false);
  };

  const resetForm = () => {
    setForm({
      event_date: '',
      sign_in_start: '',
      sign_in_end: '',
      title: '',
      description: '',
      is_next: false
    });
    setEditingId(null);
  };

  const editEvent = (event) => {
    // Format dates for datetime-local input
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 16); // Format as YYYY-MM-DDTHH:MM
    };

    setForm({
      event_date: event.event_date.split('T')[0], // Just the date part
      sign_in_start: formatDate(event.sign_in_start),
      sign_in_end: formatDate(event.sign_in_end),
      title: event.title || '',
      description: event.description || '',
      is_next: event.is_next || false
    });
    
    setEditingId(event.id);
    
    // Scroll to form
    document.querySelector('.suitwalk-events-admin form').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  const deleteEvent = async (id) => {
    if (!window.confirm('Möchten Sie dieses Event wirklich löschen?')) {
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`https://suitwalk-linz-backend.vercel.app/api/admin/suitwalk-events/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (!res.ok) {
        throw new Error('Fehler beim Löschen');
      }
      
      setSuccess('Event erfolgreich gelöscht');
      fetchEvents();
    } catch {
      setError('Fehler beim Löschen des Events');
    }
    setLoading(false);
  };

  const setAsNextEvent = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`https://suitwalk-linz-backend.vercel.app/api/admin/suitwalk-events/${id}/set-next`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        throw new Error('Fehler beim Setzen als nächstes Event');
      }
      
      setSuccess('Nächstes Event erfolgreich festgelegt');
      fetchEvents();
    } catch {
      setError('Fehler beim Festlegen des nächsten Events');
    }
    setLoading(false);
  };

  // Determine event status
  const getEventStatus = (event) => {
    const now = new Date();
    const eventDate = new Date(event.event_date);
    const signInStart = new Date(event.sign_in_start);
    const signInEnd = new Date(event.sign_in_end);
    
    if (event.is_next) {
      return { status: 'next', label: 'Nächster Suitwalk' };
    }
    
    if (now > eventDate) {
      return { status: 'past', label: 'Vergangen' };
    }
    
    if (now >= signInStart && now <= signInEnd) {
      return { status: 'active', label: 'Anmeldung offen' };
    }
    
    if (now < signInStart) {
      return { status: 'upcoming', label: 'Anmeldung startet' };
    }
    
    if (now > signInEnd && now < eventDate) {
      return { status: 'closed', label: 'Anmeldung geschlossen' };
    }
    
    return { status: 'unknown', label: 'Unbekannt' };
  };

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

  // Helper function to format date in EU style
  const formatDateEU = (dateString) => {
    if (!dateString) return '';
    
    try {
      // For date-only strings (YYYY-MM-DD)
      if (dateString.length === 10) {
        const [year, month, day] = dateString.split('-');
        return `${day}.${month}.${year}`;
      }
      
      // For datetime-local strings (YYYY-MM-DDTHH:MM)
      const date = new Date(dateString);
      return date.toLocaleString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      console.error('Date formatting error:', e);
      return dateString;
    }
  };

  return (
    <div className="suitwalk-events-admin">
      <h2>{editingId ? 'Event bearbeiten' : 'Neue Suitwalk Veranstaltung'}</h2>
      
      {success && (
        <div className="success-message">
          {success}
          <button onClick={() => setSuccess(null)} className="close-button">×</button>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => setError(null)} className="close-button">×</button>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="event_date">Datum der Veranstaltung:</label>
          <input 
            type="date" 
            id="event_date" 
            name="event_date" 
            value={form.event_date} 
            onChange={handleChange} 
            required 
          />
          {form.event_date && (
            <div className="date-format-hint">
              Ausgewähltes Datum: {formatDateEU(form.event_date)}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="sign_in_start">Anmeldung Start:</label>
          <input 
            type="datetime-local" 
            id="sign_in_start" 
            name="sign_in_start" 
            value={form.sign_in_start} 
            onChange={handleChange} 
            required 
          />
          {form.sign_in_start && (
            <div className="date-format-hint">
              Ausgewählter Zeitpunkt: {formatDateEU(form.sign_in_start)}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="sign_in_end">Anmeldung Ende:</label>
          <input 
            type="datetime-local" 
            id="sign_in_end" 
            name="sign_in_end" 
            value={form.sign_in_end} 
            onChange={handleChange} 
            required 
          />
          {form.sign_in_end && (
            <div className="date-format-hint">
              Ausgewählter Zeitpunkt: {formatDateEU(form.sign_in_end)}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="title">Titel (optional):</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
            placeholder="z.B. Suitwalk Linz Sommer 2023" 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Beschreibung (optional):</label>
          <textarea 
            id="description" 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            placeholder="Details zur Veranstaltung" 
            rows="4"
          />
        </div>
        
        <div className="form-group checkbox-group">
          <label htmlFor="is_next">
            <input 
              type="checkbox" 
              id="is_next" 
              name="is_next" 
              checked={form.is_next} 
              onChange={handleChange} 
            />
            Als nächsten Suitwalk festlegen
          </label>
          <p className="help-text">
            Dieser Suitwalk wird auf der Anmeldeseite angezeigt und für Foto-Uploads verwendet.
          </p>
        </div>
        
        <div className="form-actions">
          <button type="submit" disabled={loading} className="submit-button">
            {editingId ? 'Update speichern' : 'Event anlegen'}
          </button>
          
          {editingId && (
            <button 
              type="button" 
              onClick={resetForm} 
              className="cancel-button"
            >
              Abbrechen
            </button>
          )}
        </div>
      </form>
      
      <h3>Alle Suitwalk Events</h3>
      
      {loading && !events.length ? (
        <div className="loading">Lädt Events...</div>
      ) : events.length === 0 ? (
        <div className="no-events">Keine Events gefunden</div>
      ) : (
        <div className="events-list">
          {events.map(ev => {
            const { status, label } = getEventStatus(ev);
            
            return (
              <div key={ev.id} className={`event-card ${status}`}>
                <div className="event-header">
                  <h4>{ev.title || 'Suitwalk Linz'}</h4>
                  <span className={`event-status ${status}`}>{label}</span>
                </div>
                
                <div className="event-details">
                  <p className="event-date">
                    <strong>Veranstaltung:</strong> {formatDate(ev.event_date).split(',')[0]}
                  </p>
                  
                  <p className="registration-period">
                    <strong>Anmeldezeitraum:</strong><br />
                    Von {formatDate(ev.sign_in_start)} bis<br />
                    {formatDate(ev.sign_in_end)}
                  </p>
                  
                  {ev.description && (
                    <p className="event-description">{ev.description}</p>
                  )}
                </div>
                
                <div className="event-actions">
                  <button 
                    onClick={() => editEvent(ev)}
                    className="edit-button"
                  >
                    Bearbeiten
                  </button>
                  
                  {!ev.is_next && (
                    <button 
                      onClick={() => setAsNextEvent(ev.id)}
                      className="next-button"
                      disabled={loading}
                    >
                      Als nächsten festlegen
                    </button>
                  )}
                  
                  <button 
                    onClick={() => deleteEvent(ev.id)}
                    className="delete-button"
                    disabled={loading}
                  >
                    Löschen
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SuitwalkEventsAdmin;