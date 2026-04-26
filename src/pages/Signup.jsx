import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter a valid email and password.');
      return;
    }
    
    if (password.length < 4) {
      setError('Your password must contain between 4 and 60 characters.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        email,
        password,
        name
      });

      if (response.status === 201) {
        navigate('/login');
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
          Join the revolution of entertainment. Thousands of movies and shows are waiting for you.
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
          <h2>Create Account</h2>
          <p className="subtitle">Launch your premium experience.</p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSignup} className="login-form">
            <div className="input-group">
              <input 
                type="text" 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=" "
              />
              <label htmlFor="name">Your Name</label>
            </div>

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
              {loading ? 'Creating Account...' : 'Get Started'}
            </button>
          </form>
          
          <div className="login-footer-content">
            <p className="signup-text">
              Already a member? <Link to="/login">Sign in now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
