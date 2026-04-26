import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });

      if (response.status === 200) {
        navigate('/dashboard', { state: { user: response.data.user } });
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      {/* Left Banner Content */}
      <div className="login-left">
        <div className="left-overlay"></div>
        <h1 className="brand-title">Streamex</h1>
        <p className="hero-motto">
          Your portal to infinite stories. Breathtaking cinematic experiences, personalized just for you.
        </p>
        <div className="feature-list">
          <div className="feature-item">
            <div className="feature-icon">✨</div>
            <span>4K HDR</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">🎬</div>
            <span>Originals</span>
          </div>
          <div className="feature-item">
            <div className="feature-icon">📱</div>
            <span>Any Device</span>
          </div>
        </div>
      </div>
      
      {/* Right Auth Form */}
      <div className="login-right">
        <div className="login-card">
          <h2>Welcome Back</h2>
          <p className="subtitle">Sign in to resume your journey.</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <input 
                type="text" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
              />
              <label htmlFor="email">Email address</label>
            </div>
            
            <div className="input-group">
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=" "
              />
              <label htmlFor="password">Password</label>
            </div>
            
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'}
            </button>
            
            <div className="login-helper">
              <label className="remember-me">
                <input type="checkbox" defaultChecked />
                Remember me
              </label>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a href="#" className="need-help">Forgot password?</a>
            </div>
          </form>
          
          <div className="login-footer-content">
            <p className="signup-text">
              Don't have an account? <Link to="/signup">Register Now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
