import React, { useState, useEffect } from 'react';
import './Hero.css';

// Import your hero images (add these to src/images/hero-images/)
// For now, using placeholder URLs
const heroImages = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  return (
    <div className="hero">
      <div 
        className="hero-image" 
        style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Welcome to Golden Nest</h1>
            <p>Experience Luxury Like Never Before</p>
            <div className="hero-buttons">
              <button className="btn-primary">Book Your Stay</button>
              <button className="btn-secondary">Explore Rooms</button>
            </div>
          </div>
        </div>
      </div>
      
      <button className="slider-btn prev" onClick={prevImage}>‹</button>
      <button className="slider-btn next" onClick={nextImage}>›</button>
      
      <div className="slider-dots">
        {heroImages.map((_, index) => (
          <span 
            key={index} 
            className={`dot ${index === currentImage ? 'active' : ''}`}
            onClick={() => setCurrentImage(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Hero;