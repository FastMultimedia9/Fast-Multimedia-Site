import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, blogAPI, authAPI } from '../supabase';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'design',
    image_url: '',
    featured: false,
    published: true
  });
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    checkAuthAndLoadData();
  }, [navigate]);

  const checkAuthAndLoadData = async () => {
    const user = await authAPI.getCurrentUserWithProfile();
    
    if (!user) {
      navigate('/admin/login');
      return;
    }
    
    setCurrentUser(user);
    
    // Check if user is admin
    if (user.profile?.role !== 'admin') {
      navigate('/user/dashboard');
      return;
    }
    
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    
    try {
      // Fetch all posts (admin sees everything)
      const { data: postsData } = await supabase
        .from('posts')
        .select(`
          *,
          users:user_id (name, username, email)
        `)
        .order('created_at', { ascending: false });
      
      // Fetch all users (admin only)
      const { data: usersData } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      // Fetch all comments
      const { data: commentsData } = await supabase
        .from('comments')
        .select(`
          *,
          posts(title),
          users:author_id (name, email)
        `)
        .order('created_at', { ascending: false });
      
      setPosts(postsData || []);
      setUsers(usersData || []);
      setComments(commentsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
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
          category: 'design',
          image_url: '',
          featured: false,
          published: true
        });
        fetchData();
      }
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post: ' + error.message);
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
        alert('Error deleting post: ' + error.message);
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

  const handleUserRoleChange = async (userId, newRole) => {
    if (window.confirm(`Change user role to ${newRole}?`)) {
      try {
        const { error } = await supabase
          .from('users')
          .update({ role: newRole })
          .eq('id', userId);
        
        if (error) throw error;
        
        alert('User role updated successfully!');
        fetchData();
      } catch (error) {
        console.error('Error updating user role:', error);
        alert('Error updating user role');
      }
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading admin panel...</div>;
  }

  const userStats = {
    totalUsers: users.length,
    adminUsers: users.filter(u => u.role === 'admin').length,
    regularUsers: users.filter(u => u.role === 'user').length
  };

  return (
    <div className="admin-panel">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-header">
          <h2>Admin Panel</h2>
          <p>Welcome, {currentUser?.profile?.name || 'Admin'}</p>
          <small className="admin-badge">Administrator</small>
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
            <i className="fas fa-newspaper"></i> All Posts ({posts.length})
          </button>
          <button 
            className={`nav-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="fas fa-users"></i> Users ({users.length})
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
            <h3>{users.length}</h3>
            <p>Total Users</p>
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
            <h1>Admin Dashboard</h1>
            <p className="dashboard-subtitle">Full system overview with admin privileges</p>
            
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
                <i className="fas fa-users"></i>
                <div>
                  <h3>{userStats.totalUsers}</h3>
                  <p>Total Users</p>
                  <small>{userStats.adminUsers} admin, {userStats.regularUsers} regular</small>
                </div>
              </div>
              <div className="stat-card">
                <i className="fas fa-star"></i>
                <div>
                  <h3>{posts.filter(p => p.featured).length}</h3>
                  <p>Featured Posts</p>
                </div>
              </div>
            </div>

            <div className="recent-posts">
              <h2>Recent Posts (All Users)</h2>
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
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
                      <td>
                        <div className="author-cell">
                          <strong>{post.users?.name || 'Unknown'}</strong>
                          <small>{post.users?.email}</small>
                        </div>
                      </td>
                      <td><span className="category-badge">{post.category}</span></td>
                      <td>{post.views}</td>
                      <td>{post.comments}</td>
                      <td>{new Date(post.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="recent-users">
              <h2>Recent Users</h2>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th>Posts</th>
                  </tr>
                </thead>
                <tbody>
                  {users.slice(0, 5).map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <strong>{user.name}</strong>
                          <small>{user.username}</small>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span className={`role-badge ${user.role}`}>
                          {user.role === 'admin' ? 'Administrator' : 'Regular User'}
                        </span>
                      </td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>{posts.filter(p => p.user_id === user.id).length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="posts-management">
            <h1>All Posts Management</h1>
            <p className="section-subtitle">View and manage posts from all users</p>
            
            <div className="admin-controls">
              <div className="search-filter">
                <input type="text" placeholder="Search posts..." />
                <select>
                  <option value="">All Users</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="posts-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Category</th>
                    <th>Views</th>
                    <th>Comments</th>
                    <th>Status</th>
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
                      <td>
                        <div className="author-cell">
                          <strong>{post.users?.name || 'Unknown'}</strong>
                          <small>{post.users?.email}</small>
                        </div>
                      </td>
                      <td><span className="category-badge">{post.category}</span></td>
                      <td>{post.views}</td>
                      <td>{post.comments}</td>
                      <td>
                        <span className={`status-badge ${post.published ? 'published' : 'draft'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                        {post.featured && (
                          <span className="featured-badge">
                            <i className="fas fa-star"></i> Featured
                          </span>
                        )}
                      </td>
                      <td>{new Date(post.created_at).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn-view"
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

        {activeTab === 'users' && (
          <div className="users-management">
            <h1>User Management</h1>
            <p className="section-subtitle">Manage all user accounts and permissions</p>
            
            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Posts</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id.substring(0, 8)}...</td>
                      <td>
                        <div className="user-cell">
                          <strong>{user.name}</strong>
                          {user.id === currentUser?.id && (
                            <small className="current-user">You</small>
                          )}
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>
                        <div className="role-control">
                          <select 
                            value={user.role}
                            onChange={(e) => handleUserRoleChange(user.id, e.target.value)}
                            disabled={user.id === currentUser?.id}
                          >
                            <option value="user">Regular User</option>
                            <option value="admin">Administrator</option>
                          </select>
                        </div>
                      </td>
                      <td>{posts.filter(p => p.user_id === user.id).length}</td>
                      <td>{new Date(user.created_at).toLocaleDateString()}</td>
                      <td>
                        <button 
                          className="btn-view"
                          onClick={() => {
                            const userPosts = posts.filter(p => p.user_id === user.id);
                            setPosts(userPosts);
                            setActiveTab('posts');
                          }}
                        >
                          <i className="fas fa-newspaper"></i> View Posts
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
            <p className="section-subtitle">Moderate comments from all users</p>
            
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
                          <strong>{comment.author_name || comment.users?.name || 'Anonymous'}</strong>
                          <small>{comment.author_email || comment.users?.email || 'No email'}</small>
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
            <p className="section-subtitle">Create a post as admin (can be attributed to any user)</p>
            
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
                    <option value="general">General</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>User Attribution</label>
                  <select>
                    <option value={currentUser?.id}>{currentUser?.profile?.name} (You)</option>
                    {users.filter(u => u.id !== currentUser?.id).map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
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