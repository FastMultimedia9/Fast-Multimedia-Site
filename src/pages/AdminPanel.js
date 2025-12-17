import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, blogAPI, authAPI } from '../supabase';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'design',
    image_url: '',
    featured: false
  });

  useEffect(() => {
    if (!authAPI.isLoggedIn()) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch posts
    const { data: postsData } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    // Fetch comments
    const { data: commentsData } = await supabase
      .from('comments')
      .select(`
        *,
        posts(title)
      `)
      .order('created_at', { ascending: false });
    
    setPosts(postsData || []);
    setComments(commentsData || []);
    setLoading(false);
  };

  const handleLogout = () => {
    authAPI.logout();
    navigate('/admin/login');
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    
    try {
      const post = await blogAPI.createPost(newPost);
      if (post) {
        alert('Post created successfully!');
        setNewPost({
          title: '',
          excerpt: '',
          content: '',
          category: 'design',
          image_url: '',
          featured: false
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post');
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const success = await blogAPI.deletePost(id);
        if (success) {
          alert('Post deleted successfully!');
          fetchData();
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post');
      }
    }
  };

  const handleDeleteComment = async (id) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const { error } = await supabase
          .from('comments')
          .delete()
          .eq('id', id);
        
        if (error) throw error;
        
        alert('Comment deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Error deleting comment');
      }
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading admin panel...</div>;
  }

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-header">
          <h2>Admin Panel</h2>
          <p>Welcome, {authAPI.getCurrentUser()?.username}</p>
        </div>
        
        <nav className="admin-nav">
          <button 
            className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </button>
          <button 
            className={`nav-btn ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <i className="fas fa-newspaper"></i> Posts ({posts.length})
          </button>
          <button 
            className={`nav-btn ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            <i className="fas fa-comments"></i> Comments ({comments.length})
          </button>
          <button 
            className={`nav-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            <i className="fas fa-plus-circle"></i> Create Post
          </button>
          <button 
            className="nav-btn logout-btn"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </nav>
        
        <div className="admin-stats">
          <div className="stat-item">
            <h3>{posts.length}</h3>
            <p>Total Posts</p>
          </div>
          <div className="stat-item">
            <h3>{comments.length}</h3>
            <p>Total Comments</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <h1>Dashboard Overview</h1>
            <div className="stats-grid">
              <div className="stat-card">
                <i className="fas fa-eye"></i>
                <div>
                  <h3>{posts.reduce((sum, post) => sum + (post.views || 0), 0)}</h3>
                  <p>Total Views</p>
                </div>
              </div>
              <div className="stat-card">
                <i className="fas fa-comment"></i>
                <div>
                  <h3>{posts.reduce((sum, post) => sum + (post.comments || 0), 0)}</h3>
                  <p>Total Comments</p>
                </div>
              </div>
              <div className="stat-card">
                <i className="fas fa-star"></i>
                <div>
                  <h3>{posts.filter(p => p.featured).length}</h3>
                  <p>Featured Posts</p>
                </div>
              </div>
              <div className="stat-card">
                <i className="fas fa-database"></i>
                <div>
                  <h3>Supabase</h3>
                  <p>Database Connected</p>
                </div>
              </div>
            </div>

            <div className="recent-posts">
              <h2>Recent Posts</h2>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Views</th>
                    <th>Comments</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.slice(0, 5).map(post => (
                    <tr key={post.id}>
                      <td>{post.title}</td>
                      <td><span className="category-badge">{post.category}</span></td>
                      <td>{post.views}</td>
                      <td>{post.comments}</td>
                      <td>{new Date(post.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="posts-management">
            <h1>Posts Management</h1>
            <div className="posts-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Views</th>
                    <th>Comments</th>
                    <th>Featured</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id}>
                      <td>{post.id}</td>
                      <td className="title-cell">
                        <strong>{post.title}</strong>
                        <small>{post.excerpt?.substring(0, 50)}...</small>
                      </td>
                      <td><span className="category-badge">{post.category}</span></td>
                      <td>{post.views}</td>
                      <td>{post.comments}</td>
                      <td>
                        <span className={`featured-badge ${post.featured ? 'active' : ''}`}>
                          {post.featured ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>{new Date(post.created_at).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn-edit"
                          onClick={() => navigate(`/blog/${post.id}`)}
                        >
                          <i className="fas fa-eye"></i> View
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="comments-management">
            <h1>Comments Management</h1>
            <div className="comments-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Post</th>
                    <th>Author</th>
                    <th>Comment</th>
                    <th>Likes</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map(comment => (
                    <tr key={comment.id}>
                      <td>{comment.id}</td>
                      <td>{comment.posts?.title || `Post ${comment.post_id}`}</td>
                      <td>
                        <div className="author-info">
                          <strong>{comment.author_name}</strong>
                          <small>{comment.author_email}</small>
                        </div>
                      </td>
                      <td className="comment-content">{comment.content}</td>
                      <td>{comment.likes}</td>
                      <td>{new Date(comment.created_at).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn-delete"
                          onClick={() => handleDeleteComment(comment.id)}
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="create-post">
            <h1>Create New Post</h1>
            <form onSubmit={handleCreatePost} className="post-form">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  placeholder="Enter post title"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Excerpt</label>
                <textarea
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                  placeholder="Enter post excerpt"
                  rows="3"
                />
              </div>
              
              <div className="form-group">
                <label>Content *</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  placeholder="Enter post content (HTML supported)"
                  rows="10"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                  >
                    <option value="design">Design</option>
                    <option value="development">Development</option>
                    <option value="business">Business</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Featured</label>
                  <div className="checkbox-group">
                    <input
                      type="checkbox"
                      checked={newPost.featured}
                      onChange={(e) => setNewPost({...newPost, featured: e.target.checked})}
                    />
                    <span>Mark as featured</span>
                  </div>
                </div>
              </div>
              
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  value={newPost.image_url}
                  onChange={(e) => setNewPost({...newPost, image_url: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <button type="submit" className="submit-btn">
                <i className="fas fa-plus-circle"></i> Create Post
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;