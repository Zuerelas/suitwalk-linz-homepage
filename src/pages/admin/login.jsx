import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './login.css';
import ScrollAnimation from '../../ScrollAnimation';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    console.log('Starting login request...');
    
    try {
      // First test endpoint connectivity
      console.log('Testing API connectivity...');
      try {
        const testResponse = await fetch('https://suitwalk-linz-backend.vercel.app/api/test-endpoint');
        console.log('Test endpoint status:', testResponse.status);
        if (testResponse.ok) {
          const testData = await testResponse.json();
          console.log('Test endpoint response:', testData);
        } else {
          console.error('Test endpoint error:', testResponse.status);
        }
      } catch (testErr) {
        console.error('Test endpoint failed:', testErr);
      }
      
      // Now attempt the login
      console.log('Sending login request with credentials...');
      const response = await fetch('https://suitwalk-linz-backend.vercel.app/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          username, 
          password 
        })
      });
      
      console.log('Login response status:', response.status);
      console.log('Login response headers:', {
        'content-type': response.headers.get('content-type'),
        'server': response.headers.get('server')
      });
      
      let data;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('Login response JSON:', data);
      } else {
        const text = await response.text();
        console.log('Login response text:', text);
        throw new Error('Response is not JSON: ' + text);
      }
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      
      // Check if we have the token
      if (!data.token) {
        console.error('No token received in response');
        throw new Error('Authentication failed - no token received');
      }
      
      console.log('Login successful, got token');
      // Save user data and token in AuthContext
      login(data.user, data.token);
      
      // Redirect to admin panel
      console.log('Navigating to admin panel...');
      navigate('/admin/panel');
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-content admin-login-container">
      <ScrollAnimation>
        <div className="admin-login-card">
          <h1>Admin Login</h1>
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                autoFocus
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </ScrollAnimation>
    </div>
  );
}

export default Login;