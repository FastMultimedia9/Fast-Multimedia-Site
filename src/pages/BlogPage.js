import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { blogAPI, formatNumber } from '../supabase';
import './BlogPage.css';

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [popularPosts, setPopularPosts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryCounts, setCategoryCounts] = useState({
    all: 0,
    design: 0,
    development: 0,
    business: 0
  });
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

  const categories = [
    { id: 'all', name: 'All Articles', count: categoryCounts.all },
    { id: 'design', name: 'Design', count: categoryCounts.design },
    { id: 'development', name: 'Development', count: categoryCounts.development },
    { id: 'business', name: 'Business', count: categoryCounts.business }
  ];

  const calculateCategoryCounts = (posts) => {
    const counts = {
      all: posts.length,
      design: posts.filter(p => p.category === 'design').length,
      development: posts.filter(p => p.category === 'development').length,
      business: posts.filter(p => p.category === 'business').length
    };
    setCategoryCounts(counts);
    
    // Update categories array
    categories.forEach(cat => {
      cat.count = counts[cat.id];
    });
  };

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // Get posts from Supabase
        const posts = await blogAPI.getPosts();
        console.log('Posts loaded from Supabase:', posts);
        
        if (posts && posts.length > 0) {
          setBlogPosts(posts);
          calculateCategoryCounts(posts);
          
          // Get popular posts
          const popular = await blogAPI.getPopularPosts(5);
          setPopularPosts(popular);
        } else {
          console.log('No posts found in database');
          setBlogPosts([]);
          calculateCategoryCounts([]);
          setPopularPosts([]);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        setBlogPosts([]);
        calculateCategoryCounts([]);
        setPopularPosts([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
    
    // Set up real-time listener for posts
    const unsubscribe = blogAPI.onPostsUpdate((posts) => {
      if (posts && posts.length > 0) {
        setBlogPosts(posts);
        calculateCategoryCounts(posts);
        
        // Update popular posts
        const sorted = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);
        setPopularPosts(sorted);
      }
    });
    
    return () => unsubscribe();
  }, []);

  const handleReadMore = async (postId) => {
    try {
      await blogAPI.trackView(postId);
      
      // Update recent views in localStorage
      const recentViews = JSON.parse(localStorage.getItem('blog_views') || '{}');
      recentViews[postId] = Date.now();
      localStorage.setItem('blog_views', JSON.stringify(recentViews));
    } catch (error) {
      console.log('Error tracking view:', error);
    }
    navigate(`/blog/${postId}`);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const filtered = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.category && post.category.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setBlogPosts(filtered);
      setActiveCategory('all');
    } else {
      // Reload posts
      const reloadPosts = async () => {
        const posts = await blogAPI.getPosts();
        setBlogPosts(posts);
        calculateCategoryCounts(posts);
      };
      reloadPosts();
    }
  };

  const handleCategoryClick = async (categoryId) => {
    setActiveCategory(categoryId);
    
    const allPosts = await blogAPI.getPosts();
    
    if (categoryId === 'all') {
      setBlogPosts(allPosts);
    } else {
      const filtered = allPosts.filter(post => post.category === categoryId);
      setBlogPosts(filtered);
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    if (email) {
      const subscriptions = JSON.parse(localStorage.getItem('blog_subscriptions') || '[]');
      if (!subscriptions.includes(email)) {
        subscriptions.push(email);
        localStorage.setItem('blog_subscriptions', JSON.stringify(subscriptions));
        alert(`Thank you for subscribing with: ${email}\n\nYou'll receive our latest updates.`);
        e.target.reset();
      } else {
        alert('You are already subscribed!');
      }
    }
  };

  const filteredPosts = activeCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  const featuredPost = blogPosts.find(post => post.featured) || (blogPosts.length > 0 ? blogPosts[0] : null);

  // Function to get category display name
  const getCategoryDisplayName = (category) => {
    if (!category) return 'General';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  if (isLoading) {
    return (
      <div className="blog-loading">
        <div className="spinner"></div>
        <p>Loading articles...</p>
      </div>
    );
  }

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
          {featuredPost && (
            <section className="featured-post">
              <div className="container">
                <div className="featured-post-card">
                  <div className="featured-post-image">
                    <img src={featuredPost.image_url} alt={featuredPost.title} />
                    <div className="featured-badge">Featured</div>
                  </div>
                  <div className="featured-post-content">
                    <div className="post-meta">
                      <span className={`post-category ${featuredPost.category}`}>
                        {getCategoryDisplayName(featuredPost.category)}
                      </span>
                      <span className="post-date">
                        {new Date(featuredPost.created_at).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <h2>{featuredPost.title}</h2>
                    <p>{featuredPost.excerpt}</p>
                    
                    {/* Post Stats */}
                    <div className="post-stats">
                      <span><i className="fas fa-eye"></i> {formatNumber(featuredPost.views || 0)} views</span>
                      <span><i className="far fa-comment"></i> {formatNumber(featuredPost.comments || 0)} comments</span>
                      <span><i className="far fa-clock"></i> {featuredPost.readTime || '5 min read'}</span>
                    </div>
                    
                    {/* Author Info */}
                    <div className="post-author">
                      <img src={authorInfo.avatar} alt={authorInfo.name} />
                      <div>
                        <h4>{featuredPost.author || authorInfo.name}</h4>
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
                      onClick={() => handleReadMore(featuredPost.id)}
                    >
                      Read Article <i className="fas fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

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
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                      <span className="category-count">({category.count})</span>
                    </button>
                  ))}
                </div>
                
                {/* Sort Options */}
                <div className="sort-options">
                  <span>Sort by:</span>
                  <select 
                    className="sort-select" 
                    defaultValue="newest"
                    onChange={(e) => {
                      const sortedPosts = [...filteredPosts];
                      if (e.target.value === 'newest') {
                        sortedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                      } else if (e.target.value === 'popular') {
                        sortedPosts.sort((a, b) => (b.views || 0) - (a.views || 0));
                      } else if (e.target.value === 'oldest') {
                        sortedPosts.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                      }
                      setBlogPosts(sortedPosts);
                    }}
                  >
                    <option value="newest">Newest First</option>
                    <option value="popular">Most Popular</option>
                    <option value="oldest">Oldest First</option>
                  </select>
                </div>
              </div>

              {/* Blog Grid */}
              {filteredPosts.length > 0 ? (
                <>
                  <div className="blog-grid">
                    {filteredPosts
                      .filter(post => !post.featured)
                      .map(post => (
                      <div key={post.id} className="blog-card">
                        <div className="blog-card-image">
                          <img src={post.image_url} alt={post.title} />
                          <div className="category-tag">{getCategoryDisplayName(post.category)}</div>
                        </div>
                        <div className="blog-card-content">
                          <div className="post-meta">
                            <span className="post-date">
                              {new Date(post.created_at).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </span>
                            <span className="post-read-time">{post.readTime || '5 min read'}</span>
                          </div>
                          <h3>{post.title}</h3>
                          <p>{post.excerpt}</p>
                          
                          {/* Post Stats */}
                          <div className="post-stats">
                            <span><i className="fas fa-eye"></i> {formatNumber(post.views || 0)} views</span>
                            <span><i className="far fa-comment"></i> {formatNumber(post.comments || 0)} comments</span>
                            <span><i className="far fa-clock"></i> {post.readTime || '5 min read'}</span>
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

                  {/* Pagination - Simple version for now */}
                  <div className="pagination">
                    <button className="pagination-btn disabled">← Previous</button>
                    <div className="page-numbers">
                      <span className="active">1</span>
                      {filteredPosts.length > 6 && <span>2</span>}
                      {filteredPosts.length > 12 && <span>3</span>}
                      {filteredPosts.length > 18 && <span className="ellipsis">...</span>}
                    </div>
                    <button className="pagination-btn">Next →</button>
                  </div>
                </>
              ) : (
                <div className="no-posts">
                  <i className="far fa-newspaper"></i>
                  <h3>No articles found</h3>
                  <p>Try a different search or category</p>
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      handleCategoryClick('all');
                    }}
                    className="reset-btn"
                  >
                    Show All Articles
                  </button>
                </div>
              )}

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
                  <small>Join {formatNumber(JSON.parse(localStorage.getItem('blog_subscriptions') || '[]').length)} subscribers</small>
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
            <h3>Most Popular</h3>
            <div className="popular-posts">
              {popularPosts.length > 0 ? (
                popularPosts.map((post, index) => (
                  <div key={post.id} className="popular-post" onClick={() => handleReadMore(post.id)}>
                    <div className="popular-post-rank">{index + 1}</div>
                    <div className="popular-post-content">
                      <h4>{post.title}</h4>
                      <div className="post-meta">
                        <span><i className="fas fa-eye"></i> {formatNumber(post.views || 0)}</span>
                        <span>•</span>
                        <span>
                          {new Date(post.created_at).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-popular-posts">
                  <p>No popular posts yet. Be the first to read!</p>
                </div>
              )}
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
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span>{category.name}</span>
                  <span className="count">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Views */}
          <div className="sidebar-widget">
            <h3>Recently Viewed</h3>
            <div className="recent-views">
              {(() => {
                const allViews = JSON.parse(localStorage.getItem('blog_views') || '{}');
                
                const viewedPosts = Object.keys(allViews)
                  .map(id => {
                    const post = blogPosts.find(p => p.id.toString() === id);
                    if (post) {
                      return {
                        ...post,
                        lastViewed: allViews[id]
                      };
                    }
                    return null;
                  })
                  .filter(Boolean)
                  .sort((a, b) => b.lastViewed - a.lastViewed)
                  .slice(0, 3);

                return viewedPosts.length > 0 ? (
                  viewedPosts.map(post => (
                    <div key={post.id} className="recent-view" onClick={() => handleReadMore(post.id)}>
                      <img src={post.image_url} alt={post.title} />
                      <div>
                        <h4>{post.title}</h4>
                        <span className="view-time">Viewed recently</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="no-recent-views">No recent views</p>
                );
              })()}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="sidebar-widget">
            <h3>Weekly Digest</h3>
            <p>Get the top posts delivered weekly:</p>
            <form className="sidebar-newsletter-form" onSubmit={handleSubscribe}>
              <input type="email" placeholder="Your email" required />
              <button type="submit">
                <i className="fas fa-envelope"></i> Subscribe
              </button>
            </form>
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