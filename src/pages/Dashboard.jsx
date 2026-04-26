import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Dashboard.css';
import daredevil from './daredevil-born-again-poster.jpg';
import theBoys from './poster-the-boys-season-2.jpg';
import season4 from './season-4.jpg';
import finalImg from './final.jpg';
import unnamed4 from './unnamed-4.jpg';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || { name: 'Guest' };

  const handleLogout = () => {
    navigate('/login');
  };

  const trendingMovies = [
    { title: 'Daredevil: Born Again', image: daredevil, genre: 'Action / Crime' },
    { title: 'The Boys', image: theBoys, genre: 'Action / Thriller' },
    { title: 'Invincible', image: season4, genre: 'Action / Thriller' },
    { title: 'Deadpool & Wolverine', image: finalImg, genre: 'Action / Comedy' },
    { title: 'The Conjuring', image: unnamed4, genre: 'Horror / Thriller' }
  ];

  return (
    <div className="dashboard-wrapper">
      <nav className="glass-nav">
        <h1 className="brand-logo">Streamex</h1>
        <div className="nav-actions">
          <span className="welcome-text">Hi, {user.name}</span>
          <button onClick={handleLogout} className="glass-btn">Sign Out</button>
        </div>
      </nav>

      <main className="dashboard-content">
        <header className="hero-banner">
          <div className="hero-info">
            <span className="badge">New Release</span>
            <h2 className="hero-title">Daredevil: Born Again</h2>
            <p className="hero-desc">
              The devil rests for no man. Matt Murdock returns to the unforgiving streets of Hell's Kitchen to confront the consequences of his actions and a new era of crime.
            </p>
            <div className="hero-actions">
              <button className="primary-btn">▶ Play Now</button>
              <button className="secondary-btn">More Info</button>
            </div>
          </div>
        </header>

        <section className="trending-section">
          <h3 className="section-title">Trending Right Now</h3>
          <div className="carousel">
            {trendingMovies.map((movie, idx) => (
              <div className="movie-card" key={idx}>
                <img src={movie.image} alt={movie.title} className="movie-img" />
                <div className="movie-overlay">
                  <h4>{movie.title}</h4>
                  <p>{movie.genre}</p>
                  <button className="play-icon-btn">▶</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
