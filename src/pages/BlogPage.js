// pages/BlogPage.js
import React, { useState } from 'react';
import './BlogPage.css';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Web Design: 2024 Trends',
      excerpt: 'Discover the latest web design trends that are shaping user experiences this year.',
      category: 'design',
      date: 'Mar 15, 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&auto=format&fit=crop',
      featured: true
    },
    {
      id: 2,
      title: 'Building Scalable React Applications',
      excerpt: 'Learn best practices for creating maintainable and scalable React applications.',
      category: 'development',
      date: 'Mar 10, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w-800&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Color Psychology in Branding',
      excerpt: 'How colors influence consumer behavior and brand perception.',
      category: 'design',
      date: 'Mar 5, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w-800&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Optimizing Website Performance',
      excerpt: 'Essential techniques to improve your website loading speed and performance.',
      category: 'development',
      date: 'Feb 28, 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'UI/UX Principles for Mobile Apps',
      excerpt: 'Key design principles that enhance mobile user experiences.',
      category: 'design',
      date: 'Feb 20, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'Introduction to API Integration',
      excerpt: 'A beginner guide to integrating third-party APIs in your applications.',
      category: 'development',
      date: 'Feb 15, 2024',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles' },
    { id: 'design', name: 'Design' },
    { id: 'development', name: 'Development' },
    { id: 'business', name: 'Business' }
  ];

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  return (
    <div className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <h1 className="blog-title">Insights & Resources</h1>
          <p className="blog-subtitle">
            Latest trends, tips, and insights about design, development, and digital strategy.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="featured-post">
        <div className="container">
          <div className="featured-post-card">
            <div className="featured-post-image">
              <img src={blogPosts[0].image} alt={blogPosts[0].title} />
              <div className="featured-badge">Featured</div>
            </div>
            <div className="featured-post-content">
              <div className="post-meta">
                <span className="post-category design">Design</span>
                <span className="post-date">{blogPosts[0].date}</span>
              </div>
              <h2>{blogPosts[0].title}</h2>
              <p>{blogPosts[0].excerpt}</p>
              <a href="#" className="read-more-btn">
                Read Article <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="blog-content">
        <div className="container">
          {/* Categories */}
          <div className="blog-categories">
            {categories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <div className="blog-grid">
            {filteredPosts.slice(1).map(post => (
              <div key={post.id} className="blog-card">
                <div className="blog-card-image">
                  <img src={post.image} alt={post.title} />
                  <div className="category-tag">{post.category}</div>
                </div>
                <div className="blog-card-content">
                  <div className="post-meta">
                    <span className="post-date">{post.date}</span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                  <a href="#" className="read-more-link">
                    Read More <i className="fas fa-arrow-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="newsletter-section">
            <div className="newsletter-content">
              <h3>Stay Updated</h3>
              <p>Get the latest articles and resources delivered to your inbox.</p>
              <form className="newsletter-form">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;