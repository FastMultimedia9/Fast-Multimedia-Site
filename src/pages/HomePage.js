import React from 'react';
import Hero from '../components/Hero';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <Hero />
      
      <section className="features">
        <div className="container">
          <h2>Why Choose Golden Nest?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🏨</div>
              <h3>Luxury Rooms</h3>
              <p>Spacious rooms with premium amenities</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🍽️</div>
              <h3>Fine Dining</h3>
              <p>World-class restaurants and bars</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏊</div>
              <h3>Premium Pool</h3>
              <p>Infinity pool with panoramic views</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛎️</div>
              <h3>24/7 Service</h3>
              <p>Round-the-clock concierge service</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rooms-preview">
        <div className="container">
          <h2>Our Rooms & Suites</h2>
          <div className="rooms-grid">
            <div className="room-card">
              <div className="room-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)'}}></div>
              <h3>Deluxe Room</h3>
              <p className="price">From $199/night</p>
            </div>
            <div className="room-card">
              <div className="room-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)'}}></div>
              <h3>Executive Suite</h3>
              <p className="price">From $299/night</p>
            </div>
            <div className="room-card">
              <div className="room-image" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80)'}}></div>
              <h3>Presidential Suite</h3>
              <p className="price">From $499/night</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;