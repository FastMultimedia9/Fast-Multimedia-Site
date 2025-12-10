import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TutorialsPage.css';

const TutorialsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tutorials' },
    { id: 'design', name: 'Graphic Design' },
    { id: 'web', name: 'Web Development' },
    { id: 'marketing', name: 'Digital Marketing' },
    { id: 'video', name: 'Video Editing' },
    { id: 'business', name: 'Business Skills' }
  ];

  const tutorials = [
    {
      id: 1,
      title: 'Logo Design from Scratch',
      category: 'design',
      duration: '45 min',
      level: 'Beginner',
      description: 'Learn to create professional logos using Adobe Illustrator',
      thumbnail: 'https://images.unsplash.com/photo-1634942537034-2531766767d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      views: '2.5K',
      date: '2 weeks ago',
      free: true
    },
    {
      id: 2,
      title: 'Responsive Web Design',
      category: 'web',
      duration: '1h 20min',
      level: 'Intermediate',
      description: 'Master responsive design techniques for all devices',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      views: '3.8K',
      date: '1 week ago',
      free: true
    },
    {
      id: 3,
      title: 'Social Media Marketing',
      category: 'marketing',
      duration: '1h 10min',
      level: 'Beginner',
      description: 'Grow your social media presence effectively',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      views: '1.9K',
      date: '3 days ago',
      free: false
    },
    {
      id: 4,
      title: 'Video Editing Basics',
      category: 'video',
      duration: '55 min',
      level: 'Beginner',
      description: 'Get started with Adobe Premiere Pro editing',
      thumbnail: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      views: '1.2K',
      date: '5 days ago',
      free: true
    },
    {
      id: 5,
      title: 'UI/UX Design Principles',
      category: 'design',
      duration: '1h 30min',
      level: 'Advanced',
      description: 'Advanced user interface and experience design',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      views: '4.2K',
      date: '2 weeks ago',
      free: false
    },
    {
      id: 6,
      title: 'JavaScript Fundamentals',
      category: 'web',
      duration: '2h 15min',
      level: 'Beginner',
      description: 'Complete guide to JavaScript programming',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      views: '5.1K',
      date: '1 month ago',
      free: true
    },
    {
      id: 7,
      title: 'Content Strategy',
      category: 'marketing',
      duration: '1h 5min',
      level: 'Intermediate',
      description: 'Create effective content marketing strategies',
      thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8d3c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      views: '1.8K',
      date: '2 weeks ago',
      free: false
    },
    {
      id: 8,
      title: 'Motion Graphics',
      category: 'video',
      duration: '1h 45min',
      level: 'Intermediate',
      description: 'Create stunning animations with After Effects',
      thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      views: '2.3K',
      date: '1 week ago',
      free: false
    },
    {
      id: 9,
      title: 'Freelance Business Setup',
      category: 'business',
      duration: '1h 15min',
      level: 'Beginner',
      description: 'Start and grow your freelance business',
      thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      views: '3.1K',
      date: '3 weeks ago',
      free: true
    }
  ];

  const filteredTutorials = selectedCategory === 'all' 
    ? tutorials 
    : tutorials.filter(tutorial => tutorial.category === selectedCategory);

  return (
    <div className="tutorials-page">
      {/* Hero Section */}
      <section className="tutorials-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>Free & Premium Tutorials</span>
            </div>
            <h1 className="hero-title">Learn Professional Skills Through Video Tutorials</h1>
            <p className="hero-subtitle">
              Step-by-step video tutorials covering design, development, marketing, 
              and business skills. Learn at your own pace.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <h3>150+</h3>
                <p>Video Tutorials</p>
              </div>
              <div className="stat">
                <h3>50K+</h3>
                <p>Students Learning</p>
              </div>
              <div className="stat">
                <h3>4.9</h3>
                <p>Average Rating</p>
              </div>
              <div className="stat">
                <h3>70%</h3>
                <p>Free Content</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-filter">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="tutorials-grid-section">
        <div className="container">
          <div className="tutorials-header">
            <h2 className="section-title">
              {selectedCategory === 'all' ? 'All Tutorials' : 
               categories.find(c => c.id === selectedCategory)?.name}
            </h2>
            <p className="section-subtitle">
              {filteredTutorials.length} tutorials available
            </p>
          </div>

          <div className="tutorials-grid">
            {filteredTutorials.map(tutorial => (
              <div key={tutorial.id} className="tutorial-card">
                <div className="tutorial-thumbnail">
                  <img src={tutorial.thumbnail} alt={tutorial.title} />
                  <div className="thumbnail-overlay">
                    <span className="duration">{tutorial.duration}</span>
                    {tutorial.free ? (
                      <span className="free-badge">Free</span>
                    ) : (
                      <span className="premium-badge">Premium</span>
                    )}
                  </div>
                </div>

                <div className="tutorial-content">
                  <div className="tutorial-meta">
                    <span className={`level-badge ${tutorial.level.toLowerCase()}`}>
                      {tutorial.level}
                    </span>
                    <span className="category-tag">
                      {categories.find(c => c.id === tutorial.category)?.name}
                    </span>
                  </div>

                  <h3 className="tutorial-title">{tutorial.title}</h3>
                  <p className="tutorial-description">{tutorial.description}</p>

                  <div className="tutorial-footer">
                    <div className="tutorial-stats">
                      <span className="views">
                        <i className="fas fa-eye"></i> {tutorial.views}
                      </span>
                      <span className="date">
                        <i className="far fa-clock"></i> {tutorial.date}
                      </span>
                    </div>
                    
                    <Link 
                      to={tutorial.free ? `/tutorials/${tutorial.id}` : '/contact'}
                      className={`watch-btn ${tutorial.free ? 'free' : 'premium'}`}
                    >
                      {tutorial.free ? 'Watch Free' : 'Get Premium'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Unlock All Premium Content</h2>
            <p className="section-subtitle">
              Get access to all premium tutorials, templates, and resources
            </p>
          </div>

          <div className="pricing-cards">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Monthly Access</h3>
                <div className="price">
                  <span className="amount">₵99</span>
                  <span className="period">/month</span>
                </div>
              </div>
              <ul className="features">
                <li><i className="fas fa-check"></i> All Premium Tutorials</li>
                <li><i className="fas fa-check"></i> New Content Weekly</li>
                <li><i className="fas fa-check"></i> Download Resources</li>
                <li><i className="fas fa-check"></i> Community Access</li>
                <li><i className="fas fa-times"></i> Certificate</li>
              </ul>
              <Link to="/contact" className="btn btn-primary">
                Get Started
              </Link>
            </div>

            <div className="pricing-card popular">
              <div className="popular-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Annual Access</h3>
                <div className="price">
                  <span className="amount">₵899</span>
                  <span className="period">/year</span>
                </div>
                <div className="savings">Save ₵289</div>
              </div>
              <ul className="features">
                <li><i className="fas fa-check"></i> All Premium Tutorials</li>
                <li><i className="fas fa-check"></i> New Content Weekly</li>
                <li><i className="fas fa-check"></i> Download Resources</li>
                <li><i className="fas fa-check"></i> Community Access</li>
                <li><i className="fas fa-check"></i> Free Certificate</li>
              </ul>
              <Link to="/contact" className="btn btn-primary">
                Get Started
              </Link>
            </div>

            <div className="pricing-card">
              <div className="pricing-header">
                <h3>Lifetime Access</h3>
                <div className="price">
                  <span className="amount">₵1,999</span>
                  <span className="period">one-time</span>
                </div>
              </div>
              <ul className="features">
                <li><i className="fas fa-check"></i> All Premium Tutorials</li>
                <li><i className="fas fa-check"></i> New Content Weekly</li>
                <li><i className="fas fa-check"></i> Download Resources</li>
                <li><i className="fas fa-check"></i> Community Access</li>
                <li><i className="fas fa-check"></i> Free Certificate</li>
              </ul>
              <Link to="/contact" className="btn btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="tutorials-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Start Learning Today</h2>
            <p>
              Join thousands of learners improving their skills with our 
              comprehensive tutorial library.
            </p>
            <div className="cta-buttons">
              <Link to="/training" className="btn btn-primary">
                <i className="fas fa-graduation-cap"></i> View Training Programs
              </Link>
              <Link to="/contact" className="btn btn-outline">
                <i className="fas fa-question-circle"></i> Need Help Choosing?
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TutorialsPage;