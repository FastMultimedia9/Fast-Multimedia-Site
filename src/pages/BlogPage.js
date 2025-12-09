// pages/BlogPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogPage.css';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const authorInfo = {
    name: "Alex Johnson",
    bio: "Tech & Design Specialist",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop",
    social: {
      twitter: "#",
      linkedin: "#",
      dribbble: "#"
    }
  };

  const blogPosts = [
    {
      id: 1,
      title: 'The Future of Web Design: 2024 Trends',
      excerpt: 'Discover the latest web design trends that are shaping user experiences this year.',
      category: 'design',
      date: 'Mar 15, 2024',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&auto=format&fit=crop',
      featured: true,
      views: '1.2K',
      comments: 24,
      content: 'Full article content here...'
    },
    {
      id: 2,
      title: 'Building Scalable React Applications',
      excerpt: 'Learn best practices for creating maintainable and scalable React applications.',
      category: 'development',
      date: 'Mar 10, 2024',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop',
      views: '890',
      comments: 18,
      content: 'Full article content here...'
    },
    {
      id: 3,
      title: 'Color Psychology in Branding',
      excerpt: 'How colors influence consumer behavior and brand perception.',
      category: 'design',
      date: 'Mar 5, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?w=800&auto=format&fit=crop',
      views: '1.5K',
      comments: 32,
      content: 'Full article content here...'
    },
    {
      id: 4,
      title: 'Optimizing Website Performance',
      excerpt: 'Essential techniques to improve your website loading speed and performance.',
      category: 'development',
      date: 'Feb 28, 2024',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop',
      views: '980',
      comments: 21,
      content: 'Full article content here...'
    },
    {
      id: 5,
      title: 'UI/UX Principles for Mobile Apps',
      excerpt: 'Key design principles that enhance mobile user experiences.',
      category: 'design',
      date: 'Feb 20, 2024',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop',
      views: '1.1K',
      comments: 27,
      content: 'Full article content here...'
    },
    {
      id: 6,
      title: 'Introduction to API Integration',
      excerpt: 'A beginner guide to integrating third-party APIs in your applications.',
      category: 'development',
      date: 'Feb 15, 2024',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop',
      views: '750',
      comments: 15,
      content: 'Full article content here...'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles', count: 6 },
    { id: 'design', name: 'Design', count: 3 },
    { id: 'development', name: 'Development', count: 3 },
    { id: 'business', name: 'Business', count: 0 }
  ];

  const popularPosts = [
    {
      id: 1,
      title: '10 Essential Design Tools for 2024',
      views: '2.1K',
      date: '2 weeks ago'
    },
    {
      id: 2,
      title: 'React vs Vue: Which to Choose?',
      views: '1.8K',
      date: '3 weeks ago'
    },
    {
      id: 3,
      title: 'Freelance Pricing Strategies',
      views: '1.5K',
      date: '1 month ago'
    },
    {
      id: 4,
      title: 'Building a Personal Brand Online',
      views: '1.3K',
      date: '1 month ago'
    }
  ];

  const handleReadMore = (postId) => {
    // In a real app, this would navigate to a single post page
    // For now, we'll simulate it with an alert
    const post = blogPosts.find(p => p.id === postId);
    if (post) {
      alert(`Reading: ${post.title}\n\nThis would navigate to a full article page in a real application.`);
      // Uncomment for actual navigation:
      // navigate(`/blog/${postId}`, { state: { post } });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      alert(`Searching for: "${searchQuery}"\n\nSearch functionality would be implemented with backend integration.`);
      setSearchQuery('');
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
      alert(`Thank you for subscribing with: ${email}\n\nYou'll receive our latest updates.`);
      e.target.reset();
    }
  };

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
          
          {/* Search Bar */}
          <div className="blog-search">
            <form onSubmit={handleSearch} className="search-wrapper">
              <i className="fas fa-search"></i>
              <input 
                type="text" 
                placeholder="Search articles, tutorials, and resources..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-btn">Search</button>
            </form>
          </div>
        </div>
      </section>

      <div className="container blog-layout">
        <div className="blog-main">
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
                  
                  {/* Author Info */}
                  <div className="post-author">
                    <img src={authorInfo.avatar} alt={authorInfo.name} />
                    <div>
                      <h4>{authorInfo.name}</h4>
                      <p>{authorInfo.bio}</p>
                      <div className="author-social">
                        <a href={authorInfo.social.twitter}><i className="fab fa-twitter"></i></a>
                        <a href={authorInfo.social.linkedin}><i className="fab fa-linkedin"></i></a>
                        <a href={authorInfo.social.dribbble}><i className="fab fa-dribbble"></i></a>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="read-more-btn"
                    onClick={() => handleReadMore(blogPosts[0].id)}
                  >
                    Read Article <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Blog Content */}
          <section className="blog-content">
            <div className="container">
              {/* Categories Header */}
              <div className="blog-header">
                <div className="blog-categories">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
                      onClick={() => setActiveCategory(category.id)}
                    >
                      {category.name}
                      <span className="category-count">({category.count})</span>
                    </button>
                  ))}
                </div>
                
                {/* Sort Options */}
                <div className="sort-options">
                  <span>Sort by:</span>
                  <select className="sort-select" defaultValue="newest">
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
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
                      
                      {/* Post Stats */}
                      <div className="post-stats">
                        <span><i className="fas fa-eye"></i> {post.views}</span>
                        <span><i className="fas fa-comment"></i> {post.comments}</span>
                      </div>
                      
                      <button 
                        className="read-more-link"
                        onClick={() => handleReadMore(post.id)}
                      >
                        Read More <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="pagination">
                <button className="pagination-btn disabled">← Previous</button>
                <div className="page-numbers">
                  <span className="active">1</span>
                  <span>2</span>
                  <span>3</span>
                  <span className="ellipsis">...</span>
                  <span>10</span>
                </div>
                <button className="pagination-btn">Next →</button>
              </div>

              {/* Newsletter */}
              <div className="newsletter-section">
                <div className="newsletter-content">
                  <h3>Stay Updated</h3>
                  <p>Get the latest articles and resources delivered to your inbox.</p>
                  <form className="newsletter-form" onSubmit={handleSubscribe}>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="newsletter-input"
                      required
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

        {/* Sidebar */}
        <aside className="blog-sidebar">
          {/* About Author */}
          <div className="sidebar-widget">
            <h3>About the Author</h3>
            <div className="author-widget">
              <img src={authorInfo.avatar} alt="Author" />
              <h4>{authorInfo.name}</h4>
              <p>Senior Designer & Developer with 8+ years experience creating digital solutions for businesses worldwide.</p>
              <button className="follow-btn">
                <i className="fas fa-user-plus"></i> Follow
              </button>
            </div>
          </div>

          {/* Popular Posts */}
          <div className="sidebar-widget">
            <h3>Popular Posts</h3>
            <div className="popular-posts">
              {popularPosts.map(post => (
                <div key={post.id} className="popular-post">
                  <h4 onClick={() => alert(`Reading: ${post.title}`)}>{post.title}</h4>
                  <div className="post-meta">
                    <span><i className="fas fa-eye"></i> {post.views}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="sidebar-widget">
            <h3>Categories</h3>
            <div className="category-list">
              {categories.slice(1).map(category => (
                <button 
                  key={category.id} 
                  className={`category-item ${activeCategory === category.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span>{category.name}</span>
                  <span className="count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div className="sidebar-widget">
            <h3>Free Resources</h3>
            <div className="resources-list">
              <button className="resource-link" onClick={() => alert('Downloading UI Kit...')}>
                <i className="fas fa-download"></i>
                <span>Free UI Kit</span>
              </button>
              <button className="resource-link" onClick={() => alert('Opening Design eBook...')}>
                <i className="fas fa-book"></i>
                <span>Design eBook</span>
              </button>
              <button className="resource-link" onClick={() => alert('Opening Tutorial Videos...')}>
                <i className="fas fa-video"></i>
                <span>Tutorial Videos</span>
              </button>
              <button className="resource-link" onClick={() => alert('Downloading Icon Set...')}>
                <i className="fas fa-icons"></i>
                <span>Icon Set (500+)</span>
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="sidebar-widget">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#" className="social-link twitter">
                <i className="fab fa-twitter"></i>
                <span>Twitter</span>
              </a>
              <a href="#" className="social-link linkedin">
                <i className="fab fa-linkedin"></i>
                <span>LinkedIn</span>
              </a>
              <a href="#" className="social-link dribbble">
                <i className="fab fa-dribbble"></i>
                <span>Dribbble</span>
              </a>
              <a href="#" className="social-link github">
                <i className="fab fa-github"></i>
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogPage;