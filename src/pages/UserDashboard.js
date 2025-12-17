import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, authAPI, blogAPI } from '../supabase';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('my-posts');
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'general',
    image_url: '',
    published: true,
    featured: false
  });
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    const currentUser = await authAPI.getCurrentUserWithProfile();
    
    if (!currentUser) {
      navigate('/admin/login');
      return;
    }
    
    setUser(currentUser);
    
    // Check if user is admin - redirect to admin panel
    if (currentUser.profile?.role === 'admin') {
      navigate('/admin');
      return;
    }
    
    fetchUserPosts();
  };

  const fetchUserPosts = async () => {
    setLoading(true);
    try {
      const userPosts = await blogAPI.getUserPosts(user?.id);
      setPosts(userPosts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await authAPI.logout();
    navigate('/');
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
          category: 'general',
          image_url: '',
          published: true,
          featured: false
        });
        fetchUserPosts();
        setActiveTab('my-posts');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post: ' + error.message);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    
    try {
      const post = await blogAPI.updatePost(editingPost.id, editingPost);
      if (post) {
        alert('Post updated successfully!');
        setEditingPost(null);
        fetchUserPosts();
        setActiveTab('my-posts');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post: ' + error.message);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const success = await blogAPI.deletePost(id);
        if (success) {
          alert('Post deleted successfully!');
          fetchUserPosts();
        }
      } catch (error) {
        console.error('Error deleting post:', error);
        alert('Error deleting post: ' + error.message);
      }
    }
  };

  const startEditing = (post) => {
    setEditingPost(post);
    setActiveTab('edit-post');
  };

  if (loading) {
    return <div className="user-loading">Loading your dashboard...</div>;
  }

  return (
    <div className="user-dashboard">
      {/* Header */}
      <div className="user-header">
        <div className="user-info">
          <div className="user-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <div>
            <h1>Welcome, {user?.profile?.name || user?.email}</h1>
            <p>Regular User Dashboard</p>
          </div>
        </div>
        <div className="user-actions">
          <button 
            className="btn-view-profile"
            onClick={() => navigate('/blog')}
          >
            <i className="fas fa-globe"></i> View Public Blog
          </button>
          <button 
            className="btn-logout"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="user-content">
        {/* Sidebar Navigation */}
        <div className="user-sidebar">
          <nav className="user-nav">
            <button 
              className={`nav-btn ${activeTab === 'my-posts' ? 'active' : ''}`}
              onClick={() => setActiveTab('my-posts')}
            >
              <i className="fas fa-newspaper"></i> My Posts ({posts.length})
            </button>
            <button 
              className={`nav-btn ${activeTab === 'create-post' ? 'active' : ''}`}
              onClick={() => setActiveTab('create-post')}
            >
              <i className="fas fa-plus-circle"></i> Create New Post
            </button>
            {editingPost && (
              <button 
                className={`nav-btn ${activeTab === 'edit-post' ? 'active' : ''}`}
                onClick={() => setActiveTab('edit-post')}
              >
                <i className="fas fa-edit"></i> Edit Post
              </button>
            )}
            <button 
              className={`nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <i className="fas fa-user-cog"></i> My Profile
            </button>
          </nav>
          
          <div className="user-stats">
            <div className="stat-item">
              <h3>{posts.length}</h3>
              <p>Total Posts</p>
            </div>
            <div className="stat-item">
              <h3>{posts.filter(p => p.published).length}</h3>
              <p>Published</p>
            </div>
            <div className="stat-item">
              <h3>{posts.filter(p => p.featured).length}</h3>
              <p>Featured</p>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="user-main">
          {activeTab === 'my-posts' && (
            <div className="my-posts">
              <h2>My Posts</h2>
              {posts.length === 0 ? (
                <div className="no-posts">
                  <i className="fas fa-file-alt"></i>
                  <h3>No posts yet</h3>
                  <p>Create your first post to get started!</p>
                  <button 
                    className="btn-create-first"
                    onClick={() => setActiveTab('create-post')}
                  >
                    <i className="fas fa-plus"></i> Create Your First Post
                  </button>
                </div>
              ) : (
                <div className="posts-grid">
                  {posts.map(post => (
                    <div key={post.id} className="post-card">
                      <div className="post-card-header">
                        <span className={`status-badge ${post.published ? 'published' : 'draft'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                        {post.featured && (
                          <span className="featured-badge">
                            <i className="fas fa-star"></i> Featured
                          </span>
                        )}
                      </div>
                      <div className="post-card-body">
                        <h3>{post.title}</h3>
                        <p className="post-excerpt">{post.excerpt}</p>
                        <div className="post-meta">
                          <span className="post-category">{post.category}</span>
                          <span className="post-views">
                            <i className="fas fa-eye"></i> {post.views}
                          </span>
                          <span className="post-date">
                            {new Date(post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="post-card-actions">
                        <button 
                          className="btn-view"
                          onClick={() => navigate(`/blog/${post.id}`)}
                        >
                          <i className="fas fa-eye"></i> View
                        </button>
                        <button 
                          className="btn-edit"
                          onClick={() => startEditing(post)}
                        >
                          <i className="fas fa-edit"></i> Edit
                        </button>
                        <button 
                          className="btn-delete"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <i className="fas fa-trash"></i> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'create-post' && (
            <div className="create-post">
              <h2>Create New Post</h2>
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
                    placeholder="Enter a brief excerpt"
                    rows="3"
                  />
                </div>
                
                <div className="form-group">
                  <label>Content *</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    placeholder="Write your post content here..."
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
                      <option value="general">General</option>
                      <option value="design">Design</option>
                      <option value="development">Development</option>
                      <option value="business">Business</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Image URL (optional)</label>
                    <input
                      type="text"
                      value={newPost.image_url}
                      onChange={(e) => setNewPost({...newPost, image_url: e.target.value})}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        checked={newPost.published}
                        onChange={(e) => setNewPost({...newPost, published: e.target.checked})}
                      />
                      <span>Publish immediately</span>
                    </div>
                  </div>
                  
                  <div className="form-group">
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
                
                <div className="form-actions">
                  <button 
                    type="button"
                    onClick={() => setActiveTab('my-posts')}
                    className="btn-cancel"
                  >
                    <i className="fas fa-arrow-left"></i> Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    <i className="fas fa-plus-circle"></i> Create Post
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'edit-post' && editingPost && (
            <div className="edit-post">
              <h2>Edit Post</h2>
              <form onSubmit={handleUpdatePost} className="post-form">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Excerpt</label>
                  <textarea
                    value={editingPost.excerpt}
                    onChange={(e) => setEditingPost({...editingPost, excerpt: e.target.value})}
                    rows="3"
                  />
                </div>
                
                <div className="form-group">
                  <label>Content *</label>
                  <textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({...editingPost, content: e.target.value})}
                    rows="10"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                    >
                      <option value="general">General</option>
                      <option value="design">Design</option>
                      <option value="development">Development</option>
                      <option value="business">Business</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="text"
                      value={editingPost.image_url}
                      onChange={(e) => setEditingPost({...editingPost, image_url: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        checked={editingPost.published}
                        onChange={(e) => setEditingPost({...editingPost, published: e.target.checked})}
                      />
                      <span>Published</span>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <div className="checkbox-group">
                      <input
                        type="checkbox"
                        checked={editingPost.featured}
                        onChange={(e) => setEditingPost({...editingPost, featured: e.target.checked})}
                      />
                      <span>Featured</span>
                    </div>
                  </div>
                </div>
                
                <div className="form-actions">
                  <button 
                    type="button"
                    onClick={() => {
                      setEditingPost(null);
                      setActiveTab('my-posts');
                    }}
                    className="btn-cancel"
                  >
                    <i className="fas fa-times"></i> Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    <i className="fas fa-save"></i> Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="user-profile">
              <h2>My Profile</h2>
              <div className="profile-card">
                <div className="profile-header">
                  <div className="profile-avatar">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div>
                    <h3>{user?.profile?.name || 'User'}</h3>
                    <p className="user-email">{user?.email}</p>
                    <p className="user-role">Regular User</p>
                  </div>
                </div>
                
                <div className="profile-details">
                  <div className="detail-item">
                    <label>Username:</label>
                    <span>{user?.profile?.username || 'Not set'}</span>
                  </div>
                  <div className="detail-item">
                    <label>Member since:</label>
                    <span>{new Date(user?.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="detail-item">
                    <label>Posts created:</label>
                    <span>{posts.length}</span>
                  </div>
                </div>
                
                <div className="profile-actions">
                  <button className="btn-edit-profile">
                    <i className="fas fa-user-edit"></i> Edit Profile
                  </button>
                  <button className="btn-change-password">
                    <i className="fas fa-key"></i> Change Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;