import React, { useState, useEffect } from 'react';
import '../pages/template.css';
import './suitwalkUsers.css';

function SuitwalkUsers() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [registrationData, setRegistrationData] = useState(null);
    const [activeTab, setActiveTab] = useState('stats'); // 'stats' or 'attendees'
    const [filter, setFilter] = useState('all'); // Filter for attendee types

    // Fetch public registration data
    const fetchPublicStats = async () => {
        setLoading(true);
        try {
            // Use the dedicated API route
            const response = await fetch(`https://suitwalk-linz-backend.vercel.app/api/public-stats?t=${Date.now()}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Fetched data:', data);
            setRegistrationData(data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch registration data:', err);
            setRegistrationData({
                summary: [],
                totals: { users: 0, badges: 0 },
                attendees: []
            });
            setError('Anmeldedaten konnten nicht geladen werden.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch data when component mounts
    useEffect(() => {
        fetchPublicStats();

        // Set up auto-refresh every 5 minutes
        const refreshInterval = setInterval(fetchPublicStats, 300000);

        // Clean up interval on unmount
        return () => clearInterval(refreshInterval);
    }, []);

    // Get attendees filtered by type if needed
    const getFilteredAttendees = () => {
        if (!registrationData?.attendees) return [];

        if (filter === 'all') {
            return registrationData.attendees;
        }

        return registrationData.attendees.filter(attendee => attendee.type === filter);
    };

    // Group attendees by type
    const getAttendeesByType = () => {
        const filtered = getFilteredAttendees();

        return filtered.reduce((grouped, attendee) => {
            if (!grouped[attendee.type]) {
                grouped[attendee.type] = [];
            }
            grouped[attendee.type].push(attendee);
            return grouped;
        }, {});
    };

    // Get unique attendee types for filter with predefined order
    const getAttendeeTypes = () => {
        if (!registrationData?.summary) return [];
        
        // Define the preferred order - update to consistently use "Sanitäter"
        const preferredOrder = ['Suiter', 'Spotter', 'Fotograf', 'Sanitäter', 'Besucher'];
        
        // Get all available types
        const availableTypes = registrationData.summary.map(item => item.type);
        
        // Return types in the preferred order (if they exist in the data)
        // First include all types that match our preferred order
        const orderedTypes = preferredOrder.filter(type => 
            availableTypes.includes(type) || 
            (type === 'Sanitäter' && availableTypes.includes('Sanitaeter'))
        );
        
        // Then add any other types that might exist but aren't in our preferred list
        const otherTypes = availableTypes.filter(type => 
            !preferredOrder.includes(type) && 
            !(type === 'Sanitaeter' && preferredOrder.includes('Sanitäter'))
        );
        
        return [...orderedTypes, ...otherTypes];
    };

    // When displaying attendee sections, sort by the preferred order
    const getSortedAttendeeTypes = () => {
        const typeOrder = {
            'Suiter': 1,
            'Spotter': 2,
            'Fotograf': 3,
            'Sanitaeter': 4,
            'Sanitäter': 4, // Same priority as Sanitaeter
            'Besucher': 5
        };
        
        const grouped = getAttendeesByType();
        
        // Sort the entries by the defined order
        return Object.entries(grouped).sort((a, b) => {
            const orderA = typeOrder[a[0]] || 999; // Default high value for unknown types
            const orderB = typeOrder[b[0]] || 999;
            return orderA - orderB;
        });
    };

    // New function to sort the summary data for stats display
    const getSortedSummary = () => {
        if (!registrationData?.summary) return [];
        
        const typeOrder = {
            'Suiter': 1,
            'Spotter': 2,
            'Fotograf': 3,
            'Sanitaeter': 4,
            'Sanitäter': 4, // Same priority
            'Besucher': 5
        };
        
        // Create a copy to avoid modifying the original data
        return [...registrationData.summary].sort((a, b) => {
            const orderA = typeOrder[a.type] || 999;
            const orderB = typeOrder[b.type] || 999;
            return orderA - orderB;
        });
    };

    // Format type name for display (convert Sanitaeter to Sanitäter)
    const formatTypeName = (type) => {
        return type === 'Sanitaeter' ? 'Sanitäter' : type;
    };

    // Get appropriate class for user type
    const getTypeClass = (type) => {
        const typeMap = {
            'Suiter': 'suiter',
            'Spotter': 'spotter',
            'Sanitaeter': 'sanitaeter',
            'Sanitäter': 'sanitaeter',
            'Fotograf': 'fotograf',
            'Besucher': 'besucher'
        };

        return typeMap[type] || 'other';
    };

    return (
        <div className="registration-dashboard public">
            <h2 className="stats-title">Suitwalk Linz - Teilnehmer</h2>

            {/* Tab navigation */}
            <div className="tab-navigation">
                <button
                    className={`tab-button ${activeTab === 'stats' ? 'active' : ''}`}
                    onClick={() => setActiveTab('stats')}
                >
                    Statistik
                </button>
                <button
                    className={`tab-button ${activeTab === 'attendees' ? 'active' : ''}`}
                    onClick={() => setActiveTab('attendees')}
                >
                    Teilnehmerliste
                </button>
            </div>

            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Lade Anmeldungsdaten...</p>
                </div>
            ) : (
                <>
                    {activeTab === 'stats' && (
                        <div className="statistics-container">
                            <div className="stat-card total-users">
                                <h3>Gesamt</h3>
                                <div className="stat-value">{registrationData?.totals?.users || 0}</div>
                            </div>
                            <div className="stat-card total-badges">
                                <h3>Badges</h3>
                                <div className="stat-value">{registrationData?.totals?.badges || 0}</div>
                            </div>

                            {/* Use sorted summary data */}
                            {getSortedSummary().map((item, index) => (
                                <div className={`stat-card type-${getTypeClass(item.type)}`} key={index}>
                                    <h3>{formatTypeName(item.type) || 'Unknown'}</h3>
                                    <div className="stat-value">{item.count}</div>
                                    <div className="stat-sub-value">({item.badge_count} mit Badge)</div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'attendees' && (
                        <>
                            {/* Type filter for attendees */}
                            <div className="attendee-filters">
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="type-filter"
                                >
                                    <option value="all">Alle Teilnehmer</option>
                                    {getAttendeeTypes().map((type, index) => (
                                        <option key={index} value={type}>{formatTypeName(type)}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="attendees-container">
                                {getSortedAttendeeTypes().map(([type, attendees]) => (
                                    <div className={`attendee-type-section type-${getTypeClass(type)}`} key={type}>
                                        <h3 className="attendee-type-title">{formatTypeName(type)} ({attendees.length})</h3>
                                        <div className="attendee-list">
                                            {attendees.map((attendee, index) => (
                                                <div className="attendee-item" key={index}>
                                                    <span className="attendee-name">{attendee.first_name}</span>
                                                    {attendee.badge == 1 && <span className="badge-icon" title="Hat ein Badge bestellt">🏷️</span>}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                
                                {getFilteredAttendees().length === 0 && (
                                    <div className="no-attendees">
                                        <p>{filter === 'all' ? 'Noch keine Anmeldungen vorhanden.' : `Keine ${formatTypeName(filter)} angemeldet.`}</p>
                                    </div>
                                )}
                            </div>

                            <div className="attendee-info">
                                <p>Insgesamt {getFilteredAttendees().length} Teilnehmer {filter !== 'all' ? `als ${formatTypeName(filter)}` : ''} angemeldet</p>
                                <p>🏷️ = Hat ein Badge bestellt</p>
                            </div>
                        </>
                    )}

                    {error && (
                        <div className="error-message">
                            {error}
                            <button onClick={fetchPublicStats} className="retry-button">
                                Erneut versuchen
                            </button>
                        </div>
                    )}

                    <div className="registration-message">
                        <p>Du möchtest auch am Suitwalk teilnehmen? Jetzt Anmelden!</p>
                        <div className='registration-buttons'>
                            <a href="/#/anmeldung/suiter" className="register-link">Suiter</a>
                            <a href="/#/anmeldung/spotter" className="register-link">Spotter</a>
                            <a href="/#/anmeldung/sanitaeter" className="register-link">Sanitäter</a>
                            <a href="/#/anmeldung/fotografen" className="register-link">Fotografen</a>
                            <a href="/#/anmeldung/besucher" className="register-link">Besucher</a>
                            <a href="/#/anmeldung/badges" className="register-link">Badges</a>
                        </div>
                    </div>

                    <div className="last-updated">
                        Zuletzt aktualisiert: {new Date().toLocaleString('de-DE')}
                    </div>
                </>
            )}
        </div>
    );
}

export default SuitwalkUsers;