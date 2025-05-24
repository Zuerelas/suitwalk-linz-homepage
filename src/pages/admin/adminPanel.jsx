import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Dashboard from './dashboard';
import PhotoManagement from './photoManagement';
import PhotographerManagement from './photographerManagement';
import SuitwalkEventsAdmin from './suitwalkEventsAdmin';

function AdminPanel() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const { user, logout } = useAuth();

    // Redirect to login if not authenticated
    if (!user || !user.token) {
        return <Navigate to="/admin" replace />;
    }

    return (
        <div className="container-content admin-panel">
            {/* Navigation sidebar */}
            <div className="admin-sidebar">
                <h1>Admin Panel</h1>
                <nav>
                    <button
                        className={activeTab === 'dashboard' ? 'active' : ''}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        Dashboard
                    </button>
                    <button
                        className={activeTab === 'photos' ? 'active' : ''}
                        onClick={() => setActiveTab('photos')}
                    >
                        Photo Management
                    </button>
                    <button
                        className={activeTab === 'photographers' ? 'active' : ''}
                        onClick={() => setActiveTab('photographers')}
                    >
                        Photographers
                    </button>
                    <button
                        className={activeTab === 'suitwalk-events' ? 'active' : ''}
                        onClick={() => setActiveTab('suitwalk-events')}
                    >
                        Suitwalk Events
                    </button>
                    <button className="logout" onClick={logout}>Logout</button>
                </nav>
            </div>

            {/* Content area */}
            <div className="admin-content">
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'photos' && <PhotoManagement />}
                {activeTab === 'photographers' && <PhotographerManagement />}
                {activeTab === 'suitwalk-events' && <SuitwalkEventsAdmin />}
            </div>
        </div>
    );
}

export default AdminPanel;