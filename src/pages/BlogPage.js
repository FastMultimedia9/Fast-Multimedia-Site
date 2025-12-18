import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogAPI, authAPI, formatNumber } from '../supabase';
import './BlogPage.css';

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  // Fetch data - SIMPLIFIED
  useEffect(() => {
    console.log('🚀 BlogPage mounted - fetching data');
    
    const fetchData = async () => {
      try {
        // Check user
        const user = await authAPI.getCurrentUser();
        setCurrentUser(user);
        
        // Fetch posts with comments count
        const posts = await blogAPI.getPosts();
        
        if (posts && posts.length > 0) {
          console.log(`✅ Loaded ${posts.length} real posts from database`);
          
          // For each post, fetch comments count
          const postsWithComments = await Promise.all(
            posts.map(async (post) => {
              try {
                const comments = await blogAPI.getComments(post.id);
                return {
                  ...post,
                  comments_count: comments.length || 0
                };
              } catch (error) {
                console.log(`Error fetching comments for post ${post.id}:`, error.message);
                return {
                  ...post,
                  comments_count: 0
                };
              }
            })
          );
          
          setBlogPosts(postsWithComments);
        } else {
          console.log('📭 No posts in database, showing empty state');
          setBlogPosts([]);
        }
      } catch (error) {
        console.log('❌ Error loading data:', error.message);
        setBlogPosts([]);
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

  // Get unique categories from posts
  const getUniqueCategories = () => {
    const categories = ['all', 'general', 'design', 'development', 'business'];
    const postCategories = blogPosts.map(post => post.category).filter(Boolean);
    const uniqueCategories = [...new Set([...categories, ...postCategories])];
    
    // Count posts per category
    const categoryCounts = {};
    uniqueCategories.forEach(category => {
      if (category === 'all') {
        categoryCounts[category] = blogPosts.length;
      } else {
        categoryCounts[category] = blogPosts.filter(post => post.category === category).length;
      }
    });
    
    return { uniqueCategories, categoryCounts };
  };

  const { uniqueCategories, categoryCounts } = getUniqueCategories();

  // Loading screen
  if (isLoading) {
    return (
      <div className="blog-loading-container">
        <div className="blog-spinner"></div>
        <p className="blog-loading-text">Loading blog posts...</p>
        <small className="blog-loading-subtext">Fetching latest articles</small>
      </div>
    );
  }

  // Main content
  return (
    <div className="blog-page">
      {/* Hero Section */}
      <div className="blog-hero">
        <div className="blog-container">
          <h1 className="blog-title">Blog Insights</h1>
          <p className="blog-subtitle">Discover the latest articles, trends, and expert insights</p>
          
          {/* User status */}
          {currentUser && (
            <div className="blog-user-status">
              <span className="blog-user-badge">
                <i className="fas fa-user-circle"></i> 
                {currentUser.email?.split('@')[0] || 'User'}
              </span>
              <button 
                className="blog-create-post-btn"
                onClick={() => navigate('/login')}
              >
                <i className="fas fa-plus"></i> Create Post
              </button>
            </div>
          )}
          
          {/* Stats Summary */}
          <div className="blog-stats-summary">
            <div className="blog-stat-item">
              <i className="fas fa-newspaper"></i>
              <span className="blog-stat-count">{blogPosts.length}</span>
              <span className="blog-stat-label">Total Articles</span>
            </div>
            <div className="blog-stat-item">
              <i className="fas fa-eye"></i>
              <span className="blog-stat-count">
                {formatNumber(blogPosts.reduce((sum, post) => sum + (post.views || 0), 0))}
              </span>
              <span className="blog-stat-label">Total Views</span>
            </div>
            <div className="blog-stat-item">
              <i className="fas fa-comments"></i>
              <span className="blog-stat-count">
                {formatNumber(blogPosts.reduce((sum, post) => sum + (post.comments_count || 0), 0))}
              </span>
              <span className="blog-stat-label">Total Comments</span>
            </div>
          </div>
          
          {/* Search */}
          <form onSubmit={handleSearch} className="blog-search-form">
            <div className="blog-search-wrapper">
              <i className="fas fa-search blog-search-icon"></i>
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blog-search-input"
              />
              <button type="submit" className="blog-search-button">
                Search
              </button>
              {searchQuery && (
                <button 
                  type="button" 
                  onClick={resetFilters}
                  className="blog-clear-button"
                >
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      
      {/* Categories */}
      <div className="blog-categories-nav">
        <div className="blog-container">
          <div className="blog-categories-scroll">
            {uniqueCategories.map(category => (
              <button 
                key={category}
                className={`blog-category-btn ${activeCategory === category ? 'active' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                <span className="blog-category-name">
                  {category === 'all' ? 'All Posts' : category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
                <span className="blog-category-count">({categoryCounts[category] || 0})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Blog Posts */}
      <div className="blog-container">
        {filteredPosts.length > 0 ? (
          <>
            <div className="blog-grid">
              {filteredPosts.map(post => (
                <div key={post.id} className="blog-card">
                  <div className="blog-card-image">
                    <img 
                      src={post.image_url} 
                      alt={post.title}
                      className="blog-card-img"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&auto=format&fit=crop`;
                      }}
                    />
                    <div className="blog-card-badges">
                      <div className="blog-category-badge">
                        {post.category ? post.category.charAt(0).toUpperCase() + post.category.slice(1) : 'General'}
                      </div>
                      {post.featured && (
                        <div className="blog-featured-badge">
                          <i className="fas fa-star"></i> Featured
                        </div>
                      )}
                    </div>
                    <div className="blog-card-stats-overlay">
                      <div className="blog-card-stat">
                        <i className="fas fa-eye"></i>
                        <span>{formatNumber(post.views || 0)}</span>
                      </div>
                      <div className="blog-card-stat">
                        <i className="fas fa-comment"></i>
                        <span>{formatNumber(post.comments_count || 0)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="blog-card-date">
                        <i className="far fa-calendar"></i>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                      <span className="blog-card-read-time">
                        <i className="far fa-clock"></i>
                        {post.readTime || '5 min read'}
                      </span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-author">
                      <i className="fas fa-user-edit"></i>
                      <span>{post.author || 'Author'}</span>
                    </div>
                    <button 
                      className="blog-read-more-button"
                      onClick={() => navigate(`/blog/${post.id}`)}
                    >
                      <span>Read Article</span>
                      <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Status info */}
            <div className="blog-status-info">
              <div className="blog-status-content">
                <i className="fas fa-info-circle"></i>
                <p>
                  Showing <strong>{filteredPosts.length}</strong> of <strong>{blogPosts.length}</strong> articles • 
                  <span className="blog-database-status">
                    {blogPosts.length > 0 ? ' Live Database' : ' No Articles Yet'}
                  </span>
                  {currentUser ? ' • Logged In' : ' • Guest Mode'}
                </p>
              </div>
              {blogPosts.length === 0 && (
                <button 
                  onClick={() => navigate('/login')}
                  className="blog-create-first-btn"
                >
                  <i className="fas fa-plus-circle"></i> Create Your First Post
                </button>
              )}
            </div>
          </>
        ) : (
          <div className="blog-no-posts">
            <div className="blog-no-posts-icon">
              <i className="far fa-newspaper"></i>
            </div>
            <h3 className="blog-no-posts-title">No articles found</h3>
            <p className="blog-no-posts-message">
              {searchQuery || activeCategory !== 'all' 
                ? 'Try a different search or category filter'
                : 'Be the first to create a blog post!'}
            </p>
            <div className="blog-no-posts-actions">
              {(searchQuery || activeCategory !== 'all') && (
                <button onClick={resetFilters} className="blog-reset-filters-btn">
                  <i className="fas fa-redo"></i> Reset Filters
                </button>
              )}
              <button onClick={() => navigate('/login')} className="blog-create-post-action-btn">
                <i className="fas fa-pen-fancy"></i> Start Writing
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;