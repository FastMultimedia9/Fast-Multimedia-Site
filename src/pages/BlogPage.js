import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogAPI, authAPI } from '../supabase';
import './BlogPage.css';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  // Demo posts as fallback
  const demoPosts = [
    {
      id: 1,
      title: "Welcome to Our Blog",
      excerpt: "This is a sample post. Create your own posts to see them here!",
      content: "Welcome to your new blog! This is a sample post to show you how your articles will look.",
      category: "general",
      image_url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&auto=format&fit=crop",
      views: 0,
      comments: 0,
      likes: 0,
      featured: true,
      published: true,
      created_at: new Date().toISOString(),
      readTime: '2 min read',
      author: 'Admin'
    },
    {
      id: 2,
      title: "How to Create Your First Post",
      excerpt: "Learn how to create and publish your first blog post on our platform.",
      content: "Creating posts is easy! Here's how to get started.",
      category: "development",
      image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
      views: 0,
      comments: 0,
      likes: 0,
      featured: false,
      published: true,
      created_at: new Date().toISOString(),
      readTime: '3 min read',
      author: 'Admin'
    },
    {
      id: 3,
      title: "Best Practices for Blogging",
      excerpt: "Tips and tricks for writing engaging blog content.",
      content: "Here are some best practices for creating great blog content.",
      category: "business",
      image_url: "https://images.unsplash.com/photo-1545239351-ef35f43d514b?w=800&auto=format&fit=crop",
      views: 0,
      comments: 0,
      likes: 0,
      featured: false,
      published: true,
      created_at: new Date().toISOString(),
      readTime: '4 min read',
      author: 'Admin'
    }
  ];

  // Fetch data - SIMPLIFIED
  useEffect(() => {
    console.log('🚀 BlogPage mounted - fetching data');
    
    const fetchData = async () => {
      try {
        // Check user
        const user = await authAPI.getCurrentUser();
        setCurrentUser(user);
        
        // Fetch posts
        const posts = await blogAPI.getPosts();
        
        if (posts && posts.length > 0) {
          console.log(`✅ Loaded ${posts.length} real posts from database`);
          setBlogPosts(posts);
        } else {
          console.log('📭 No posts in database, showing demo posts');
          setBlogPosts(demoPosts);
        }
      } catch (error) {
        console.log('❌ Error loading data, showing demo posts:', error.message);
        setBlogPosts(demoPosts);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
    
    // Cleanup function
    return () => {
      console.log('🧹 BlogPage cleanup');
    };
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    const filtered = blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setBlogPosts(filtered);
  };

  // Handle category filter
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    // Reload original data
    window.location.reload(); // Simple refresh
  };

  // Filter posts by category
  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  // Loading screen
  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading blog posts...</p>
        <small style={styles.loadingSubtext}>Connecting to database</small>
      </div>
    );
  }

  // Main content
  return (
    <div className="blog-page">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="container">
          <h1 className="blog-title">Blog</h1>
          <p className="blog-subtitle">Latest articles and insights</p>
          
          {/* User status */}
          {currentUser && (
            <div className="user-status">
              <span className="user-badge">
                👤 {currentUser.email?.split('@')[0] || 'User'}
              </span>
              <button 
                className="create-post-btn"
                onClick={() => navigate('/login')}
              >
                + Create Post
              </button>
            </div>
          )}
          
          {/* Search */}
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              Search
            </button>
            {searchQuery && (
              <button 
                type="button" 
                onClick={resetFilters}
                className="clear-button"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      </div>
      
      {/* Categories */}
      <div className="categories-nav">
        <div className="container">
          <button 
            className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('all')}
          >
            All Posts
          </button>
          <button 
            className={`category-btn ${activeCategory === 'design' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('design')}
          >
            Design
          </button>
          <button 
            className={`category-btn ${activeCategory === 'development' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('development')}
          >
            Development
          </button>
          <button 
            className={`category-btn ${activeCategory === 'business' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('business')}
          >
            Business
          </button>
          <button 
            className={`category-btn ${activeCategory === 'general' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('general')}
          >
            General
          </button>
        </div>
      </div>
      
      {/* Blog Posts */}
      <div className="container">
        <div className="blog-grid">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div key={post.id} className="blog-card">
                <div className="blog-card-image">
                  <img 
                    src={post.image_url} 
                    alt={post.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&auto=format&fit=crop`;
                    }}
                  />
                  <div className="category-badge">
                    {post.category || 'General'}
                  </div>
                  {post.featured && (
                    <div className="featured-badge">Featured</div>
                  )}
                </div>
                <div className="blog-card-content">
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <span className="post-date">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>
                  <button 
                    className="read-more-button"
                    onClick={() => navigate(`/blog/${post.id}`)}
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-posts">
              <h3>No posts found</h3>
              <p>Try a different search or category</p>
              <button onClick={resetFilters} className="reset-button">
                Show All Posts
              </button>
            </div>
          )}
        </div>
        
        {/* Status info */}
        <div className="status-info">
          <p>
            Showing {filteredPosts.length} of {blogPosts.length} posts • 
            {blogPosts[0]?.id === 1 ? ' Demo Mode' : ' Live Database'}
            {currentUser ? ' • Logged In' : ' • Guest'}
          </p>
        </div>
      </div>
      
      {/* Add CSS styles */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Inline styles for loading screen
const styles = {
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f9f9f9'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },
  loadingText: {
    fontSize: '20px',
    color: '#333',
    marginBottom: '10px',
    fontWeight: '500'
  },
  loadingSubtext: {
    color: '#666',
    fontSize: '14px'
  }
};

export default BlogPage;